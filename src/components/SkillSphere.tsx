import React, { useEffect, useRef } from 'react';

/**
 * SkillSphere
 * ----------
 * Zero-dependency Canvas-2D wireframe globe with technology labels distributed on
 * its surface via a Fibonacci (golden-spiral) lattice.
 *
 * - The wireframe is drawn on a DPR-scaled <canvas> (two strokes per frame: back / front).
 * - Labels are absolutely positioned DOM pills driven by the same projection, so they stay
 *   crisp at any devicePixelRatio and inherit the site's typography.
 * - Orientation = Rz(tilt 23deg) . Rx(pitch) . Ry(yaw). Auto-rotate increments yaw, so the
 *   globe always spins about its own (tilted) poles - no wobble after a drag.
 * - Drag (mouse + touch) with momentum, then a gentle ease back into auto-spin.
 * - Vertical touch swipes are left to the browser (touch-action: pan-y + intent check).
 * - Loop pauses when off-screen / tab hidden / nothing is moving. Everything is torn down
 *   on unmount.
 */

type Variant = 'light' | 'dark';

export interface SkillSphereProps {
  className?: string;
  variant?: Variant;
}

interface Skill {
  label: string;
  color: string;
}

const SKILLS: Skill[] = [
  { label: 'n8n', color: '#EA4B71' },
  { label: 'Python', color: '#3776AB' },
  { label: 'Power BI', color: '#F2C811' },
  { label: 'GCP', color: '#4285F4' },
  { label: 'APIs', color: '#0EA5E9' },
  { label: 'Lead Generation', color: '#F97316' },
  { label: 'AI Voice Agents', color: '#DC2626' },
  { label: 'CRM Automation', color: '#7C3AED' },
  { label: 'Webhooks', color: '#0F766E' },
  { label: 'WhatsApp API', color: '#25D366' },
  { label: 'Supabase', color: '#3ECF8E' },
  { label: 'Vapi', color: '#6366F1' },
  { label: 'Deepgram', color: '#13EF93' },
  { label: 'RAG', color: '#9333EA' },
];

// ---------------------------------------------------------------------------
// Tunables
// ---------------------------------------------------------------------------
const MAX_SIZE = 520; // px, square
const MAX_DPR = 2; // wireframe lines are faint; 2x is plenty and kinder to phones
const TILT = (23 * Math.PI) / 180; // axial tilt in screen plane
const AUTO_RATE = 0.2; // rad / s
const CAMERA = 3.6; // camera distance in sphere radii (perspective strength)
const RADIUS_FRAC = 0.35; // sphere radius as a fraction of container size
const SEGMENTS = 64; // polyline segments per wire circle
const PARALLELS = [-60, -40, -20, 0, 20, 40, 60]; // degrees latitude
const MERIDIANS = 9; // full great circles through the poles (every 20deg)
const PITCH_LIMIT = 1.15; // rad, keeps the poles from flipping through the viewer
const FRICTION = 0.94; // momentum decay per 16.7ms
const MIN_VELOCITY = 0.00006; // rad / ms, below this momentum is considered finished
const RESUME_DELAY = 500; // ms after release before auto-spin starts easing back in
const RESUME_DURATION = 1600; // ms to fully resume auto-spin
const INTENT_DISTANCE = 8; // px of travel before we decide horizontal vs vertical
const INTENT_RATIO = 1.25; // |dx| must exceed |dy| * ratio to count as horizontal

// ---------------------------------------------------------------------------
// Geometry helpers
// ---------------------------------------------------------------------------
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

/** Even distribution of n points on a unit sphere (Fibonacci lattice). */
function fibonacciSphere(n: number): Float32Array {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const y = 1 - ((i + 0.5) / n) * 2; // -1..1, avoids the exact poles
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = GOLDEN_ANGLE * i;
    out[i * 3] = Math.cos(theta) * r;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = Math.sin(theta) * r;
  }
  return out;
}

