import React from 'react';
import { ShieldCheck, Server, Zap, Database, CheckCircle2, Cpu, Terminal, ArrowUpRight, Bot, Workflow, Layers } from 'lucide-react';
import { PHILOSOPHY_PILLARS, TECH_STACKS } from '../data/portfolioData';

export const EngineeringPhilosophy: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-blue-600" />;
      case 'Server':
        return <Server className="w-5 h-5 text-emerald-600" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-600" />;
      case 'Database':
        return <Database className="w-5 h-5 text-indigo-600" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5 text-teal-600" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-purple-600" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section id="philosophy" className="py-20 relative bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-xs mb-3 font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>FOUNDER-FIRST ENGINEERING STANDARDS</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why High-Growth Companies <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Trust Our Systems</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            AI is an operational multiplier that must be audited, validated, and isolated — never an unchecked black box. We engineer defensive architectures built for 99.9% reliability, zero hallucination, and full business ownership.
          </p>
        </div>

        {/* 6 Philosophy Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {PHILOSOPHY_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="rounded-2xl bg-white p-6 border border-slate-200 hover:border-slate-300 flex flex-col justify-between transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                    {getIcon(pillar.icon)}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                    {pillar.tag}
                  </span>
                </div>

                <h3 className="font-heading text-lg font-bold text-slate-900 mb-1">
                  {pillar.title}
                </h3>
                <div className="text-xs font-mono text-blue-700 mb-3 font-semibold">
                  {pillar.subtitle}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Breakdown Section */}
        <div className="pt-10 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-heading text-2xl font-bold text-slate-900 tracking-tight">
              Production Tech Stack & Tooling
            </h3>
            <p className="text-xs sm:text-sm font-mono text-slate-500 mt-1">
              Field-tested, enterprise-ready infrastructure running 24/7 client operations with zero maintenance friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TECH_STACKS.map((cat, cIdx) => (
              <div
                key={cIdx}
                className="rounded-2xl bg-white border border-slate-200 p-5 space-y-4 shadow-sm"
              >
                <div>
                  <div className="font-heading text-base font-bold text-slate-900">
                    {cat.category}
                  </div>
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                    {cat.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  {cat.items.map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-mono font-bold text-slate-900">
                          {item.name}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500">
                          {item.role}
                        </div>
                      </div>
                      {item.badge && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

