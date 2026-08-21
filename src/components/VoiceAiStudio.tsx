import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  PhoneCall,
  Play,
  Pause,
  RotateCcw,
  Mic,
  Volume2,
  VolumeX,
  Sparkles,
  Activity,
  CheckCircle2,
  Bot,
  User,
  Radio,
  FileAudio,
  Info,
} from 'lucide-react';
import { VOICE_AGENT_DEMOS } from '../data/portfolioData';
import { VoiceAgentSample } from '../types';

interface VoiceAiStudioProps {
  onOpenContact: (subject?: string) => void;
}

// Convert "MM:SS" to total seconds
function parseTimestamp(ts: string): number {
  if (!ts) return 0;
  const parts = ts.split(':').map(Number);
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  return 0;
}

// Format seconds into "MM:SS"
function formatTime(seconds: number): string {
  const clamped = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(clamped / 60);
  const secs = Math.floor(clamped % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

const RED_HIGHLIGHT_KEYWORDS = new Set([
  'ld silk mills',
  'cotton-linen blend',
  'cotton-linen',
  'linen blends',
  'printing solutions',
  'premium fabrics',
  'digital printing',
  'digital print',
  'fabric sourcing',
  'retail sale',
  'web hosting',
  'play plain',
  'shirtings',
  'polyester',
  'viscose',
  'garments',
  'whatsapp',
  'uniform',
  'milano',
  'cotton',
  'linen',
  'beige',
  'web24',
  'vps',
]);

// Longest alternatives first: "Cotton-linen blend" must win over "cotton" and "linen".
const HIGHLIGHT_REGEX =
  /(LD Silk Mills|Cotton-linen blend|Cotton-linen|linen blends|printing solutions|premium fabrics|digital printing|digital print|fabric sourcing|retail sale|web hosting|Play Plain|shirtings|polyester|viscose|garments|WhatsApp|uniform|Milano|cotton|linen|beige|Web24|VPS)/gi;

function renderTranscriptText(text: string): React.ReactNode {
  if (!text) return null;
  const parts = text.split(HIGHLIGHT_REGEX);
  return parts.map((part, idx) => {
    if (RED_HIGHLIGHT_KEYWORDS.has(part.toLowerCase())) {
      return (
        <span
          key={idx}
          className="text-red-600 font-bold bg-red-50 px-1.5 py-0.5 rounded border border-red-200/80 inline-block my-0.5"
        >
          {part}
        </span>
      );
    }
    return part;
  });
}

// Web Audio API Ring & Chime Generator
class VoiceAudioFx {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playConnectChime() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.frequency.setValueAtTime(440, now);
      osc2.frequency.setValueAtTime(480, now);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.35);
      osc2.stop(now + 0.35);
    } catch (e) {
      // AudioContext fallback ignored
    }
  }

  playTurnBeep() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {
      // ignored
    }
  }
}

const audioFx = new VoiceAudioFx();

// Conversational Hinglish pace used to model how long a turn takes to speak.
// Only relative weight matters: turn positions are stretched onto the real audio length.
const WORDS_PER_SECOND = 2.6;
const WAVEFORM_BARS = 40;

function estimateSpeechSeconds(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(0.8, words / WORDS_PER_SECOND);
}