/** Unit-sphere wireframe: parallels + meridians as flat xyz polylines. */
function buildWireframe(): { points: Float32Array; circles: number } {
  const circles = PARALLELS.length + MERIDIANS;
  const points = new Float32Array(circles * SEGMENTS * 3);
  let p = 0;
  for (const latDeg of PARALLELS) {
    const lat = (latDeg * Math.PI) / 180;
    const y = Math.sin(lat);
    const r = Math.cos(lat);
    for (let s = 0; s < SEGMENTS; s++) {
      const a = (s / SEGMENTS) * Math.PI * 2;
      points[p++] = Math.cos(a) * r;
      points[p++] = y;
      points[p++] = Math.sin(a) * r;
    }
  }
  for (let m = 0; m < MERIDIANS; m++) {
    const lon = (m / MERIDIANS) * Math.PI;
    const cl = Math.cos(lon);
    const sl = Math.sin(lon);
    for (let s = 0; s < SEGMENTS; s++) {
      const a = (s / SEGMENTS) * Math.PI * 2;
      const r = Math.cos(a);
      points[p++] = r * cl;
      points[p++] = Math.sin(a);
      points[p++] = r * sl;
    }
  }
  return { points, circles };
}

/** M = Rz(tilt) . Rx(pitch) . Ry(yaw), written into a 9-slot array (row-major). */
function rotationMatrix(yaw: number, pitch: number, tilt: number, m: Float64Array): void {
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);
  const ct = Math.cos(tilt);
  const st = Math.sin(tilt);
  m[0] = ct * cy - st * sp * sy;
  m[1] = -st * cp;
  m[2] = ct * sy + st * sp * cy;
  m[3] = st * cy + ct * sp * sy;
  m[4] = ct * cp;
  m[5] = st * sy - ct * sp * cy;
  m[6] = -cp * sy;
  m[7] = sp;
  m[8] = cp * cy;
}

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function clamp(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v;
}

// ---------------------------------------------------------------------------
// Theme
// ---------------------------------------------------------------------------
interface Palette {
  wireFront: string;
  wireBack: string;
  rim: string;
  bodyInner: string;
  bodyMid: string;
  bodyOuter: string;
  pill: string;
  glow: string;
}

