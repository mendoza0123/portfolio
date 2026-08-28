import React, { useEffect } from 'react';
import { X, ShieldAlert, CheckCircle2, Layers, Sparkles } from 'lucide-react';
import { ProjectBrief } from '../types';

interface ProjectDetailModalProps {
  project: ProjectBrief | null;
  onClose: () => void;
  onOpenContact: (subject?: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onOpenContact,
}) => {
  // Freeze the page behind the sheet, and flag it so the phone action bar
  // stands down while the modal owns the bottom of the screen.
  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.dataset.modalOpen = 'true';
    return () => {
      document.body.style.overflow = prev;
      delete document.body.dataset.modalOpen;
    };
  }, [project]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-slate-900/60 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-t-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-slate-800 h-[92vh] sm:h-auto sm:max-h-[90vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-xl px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-bold">
              {project.briefNumber}
            </span>
            <span className="text-xs font-mono text-slate-500 font-semibold capitalize">
              {project.category.replace('_', ' ')}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-all"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-4 sm:p-8 space-y-5 sm:space-y-7 overflow-y-auto">
          {/* Header Title */}
          <div>
            <h2 className="font-heading text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {project.title}
            </h2>
            <p className="text-[15px] sm:text-base text-slate-600 mt-1.5 font-sans leading-snug">
              {project.plainSubtitle}
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {project.metrics.map((m, mIdx) => (
              <div
                key={mIdx}
                className="p-2.5 sm:p-4 rounded-xl bg-blue-50/50 border border-blue-100 text-center"
              >
                <div className="font-heading text-base sm:text-xl font-extrabold text-slate-900 leading-tight">
                  {m.value}
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-600 font-mono mt-0.5 font-semibold leading-tight">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Problem -> Solution -> Impact, in the owner's language */}
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-1.5">
              <div className="flex items-center gap-2 text-rose-700 text-[11px] font-mono font-bold uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                <span>The Problem</span>
              </div>
              <p className="text-[15px] text-slate-700 leading-relaxed font-sans">
                {project.plainProblem}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-1.5">
              <div className="flex items-center gap-2 text-blue-700 text-[11px] font-mono font-bold uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>What We Built</span>
              </div>
              <p className="text-[15px] text-slate-700 leading-relaxed font-sans">
                {project.plainSolution}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-700 text-[11px] font-mono font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>What It Saved</span>
              </div>
              <p className="text-[15px] text-slate-700 leading-relaxed font-sans">
                {project.plainImpact}
              </p>
            </div>
          </div>

        </div>

        {/* Modal Bottom CTA Footer */}
        <div className="sticky bottom-0 z-20 bg-white/95 backdrop-blur-xl px-4 sm:px-6 py-3 sm:py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs font-mono text-slate-500 hidden sm:inline">
            Real project &bullet; details shared under NDA
          </span>
          <button
            onClick={() => {
              onClose();
              onOpenContact(`Inquiry regarding ${project.briefNumber}: ${project.title}`);
            }}
            className="w-full sm:w-auto min-h-[44px] px-6 py-3 rounded-xl font-mono text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-200" />
            <span>Build something like this &rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