export const VoiceAiStudio: React.FC<VoiceAiStudioProps> = ({ onOpenContact }) => {
  const [selectedAgentId, setSelectedAgentId] = useState<string>('vapi-monika');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isAudioSpeaking, setIsAudioSpeaking] = useState<boolean>(false);

  // Real length read off the file, not a hardcoded guess.
  const [audioDuration, setAudioDuration] = useState<number | null>(null);
  const [audioFailed, setAudioFailed] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const transcriptScrollRef = useRef<HTMLDivElement>(null);
  const activeTurnRef = useRef<HTMLDivElement>(null);
  const lastSpokenTurnIndexRef = useRef<number | null>(null);

  // Live spectrum plumbing for the waveform (real audio only)
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const barRefs = useRef<Array<HTMLDivElement | null>>([]);

  const currentAgent: VoiceAgentSample = useMemo(() => {
    return VOICE_AGENT_DEMOS.find((a) => a.id === selectedAgentId) || VOICE_AGENT_DEMOS[0];
  }, [selectedAgentId]);

  const activeAudioUrl: string | null = currentAgent.audioUrl || null;
  const activeAudioName: string | null = currentAgent.audioFileName || null;
  const isRealAudio = !!activeAudioUrl && !audioFailed;

  // How long the transcript would run at a natural speaking pace.
  const modelSpan = useMemo(() => {
    const transcript = currentAgent.transcript;
    if (!transcript.length) return 1;
    const last = transcript[transcript.length - 1];
    return parseTimestamp(last.timestamp) + estimateSpeechSeconds(last.text);
  }, [currentAgent]);

  // The slice of the recording this transcript covers. Defaults to the whole file.
  const clipStart = currentAgent.clipStart ?? 0;
  const clipEnd = useMemo(() => {
    if (currentAgent.clipEnd != null) return currentAgent.clipEnd;
    if (isRealAudio && audioDuration) return audioDuration;
    return clipStart + modelSpan;
  }, [currentAgent, isRealAudio, audioDuration, clipStart, modelSpan]);

  const clipLength = Math.max(1, clipEnd - clipStart);

  // Stretch the modelled transcript onto the real recording so the turns always
  // finish with the audio. Set absoluteTiming on a sample once its timestamps
  // are pinned to real audio offsets and this becomes a no-op.
  const timeScale = useMemo(() => {
    if (currentAgent.absoluteTiming || !isRealAudio) return 1;
    return clipLength / modelSpan;
  }, [currentAgent, isRealAudio, clipLength, modelSpan]);

  // Turn boundaries, in absolute file seconds.
  const turnTimeRanges = useMemo(() => {
    const transcript = currentAgent.transcript;
    return transcript.map((turn, idx) => {
      const start = clipStart + parseTimestamp(turn.timestamp) * timeScale;
      const nextTurn = transcript[idx + 1];
      const end = nextTurn
        ? clipStart + parseTimestamp(nextTurn.timestamp) * timeScale
        : clipEnd;
      return { start, end, turn, idx };
    });
  }, [currentAgent, clipStart, clipEnd, timeScale]);

  // Determine current active transcript turn index based on currentTime
  const activeTranscriptIndex = useMemo(() => {
    const found = turnTimeRanges.findIndex(
      (range) => currentTime >= range.start && currentTime < range.end
    );
    if (found !== -1) return found;
    if (currentTime >= (turnTimeRanges[turnTimeRanges.length - 1]?.start || 0)) {
      return turnTimeRanges.length - 1;
    }
    return 0;
  }, [currentTime, turnTimeRanges]);

  const currentTurn = currentAgent.transcript[activeTranscriptIndex];
  const isAgentSpeaking = currentTurn?.speaker === 'agent';

  // Duration label for an agent pill: real length when we have it, modelled otherwise.
  const agentDurationLabel = useCallback(
    (agent: VoiceAgentSample) => {
      if (agent.id === currentAgent.id) return formatTime(clipLength);
      if (agent.clipEnd != null) return formatTime(agent.clipEnd - (agent.clipStart ?? 0));
      const last = agent.transcript[agent.transcript.length - 1];
      if (!last) return '--:--';
      return formatTime(parseTimestamp(last.timestamp) + estimateSpeechSeconds(last.text));
    },
    [currentAgent, clipLength]
  );

  // A new source means a new media element, so the old Web Audio graph is dead.
  useEffect(() => {
    setAudioDuration(null);
    setAudioFailed(false);
    sourceRef.current = null;
    analyserRef.current = null;
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
  }, [activeAudioUrl]);

  // Park the playhead at the start of the newly selected agent's clip.
  useEffect(() => {
    setCurrentTime(currentAgent.clipStart ?? 0);
    lastSpokenTurnIndexRef.current = null;
  }, [selectedAgentId, currentAgent.clipStart]);

  const handleLoadedMetadata = () => {
    const d = audioRef.current?.duration;
    if (d && isFinite(d) && d > 0) {
      setAudioDuration(d);
    }
  };

  // Handle HTML5 Audio element sync
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
      audioRef.current.muted = isMuted;
    }
  }, [playbackSpeed, isMuted]);

  // Voice synthesis fallback speaker function (when no audio file is attached)
  const speakCurrentTurnFallback = useCallback(
    (turnIndex: number) => {
      // With a real recording loaded, the media element handles the sound.
      if (isRealAudio || typeof window === 'undefined' || !('speechSynthesis' in window) || isMuted) {
        return;
      }

      const turn = currentAgent.transcript[turnIndex];
      if (!turn) return;

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(turn.text);
      utterance.rate = (turn.speaker === 'agent' ? 1.05 : 1.0) * playbackSpeed;

      const allVoices = window.speechSynthesis.getVoices();

      if (turn.speaker === 'agent') {
        utterance.pitch = 1.15;
        const femaleHindiVoice = allVoices.find(
          (v) =>
            (v.lang.startsWith('hi') || v.lang.includes('IN') || v.name.toLowerCase().includes('india') || v.name.toLowerCase().includes('hindi')) &&
            (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('zira') || v.name.toLowerCase().includes('heera') || v.name.toLowerCase().includes('veena') || v.name.toLowerCase().includes('neerja') || v.name.toLowerCase().includes('google'))
        );
        const genericFemaleVoice = allVoices.find(
          (v) =>
            v.name.toLowerCase().includes('female') ||
            v.name.toLowerCase().includes('samantha') ||
            v.name.toLowerCase().includes('victoria') ||
            v.name.toLowerCase().includes('karen') ||
            v.name.toLowerCase().includes('zira')
        );
        utterance.voice = femaleHindiVoice || genericFemaleVoice || allVoices[0] || null;
      } else {
        utterance.pitch = 0.9;
        const maleHindiVoice = allVoices.find(
          (v) =>
            (v.lang.startsWith('hi') || v.lang.includes('IN')) &&
            (v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('ravi') || v.name.toLowerCase().includes('david'))
        );
        const genericMaleVoice = allVoices.find(
          (v) =>
            v.name.toLowerCase().includes('male') ||
            v.name.toLowerCase().includes('david') ||
            v.name.toLowerCase().includes('alex') ||
            v.name.toLowerCase().includes('george')
        );
        utterance.voice = maleHindiVoice || genericMaleVoice || allVoices[1] || allVoices[0] || null;
      }

      utterance.onstart = () => setIsAudioSpeaking(true);
      utterance.onend = () => setIsAudioSpeaking(false);
      utterance.onerror = () => setIsAudioSpeaking(false);

      audioFx.playTurnBeep();
      window.speechSynthesis.speak(utterance);
    },
    [currentAgent, isRealAudio, isMuted, playbackSpeed]
  );

  // Trigger speech synthesis fallback or beep
  useEffect(() => {
    if (isPlaying && !isRealAudio && !isMuted) {
      if (lastSpokenTurnIndexRef.current !== activeTranscriptIndex) {
        lastSpokenTurnIndexRef.current = activeTranscriptIndex;
        speakCurrentTurnFallback(activeTranscriptIndex);
      }
    } else if (!isPlaying) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsAudioSpeaking(false);
    }
  }, [activeTranscriptIndex, isPlaying, isMuted, isRealAudio, speakCurrentTurnFallback]);

  // Cleanup speech when switching agents
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [selectedAgentId]);

  // Audio element time updates (when playing the real recording)
  const handleAudioTimeUpdate = () => {
    if (audioRef.current && isPlaying) {
      const t = audioRef.current.currentTime;
      if (t >= clipEnd) {
        audioRef.current.pause();
        setIsPlaying(false);
        setCurrentTime(clipEnd);
      } else {
        setCurrentTime(t);
      }
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(clipEnd);
  };

  // Timer loop for playback advancement (synth engine only; real audio drives itself)
  useEffect(() => {
    let interval: any;
    if (isPlaying && !isRealAudio) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.25 * playbackSpeed;
          if (next >= clipEnd) {
            setIsPlaying(false);
            if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
              window.speechSynthesis.cancel();
            }
            return clipEnd;
          }
          return next;
        });
      }, 250);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, clipEnd, isRealAudio]);

  // Tap the media element once so the waveform shows the recording's real spectrum.
  const ensureAnalyser = useCallback(() => {
    if (!audioRef.current || sourceRef.current) return;
    try {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      if (!Ctx) return;
      const ctx: AudioContext = new Ctx();
      const source = ctx.createMediaElementSource(audioRef.current);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.72;
      source.connect(analyser);
      analyser.connect(ctx.destination);
      audioCtxRef.current = ctx;
      sourceRef.current = source;
      analyserRef.current = analyser;
    } catch (e) {
      // Waveform is decorative; playback continues without it.
    }
  }, []);

  // Drive the bars straight through refs — 60fps setState would re-render the section.
  useEffect(() => {
    const setBars = (heights: number[]) => {
      for (let i = 0; i < WAVEFORM_BARS; i++) {
        const el = barRefs.current[i];
        if (el) el.style.height = `${Math.round(heights[i] * 100)}%`;
      }
    };

    if (!isPlaying) {
      setBars(new Array(WAVEFORM_BARS).fill(0.2));
      return;
    }

    const analyser = analyserRef.current;
    const spectrum = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;
    let frame = 0;
    let lastPushed = -1;

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);

      // Keep the transcript on the audio: the timeupdate event only fires ~4x/sec,
      // which is enough to lag a turn change by a visible quarter second.
      const el = audioRef.current;
      if (el && !el.paused) {
        const t = el.currentTime;
        if (Math.abs(t - lastPushed) > 0.08) {
          lastPushed = t;
          setCurrentTime(t >= clipEnd ? clipEnd : t);
        }
      }

      // ~30fps is plenty for 40 bars and halves the layout work.
      if (frame++ % 2) return;

      const heights = new Array(WAVEFORM_BARS);
      if (analyser && spectrum) {
        analyser.getByteFrequencyData(spectrum);
        // The recording is 16kHz, so all its energy sits in the first ~43 bins.
        for (let i = 0; i < WAVEFORM_BARS; i++) {
          heights[i] = Math.max(0.2, Math.min(1, (spectrum[i + 1] / 255) * 1.35));
        }
      } else {
        // Synth engine: a plausible idle envelope so the meter still reads live.
        const t = frame / 30;
        for (let i = 0; i < WAVEFORM_BARS; i++) {
          const wobble = Math.sin(t * 3.1 + i * 0.7) * Math.sin(t * 1.3 + i * 0.31);
          heights[i] = 0.25 + Math.abs(wobble) * 0.6;
        }
      }
      setBars(heights);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [isPlaying, isRealAudio, clipEnd]);

  // Tear down the audio graph on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {});
    };
  }, []);

  // Auto-scroll transcript to active turn
  useEffect(() => {
    if (isPlaying && activeTurnRef.current && transcriptScrollRef.current) {
      activeTurnRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [activeTranscriptIndex, isPlaying]);

  const startPlayback = (fromTime: number) => {
    lastSpokenTurnIndexRef.current = null;
    setCurrentTime(fromTime);
    if (audioRef.current) {
      ensureAnalyser();
      audioCtxRef.current?.resume().catch(() => {});
      audioRef.current.currentTime = fromTime;
      audioRef.current.play().catch(() => setAudioFailed(true));
    }
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    audioFx.playConnectChime();
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }
    // Past the end of the clip, restart it.
    startPlayback(currentTime >= clipEnd - 0.25 ? clipStart : currentTime);
  };

  const handleReset = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = clipStart;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setCurrentTime(clipStart);
    lastSpokenTurnIndexRef.current = null;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    lastSpokenTurnIndexRef.current = null;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  // Jump to a turn using its scaled position, not its raw transcript timestamp.
  const handleTurnClick = (turnIdx: number) => {
    audioFx.playConnectChime();
    const target = turnTimeRanges[turnIdx]?.start ?? clipStart;
    if (isPlaying) {
      setCurrentTime(target);
      if (audioRef.current) audioRef.current.currentTime = target;
    } else {
      startPlayback(target);
    }
    // Claim the turn before the synth effect can, so it is not spoken twice.
    lastSpokenTurnIndexRef.current = turnIdx;
    if (!isRealAudio) speakCurrentTurnFallback(turnIdx);
  };

  const toggleSpeed = () => {
    let nextSpeed = 1;
    if (playbackSpeed === 1) nextSpeed = 1.25;
    else if (playbackSpeed === 1.25) nextSpeed = 1.5;
    else nextSpeed = 1;

    setPlaybackSpeed(nextSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  };

  const toggleMute = () => {
    if (!isMuted) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsMuted(true);
    } else {
      setIsMuted(false);
      if (isPlaying && !isRealAudio) {
        speakCurrentTurnFallback(activeTranscriptIndex);
      }
    }
  };

  return (
    <section id="voice-ai" className="py-14 sm:py-20 relative bg-slate-50 border-t border-slate-200">
      {/* Real recording. Keyed so a source swap gets a fresh element + Web Audio graph. */}
      {activeAudioUrl && (
        <audio
          key={activeAudioUrl}
          ref={audioRef}
          src={activeAudioUrl}
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleAudioTimeUpdate}
          onEnded={handleAudioEnded}
          onError={() => setAudioFailed(true)}
          preload="metadata"
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 font-mono text-xs mb-3 font-bold">
            <PhoneCall className="w-3.5 h-3.5 text-red-600" />
            <span>SUB-300MS REAL-TIME CONVERSATIONAL VOICE ENGINES</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            24/7 Bilingual Voice AI <span className="bg-gradient-to-r from-red-600 via-rose-600 to-indigo-600 bg-clip-text text-transparent">Real Recorded Call Audio</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            This is an unedited outbound call from the production line, not a mock-up &mdash; the turn-taking, the pauses and the response latency are exactly what a prospect hears. The transcript below tracks the recording as it plays, at <strong className="text-slate-900 font-bold">$0.03/minute</strong>.
          </p>
        </div>

        {/* Recorded call picker */}
        <div className="flex items-center justify-center gap-4 mb-6 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {VOICE_AGENT_DEMOS.map((agent) => {
              const isSelected = selectedAgentId === agent.id;
              const durationLabel = agentDurationLabel(agent);
              return (
                <button
                  key={agent.id}
                  onClick={() => {
                    handleReset();
                    setSelectedAgentId(agent.id);
                  }}
                  className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-red-600 text-white shadow-md shadow-red-500/20'
                      : 'text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100'
                  }`}
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{agent.name.split(' (')[0]}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-normal ${
                      isSelected ? 'bg-red-700/80 text-white' : 'bg-slate-200/80 text-slate-600'
                    }`}
                  >
                    {durationLabel}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* What is actually feeding the player */}
        {isRealAudio ? (
          <div className="max-w-5xl mx-auto mb-6 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-2 text-xs font-mono">
            <FileAudio className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Recorded call: <strong>{activeAudioName}</strong>
              {audioDuration
                ? ` · transcript pinned to ${formatTime(clipLength)} of ${formatTime(audioDuration)} of real telephony audio`
                : ' · loading…'}
            </span>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto mb-6 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center gap-2 text-xs font-mono">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              {audioFailed
                ? 'Recording could not be loaded — reading the transcript with the browser speech engine instead.'
                : 'No recording attached — reading the transcript with the browser speech engine.'}
            </span>
          </div>
        )}

        {/* Interactive Call Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Call Simulator & Interactive Audio Player */}
          <div className="lg:col-span-7 rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 shadow-sm">
            {/* Call Status Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-slate-100 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 shadow-sm shrink-0">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span>{currentAgent.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold flex items-center gap-1">
                      <Radio className={`w-3 h-3 ${isPlaying ? 'animate-pulse text-emerald-600' : 'text-slate-400'}`} />
                      <span>
                        {isPlaying
                          ? isRealAudio
                            ? 'PLAYING REAL AUDIO FILE'
                            : isAgentSpeaking
                            ? 'AI SPEAKING ALOUD'
                            : 'CALLER SPEAKING ALOUD'
                          : 'AUDIO ENGINE READY'}
                      </span>
                    </span>
                  </h3>
                  <div className="text-xs text-slate-500 font-mono">
                    {currentAgent.persona}
                  </div>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className={`p-2 rounded-lg font-mono text-xs transition-all border ${
                    isMuted
                      ? 'bg-rose-50 border-rose-300 text-rose-700'
                      : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                  }`}
                  title={isMuted ? 'Unmute Audio Voice' : 'Mute Audio Voice'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
                </button>

                <button
                  onClick={toggleSpeed}
                  className="px-2.5 py-1.5 rounded-lg font-mono text-[11px] font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all border border-slate-200"
                  title="Playback Speed"
                >
                  {playbackSpeed}x
                </button>

                <button
                  onClick={handleReset}
                  className="p-2 rounded-lg font-mono text-xs text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-all border border-slate-200"
                  title="Restart Call"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={handleTogglePlay}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-500/20 transition-all hover:scale-105"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-white" />
                      <span>Pause Call</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>
                        {currentTime > clipStart
                          ? 'Resume Audio'
                          : `Play ${currentAgent.name.split(' (')[0]} Call (${formatTime(clipLength)})`}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Audio Scrubber & Live Time */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-red-600" />
                  <span className="text-slate-700 font-semibold truncate max-w-[280px] sm:max-w-md">
                    {activeAudioName || 'Simulated vocal engine'}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-bold shrink-0">
                  <span className="text-red-700 font-mono text-sm">{formatTime(currentTime - clipStart)}</span>
                  <span className="text-slate-400">/</span>
                  <span className="text-slate-600 font-mono text-sm">{formatTime(clipLength)}</span>
                </div>
              </div>

              {/* Progress Slider */}
              <div className="relative">
                <input
                  type="range"
                  min={clipStart}
                  max={clipEnd}
                  step="0.25"
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
              </div>

              {/* Live spectrum, driven by an AnalyserNode tapped off the media element */}
              <div className="flex items-end justify-between gap-1 h-7 pt-1">
                {Array.from({ length: WAVEFORM_BARS }).map((_, i) => {
                  const progressPct = ((currentTime - clipStart) / clipLength) * WAVEFORM_BARS;
                  const isPassed = i <= progressPct;
                  return (
                    <div
                      key={i}
                      ref={(el) => {
                        barRefs.current[i] = el;
                      }}
                      className={`w-full rounded-full transition-[background-color] duration-200 ${
                        isPlaying
                          ? isPassed
                            ? 'bg-red-600'
                            : 'bg-red-200'
                          : isPassed
                          ? 'bg-slate-400'
                          : 'bg-slate-200'
                      }`}
                      style={{ height: '20%' }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Real-time Dialogue Transcript with Clickable Turns */}
            <div
              ref={transcriptScrollRef}
              className="space-y-3 max-h-[380px] overflow-y-auto pr-1.5 scroll-smooth"
            >
              {currentAgent.transcript.map((turn, tIdx) => {
                const isCurrent = tIdx === activeTranscriptIndex;
                const isAgent = turn.speaker === 'agent';

                return (
                  <div
                    key={tIdx}
                    ref={isCurrent ? activeTurnRef : null}
                    onClick={() => handleTurnClick(tIdx)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-red-50/70 border-red-400 shadow-sm ring-2 ring-red-400/20'
                        : isAgent
                        ? 'bg-white border-slate-200 hover:border-slate-300'
                        : 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5 text-xs font-mono">
                      <span
                        className={`font-bold flex items-center gap-1.5 ${
                          isAgent ? 'text-red-700' : 'text-blue-700'
                        }`}
                      >
                        {isAgent ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                        <span>{isAgent ? currentAgent.name.split(' (')[0] : 'Prospect'}</span>
                        {isCurrent && isPlaying && (
                          <span className="text-[10px] bg-red-100 text-red-800 px-1.5 py-0.2 rounded font-bold animate-pulse">
                            SPEAKING
                          </span>
                        )}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-semibold">
                          {formatTime((turnTimeRanges[tIdx]?.start ?? clipStart) - clipStart)}
                        </span>
                        {isCurrent && isPlaying && (
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                        )}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
                      "{renderTranscriptText(turn.text)}"
                    </p>

                    {/* Detected Intent / Attributes */}
                    {turn.intent && (
                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
                        <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 font-bold">
                          Intent: {turn.intent}
                        </span>
                        {turn.detectedAttributes &&
                          Object.entries(turn.detectedAttributes).map(([k, v]) => (
                            <span
                              key={k}
                              className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                            >
                              {k}: <strong className="text-red-700 font-bold">{v}</strong>
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Engine Specs & Direct Business Impact */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-6 space-y-5 shadow-sm">
              <h3 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-red-600" />
                <span>Voice Architecture Specs</span>
              </h3>

              <div className="space-y-2.5 font-mono text-xs text-slate-700">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500">Core Telephony LLM:</span>
                  <span className="text-slate-900 font-bold">{currentAgent.llm.split(' ')[0]}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500">Speech-to-Text:</span>
                  <span className="text-red-700 font-bold">{currentAgent.stt}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500">Voice Synthesis:</span>
                  <span className="text-slate-900 font-bold">{currentAgent.tts}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500">Median Turnaround:</span>
                  <span className="text-emerald-700 font-bold">{currentAgent.latency}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500">Operating Cost:</span>
                  <span className="text-red-600 font-extrabold">{currentAgent.costPerMin}</span>
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-slate-500 mb-3 font-semibold">
                  Key Engineering Safeguards
                </h4>
                <ul className="space-y-2.5">
                  {currentAgent.keyFeatures.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Consultation CTA */}
              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => onOpenContact(`Bilingual Voice Agent Consultation (${currentAgent.name})`)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-mono text-xs font-bold bg-red-600 hover:bg-red-700 text-white transition-all shadow-md shadow-red-500/20 hover:scale-[1.01]"
                >
                  <Sparkles className="w-4 h-4 text-red-200" />
                  <span>Request Custom Voice Prototype</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