const PALETTES: Record<Variant, Palette> = {
  light: {
    wireFront: 'rgba(51, 65, 85, 0.17)',
    wireBack: 'rgba(51, 65, 85, 0.055)',
    rim: 'rgba(15, 23, 42, 0.10)',
    bodyInner: 'rgba(255, 255, 255, 0.95)',
    bodyMid: 'rgba(241, 245, 249, 0.75)',
    bodyOuter: 'rgba(203, 213, 225, 0.42)',
    pill:
      'bg-white/90 text-slate-700 border-slate-200/90 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_6px_16px_-8px_rgba(15,23,42,0.18)]',
    glow: 'radial-gradient(circle at 50% 48%, rgba(59,130,246,0.10) 0%, rgba(99,102,241,0.05) 40%, rgba(255,255,255,0) 68%)',
  },
  dark: {
    wireFront: 'rgba(226, 232, 240, 0.20)',
    wireBack: 'rgba(226, 232, 240, 0.06)',
    rim: 'rgba(255, 255, 255, 0.12)',
    bodyInner: 'rgba(71, 85, 105, 0.55)',
    bodyMid: 'rgba(30, 41, 59, 0.55)',
    bodyOuter: 'rgba(15, 23, 42, 0.25)',
    pill: 'bg-slate-800/85 text-slate-100 border-white/10 shadow-[0_8px_20px_-10px_rgba(0,0,0,0.6)]',
    glow: 'radial-gradient(circle at 50% 48%, rgba(96,165,250,0.16) 0%, rgba(129,140,248,0.07) 40%, rgba(15,23,42,0) 68%)',
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export const SkillSphere: React.FC<SkillSphereProps> = ({ className = '', variant = 'light' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const palette = PALETTES[variant];

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const pal = PALETTES[variant];

    // ----- static geometry ------------------------------------------------
    const skillPoints = fibonacciSphere(SKILLS.length);
    const wire = buildWireframe();
    const projected = new Float32Array(wire.circles * SEGMENTS * 3); // rotated xyz per frame
    const matrix = new Float64Array(9);

    // ----- mutable state (refs, never React state) -------------------------
    let size = 0; // css px, square
    let dpr = 1;
    let radius = 0; // css px
    let bodyGradient: CanvasGradient | null = null;
    let silhouette = 0;

    let yaw = 0.6;
    let pitch = 0.18;
    let velYaw = 0; // rad / ms
    let velPitch = 0; // rad / ms
    let releasedAt = -1; // ms timestamp of last drag release (-1 = never / consumed)
    let resume = 1; // 0..1 blend of auto-spin after a drag

    let rafId = 0;
    let lastFrame = 0;
    let visible = false;
    let pageHidden = typeof document !== 'undefined' && document.hidden;
    let reducedMotion = false;
    let disposed = false;

    // pointer state
    let activePointer: number | null = null;
    let engaged = false; // gesture claimed by the sphere
    let rejected = false; // gesture handed to the browser (vertical scroll)
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastY = 0;
    let lastMoveT = 0;

    const labels = labelRefs.current;

    // ----- rendering ------------------------------------------------------
    const render = () => {
      if (size === 0) return;
      rotationMatrix(yaw, pitch, TILT, matrix);
      const [m0, m1, m2, m3, m4, m5, m6, m7, m8] = matrix as unknown as number[];
      const cx = size / 2;
      const cy = size / 2;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);

      // Sphere body (glass disc) + rim
      if (bodyGradient) {
        ctx.beginPath();
        ctx.arc(cx, cy, silhouette, 0, Math.PI * 2);
        ctx.fillStyle = bodyGradient;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = pal.rim;
        ctx.stroke();
      }

      // Transform wireframe points once
      const src = wire.points;
      for (let i = 0; i < src.length; i += 3) {
        const x = src[i];
        const y = src[i + 1];
        const z = src[i + 2];
        const rx = m0 * x + m1 * y + m2 * z;
        const ry = m3 * x + m4 * y + m5 * z;
        const rz = m6 * x + m7 * y + m8 * z;
        const f = CAMERA / (CAMERA - rz);
        projected[i] = cx + rx * radius * f;
        projected[i + 1] = cy - ry * radius * f;
        projected[i + 2] = rz;
      }

      // Two passes: back hemisphere (faint) then front hemisphere
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      for (let pass = 0; pass < 2; pass++) {
        const front = pass === 1;
        ctx.beginPath();
        for (let c = 0; c < wire.circles; c++) {
          const base = c * SEGMENTS * 3;
          for (let s = 0; s < SEGMENTS; s++) {
            const a = base + s * 3;
            const b = base + ((s + 1) % SEGMENTS) * 3;
            const zAvg = (projected[a + 2] + projected[b + 2]) * 0.5;
            if (zAvg >= 0 !== front) continue;
            ctx.moveTo(projected[a], projected[a + 1]);
            ctx.lineTo(projected[b], projected[b + 1]);
          }
        }
        ctx.lineWidth = front ? 1 : 0.8;
        ctx.strokeStyle = front ? pal.wireFront : pal.wireBack;
        ctx.stroke();
      }

      // Labels (DOM), driven by the same projection
      for (let i = 0; i < SKILLS.length; i++) {
        const el = labels[i];
        if (!el) continue;
        const x = skillPoints[i * 3];
        const y = skillPoints[i * 3 + 1];
        const z = skillPoints[i * 3 + 2];
        const rx = m0 * x + m1 * y + m2 * z;
        const ry = m3 * x + m4 * y + m5 * z;
        const rz = m6 * x + m7 * y + m8 * z;
        const f = CAMERA / (CAMERA - rz);
        const sx = cx + rx * radius * f;
        const sy = cy - ry * radius * f;
        const depth = (rz + 1) * 0.5; // 0 = far, 1 = near
        const eased = depth * depth * (3 - 2 * depth); // smoothstep
        const scale = 0.7 + 0.38 * eased;
        const opacity = 0.14 + 0.86 * Math.pow(eased, 1.7);
        el.style.transform = `translate3d(${sx.toFixed(1)}px, ${sy.toFixed(1)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.zIndex = String(10 + Math.round(depth * 100));
      }
    };

    // ----- animation loop -------------------------------------------------
    const dragging = () => engaged && activePointer !== null;

    const hasMomentum = () => Math.abs(velYaw) > MIN_VELOCITY || Math.abs(velPitch) > MIN_VELOCITY;

    const needsLoop = () =>
      visible && !pageHidden && !dragging() && (hasMomentum() || resume < 1 || !reducedMotion);

    const step = (dt: number, now: number) => {
      if (dragging()) return;

      // momentum
      if (hasMomentum()) {
        yaw += velYaw * dt;
        pitch = clamp(pitch + velPitch * dt, -PITCH_LIMIT, PITCH_LIMIT);
        const decay = Math.pow(FRICTION, dt / 16.67);
        velYaw *= decay;
        velPitch *= decay;
      } else {
        velYaw = 0;
        velPitch = 0;
      }

      // ease auto-spin back in after a drag
      if (resume < 1) {
        if (releasedAt >= 0) {
          const t = (now - releasedAt - RESUME_DELAY) / RESUME_DURATION;
          resume = clamp(t, 0, 1);
          if (resume >= 1) releasedAt = -1;
        } else {
          resume = 1;
        }
      }

      if (!reducedMotion) {
        yaw += (AUTO_RATE / 1000) * easeInOut(resume) * dt;
      }
      if (yaw > Math.PI * 2) yaw -= Math.PI * 2;
      else if (yaw < 0) yaw += Math.PI * 2;
    };

    const frame = (now: number) => {
      rafId = 0;
      if (disposed) return;
      const dt = lastFrame ? Math.min(48, now - lastFrame) : 16.67;
      lastFrame = now;
      step(dt, now);
      render();
      if (needsLoop()) rafId = requestAnimationFrame(frame);
      else lastFrame = 0;
    };

    /** Start the loop if it should be running (idempotent). */
    const kick = () => {
      if (disposed || rafId) return;
      if (needsLoop()) {
        lastFrame = 0;
        rafId = requestAnimationFrame(frame);
      } else if (visible && !pageHidden) {
        // single paint so the current orientation is on screen
        rafId = requestAnimationFrame((now) => {
          rafId = 0;
          if (!disposed) {
            lastFrame = now;
            render();
          }
        });
      }
    };

    const stop = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      lastFrame = 0;
    };

    // ----- sizing ---------------------------------------------------------
    const resize = (width: number) => {
      const next = Math.max(0, Math.min(MAX_SIZE, Math.round(width)));
      const nextDpr = Math.min(MAX_DPR, Math.max(1, window.devicePixelRatio || 1));
      if (next === size && nextDpr === dpr) return;
      size = next;
      dpr = nextDpr;
      radius = size * RADIUS_FRAC;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;

      // silhouette radius under perspective (tangent points sit at z = 1 / CAMERA)
      const tz = 1 / CAMERA;
      silhouette = radius * Math.sqrt(1 - tz * tz) * (CAMERA / (CAMERA - tz));

      const cx = size / 2;
      const cy = size / 2;
      const g = ctx.createRadialGradient(
        cx - silhouette * 0.35,
        cy - silhouette * 0.4,
        silhouette * 0.05,
        cx,
        cy,
        silhouette,
      );
      g.addColorStop(0, pal.bodyInner);
      g.addColorStop(0.55, pal.bodyMid);
      g.addColorStop(1, pal.bodyOuter);
      bodyGradient = g;

      // label typography scales gently with the sphere
      const fs = clamp(size * 0.0235, 10, 12.5);
      container.style.setProperty('--ss-fs', `${fs.toFixed(2)}px`);

      if (size > 0) render();
    };

    // ----- pointer handling ----------------------------------------------
    const beginDrag = (e: PointerEvent) => {
      engaged = true;
      velYaw = 0;
      velPitch = 0;
      resume = 0;
      releasedAt = -1;
      lastX = e.clientX;
      lastY = e.clientY;
      lastMoveT = e.timeStamp;
      container.style.cursor = 'grabbing';
      try {
        container.setPointerCapture(e.pointerId);
      } catch {
        /* capture is best-effort */
      }
      stop(); // frames are driven by pointermove while dragging
    };

    const endDrag = (e: PointerEvent, withMomentum: boolean) => {
      try {
        if (container.hasPointerCapture(e.pointerId)) container.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      container.style.cursor = 'grab';
      engaged = false;
      activePointer = null;
      if (!withMomentum || e.timeStamp - lastMoveT > 90) {
        velYaw = 0;
        velPitch = 0;
      }
      releasedAt = e.timeStamp;
      resume = 0;
      kick();
    };

    const onPointerDown = (e: PointerEvent) => {
      if (activePointer !== null) return; // ignore extra fingers
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      activePointer = e.pointerId;
      rejected = false;
      engaged = false;
      startX = e.clientX;
      startY = e.clientY;
      if (e.pointerType === 'mouse') {
        e.preventDefault(); // no text selection / native drag
        beginDrag(e);
      }
      // touch / pen: wait for intent (horizontal vs vertical) before claiming the gesture
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerId !== activePointer || rejected) return;
      if (!engaged) {
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        if (Math.hypot(dx, dy) < INTENT_DISTANCE) return;
        if (Math.abs(dx) > Math.abs(dy) * INTENT_RATIO) {
          beginDrag(e);
        } else {
          // predominantly vertical: let the page scroll (touch-action: pan-y already allows it)
          rejected = true;
          activePointer = null;
          return;
        }
      }
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dt = Math.max(1, e.timeStamp - lastMoveT);
      lastX = e.clientX;
      lastY = e.clientY;
      lastMoveT = e.timeStamp;

      const k = radius > 0 ? 1.25 / radius : 0; // rad per css px
      const dYaw = dx * k;
      const dPitch = dy * k;
      yaw += dYaw;
      pitch = clamp(pitch + dPitch, -PITCH_LIMIT, PITCH_LIMIT);
      // exponential moving average of velocity for momentum
      velYaw = velYaw * 0.55 + (dYaw / dt) * 0.45;
      velPitch = velPitch * 0.55 + (dPitch / dt) * 0.45;

      if (!rafId) {
        rafId = requestAnimationFrame((now) => {
          rafId = 0;
          if (!disposed) {
            lastFrame = now;
            render();
          }
        });
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerId !== activePointer) return;
      if (engaged) endDrag(e, true);
      else activePointer = null;
    };

    const onPointerCancel = (e: PointerEvent) => {
      if (e.pointerId !== activePointer) return;
      if (engaged) endDrag(e, false);
      else activePointer = null;
    };

    const onLostCapture = (e: PointerEvent) => {
      if (e.pointerId === activePointer && engaged) endDrag(e, false);
    };

    // ----- observers ------------------------------------------------------
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      resize(entry.contentRect.width);
      kick();
    });
    ro.observe(container);

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        visible = entry.isIntersecting;
        if (visible) kick();
        else stop();
      },
      { rootMargin: '96px', threshold: 0 },
    );
    io.observe(container);

    const onVisibility = () => {
      pageHidden = document.hidden;
      if (pageHidden) stop();
      else kick();
    };
    document.addEventListener('visibilitychange', onVisibility);

    const rmQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion = rmQuery.matches;
    const onReducedMotion = (ev: MediaQueryListEvent) => {
      reducedMotion = ev.matches;
      if (reducedMotion) {
        velYaw = 0;
        velPitch = 0;
      }
      kick();
    };
    rmQuery.addEventListener('change', onReducedMotion);

    container.addEventListener('pointerdown', onPointerDown);
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerup', onPointerUp);
    container.addEventListener('pointercancel', onPointerCancel);
    container.addEventListener('lostpointercapture', onLostCapture);
    container.style.cursor = 'grab';

    // initial paint (ResizeObserver also fires on observe, but be explicit)
    resize(container.clientWidth);

    return () => {
      disposed = true;
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      rmQuery.removeEventListener('change', onReducedMotion);
      container.removeEventListener('pointerdown', onPointerDown);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('pointercancel', onPointerCancel);
      container.removeEventListener('lostpointercapture', onLostCapture);
      container.style.cursor = '';
      bodyGradient = null;
    };
  }, [variant]);

  const ariaLabel = `Interactive globe of technology skills: ${SKILLS.map((s) => s.label).join(', ')}. Drag horizontally to rotate.`;

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={ariaLabel}
      className={`relative mx-auto w-full select-none overflow-visible ${className}`}
      style={{
        maxWidth: MAX_SIZE,
        aspectRatio: '1 / 1', // reserves the square before first paint
        touchAction: 'pan-y pinch-zoom', // vertical swipes scroll the page; we only claim horizontal drags
        WebkitUserSelect: 'none',
        userSelect: 'none',
        WebkitTapHighlightColor: 'transparent',
        contain: 'layout style',
      }}
    >
      {/* Ambient glow behind the sphere (cheap CSS gradient, no blur filter) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[-12%] rounded-full"
        style={{ background: palette.glow }}
      />

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute left-0 top-0 block"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Labels: DOM pills positioned by the projection, crisp at any DPR */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {SKILLS.map((skill, i) => (
          <span
            key={skill.label}
            ref={(el) => {
              labelRefs.current[i] = el;
            }}
            className={`absolute left-0 top-0 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono font-bold leading-none tracking-tight backdrop-blur-[2px] ${palette.pill}`}
            style={{
              fontSize: 'var(--ss-fs, 11px)',
              opacity: 0,
              transform: 'translate3d(-9999px, -9999px, 0)',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
            }}
          >
            <span
              className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: skill.color, boxShadow: `0 0 0 2px ${skill.color}33` }}
            />
            {skill.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillSphere;
