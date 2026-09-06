import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles, TrendingUp, Clock, DollarSign, CheckCircle } from 'lucide-react';
import { HERO_STATS } from '../data/portfolioData';
import { SkillSphere } from './SkillSphere';

interface HeroProps {
  onOpenContact: (subject?: string) => void;
  onRunSimulation: () => void;
}

const TRUST_BADGES = [
  { label: '100% Owned Code & Server', tone: 'text-blue-600' },
  { label: 'Zero SaaS Subscription Tax', tone: 'text-emerald-600' },
  { label: 'Strict NDA & Data Privacy', tone: 'text-indigo-600' },
];

/** Stats and trust badges as one quiet ticker instead of eight stacked tiles. */
const HeroTicker: React.FC = () => {
  const items = [
    ...HERO_STATS.map((s) => ({ kind: 'stat' as const, value: s.value, label: s.label })),
    ...TRUST_BADGES.map((b) => ({ kind: 'badge' as const, value: '', label: b.label, tone: b.tone })),
  ];
  // Two copies back to back; the track translates -50% for a seamless loop.
  const track = [...items, ...items];
  return (
    <div className="ticker relative mt-10 sm:mt-14 overflow-hidden" aria-label="Track record and guarantees">
      <div className="ticker-track flex w-max items-center gap-3 sm:gap-4">
        {track.map((it, i) => (
          <div
            key={i}
            aria-hidden={i >= items.length}
            className="flex items-center gap-2 shrink-0 whitespace-nowrap px-4 py-2 rounded-full bg-white/80 border border-slate-200 shadow-xs backdrop-blur-sm"
          >
            {it.kind === 'stat' ? (
              <>
                <span className="font-heading text-sm sm:text-base font-extrabold text-slate-900">{it.value}</span>
                <span className="text-[11px] sm:text-xs text-slate-600 font-medium">{it.label}</span>
              </>
            ) : (
              <>
                <CheckCircle2 className={`w-3.5 h-3.5 ${it.tone}`} />
                <span className="text-[11px] sm:text-xs font-mono font-semibold text-slate-700">{it.label}</span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Hero: React.FC<HeroProps> = ({ onOpenContact, onRunSimulation }) => {
  return (
    <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24 overflow-hidden frosted-grid">
      {/* Light Frosted Background Ambient Accents */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-0 w-[450px] h-[450px] bg-indigo-400/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Executive Trust Pill */}
        <div className="flex items-center justify-center md:justify-start mb-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
            </span>
            <span className="text-xs font-mono font-bold text-slate-700">
              Autonomous Operations &bullet; Zero-Hallucination AI Engineering
            </span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
              Q3/Q4 Client Openings
            </span>
          </div>
        </div>

        {/* Main Hero: headline + CTAs on the left, Skill Sphere on the right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          <div className="lg:col-span-7 text-center lg:text-left space-y-5 sm:space-y-6">
            <div className="relative inline-block">
              {/* Subtle Slow-Moving Radial Gradient Background Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-indigo-500/15 to-emerald-500/10 rounded-3xl blur-2xl animate-slow-radial -z-10" />

              <h1 className="font-heading text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                I build autonomous AI systems that{' '}
                <span className="relative inline-block px-2 py-0.5">
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-lg -rotate-1 scale-105" />
                  <span className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent animate-text-shimmer font-black">
                    cut 80% of manual work
                  </span>
                </span>{' '}
                and scale your revenue.
              </h1>
            </div>

            <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-snug sm:leading-relaxed font-sans">
              Stop manual operations. Start automated growth. We engineer AI workflows that reclaim 20+ hours weekly for your team.
            </p>

            {/* CTAs — contact details live in the sticky bar, footer and contact section, not here */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 pt-1 sm:pt-2">
              <button
                onClick={() => onOpenContact('Free Systems & AI Growth Audit')}
                className="min-h-[48px] flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-mono text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/25 transition-all hover:scale-[1.02]"
              >
                <span>Get Free Growth Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#solutions"
                className="min-h-[48px] flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-mono text-sm font-bold bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 transition-all shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Explore Industry Solutions</span>
              </a>
            </div>
          </div>

          {/* Interactive 3D Skill Sphere: right column on desktop, under the CTAs on mobile */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <SkillSphere className="w-full max-w-[340px] sm:max-w-[440px] lg:max-w-[520px]" />
          </div>
        </div>

        {/* One quiet strip replaces four stat tiles and three badge pills */}
        <HeroTicker />

        {/* Streamlined & Short-to-the-Point: 3 Profit Killers vs Autonomous Fixes */}
        <div className="mt-10 sm:mt-12 p-4 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-5 border-b border-slate-100">
            <div>
              <span className="text-xs font-mono font-bold text-rose-600 uppercase tracking-wider">
                3 Operational Bottlenecks We Eliminate
              </span>
              <h2 className="font-heading text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                Manual Friction vs. Autonomous Fix
              </h2>
            </div>
            <button
              onClick={() => onOpenContact('Operational Audit')}
              className="text-xs font-mono font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 shrink-0"
            >
              <span>Get Free Systems Audit &rarr;</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
            {/* 1. Lead Leak */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-rose-600 font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>30-Min Lead Leak</span>
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                Leads go cold before sales calls, wasting 40%+ of ad spend.
              </p>
              <div className="pt-2 border-t border-slate-200/60 flex items-start gap-1.5 text-xs text-emerald-800 font-medium">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Fix:</strong> Sub-45s AI voice/WhatsApp instant booking.</span>
              </div>
            </div>

            {/* 2. Spreadsheet Trap */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-rose-600 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Spreadsheet Trap</span>
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                Staff lose 15+ hrs/week copy-pasting data across disconnected apps.
              </p>
              <div className="pt-2 border-t border-slate-200/60 flex items-start gap-1.5 text-xs text-emerald-800 font-medium">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Fix:</strong> Event-driven n8n pipelines sync data 24/7.</span>
              </div>
            </div>

            {/* 3. SaaS Tax */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-rose-600 font-bold flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>SaaS Overcharges</span>
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-snug">
                Zapier & third-party tools charge heavy monthly task penalties.
              </p>
              <div className="pt-2 border-t border-slate-200/60 flex items-start gap-1.5 text-xs text-emerald-800 font-medium">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Fix:</strong> Flat $15/mo self-hosted VPS with unlimited runs.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

