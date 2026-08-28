import React, { useState } from 'react';
import { X, Copy, Check, Terminal, ShieldAlert, CheckCircle2, Layers, Cpu, Server, ExternalLink, Code2, Sparkles, ChevronDown } from 'lucide-react';
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
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  // Technical detail is opt-in: business owners see outcomes, tech teams expand.
  const [showTechnical, setShowTechnical] = useState<boolean>(false);

  if (!project) return null;

  const handleCopy = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-slate-800 max-h-[90vh] flex flex-col">
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
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {project.title}
            </h2>
            <p className="text-[15px] sm:text-base text-slate-600 mt-1.5 font-sans leading-snug">
              {project.plainSubtitle}
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {project.metrics.map((m, mIdx) => (
              <div
                key={mIdx}
                className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 text-center"
              >
                <div className="font-heading text-xl font-extrabold text-slate-900">
                  {m.value}
                </div>
                <div className="text-[11px] text-slate-600 font-mono mt-0.5 font-semibold">
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

          {/* Everything below this line is for engineers, hidden by default */}
          <button
            onClick={() => setShowTechnical((v) => !v)}
            aria-expanded={showTechnical}
            className="w-full min-h-[44px] flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold transition-all"
          >
            <span className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-blue-300" />
              <span>For the Tech Team &mdash; Full Architecture</span>
            </span>
            <ChevronDown
              className={`w-4 h-4 shrink-0 transition-transform ${showTechnical ? 'rotate-180' : ''}`}
            />
          </button>

          {showTechnical && (
          <div className="space-y-7 pt-1">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-mono space-y-2">
              <div>
                <strong className="text-slate-900 font-bold">Technical summary:</strong> {project.subtitle}
              </div>
              <div>
                <strong className="text-slate-900 font-bold">Client context:</strong> {project.clientContext}
              </div>
              <div>
                <strong className="text-slate-900 font-bold">Problem:</strong> {project.businessProblem}
              </div>
              <div>
                <strong className="text-slate-900 font-bold">Outcome:</strong> {project.businessOutcome}
              </div>
            </div>

          {/* End-to-End Node Flow Diagram */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Architectural Flow Graph</span>
            </div>

            <div className="p-4.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="text-xs font-mono text-slate-700 leading-relaxed">
                {project.architectureSummary}
              </div>

              {/* Node Chips sequence */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                {project.architectureNodes.map((node, nIdx) => (
                  <React.Fragment key={nIdx}>
                    <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono text-blue-700 font-bold shadow-sm">
                      {node}
                    </span>
                    {nIdx < project.architectureNodes.length - 1 && (
                      <span className="text-slate-400 font-bold">&rarr;</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* API Integrations Table */}
          {project.apiIntegrations.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                <Cpu className="w-4 h-4 text-purple-600" />
                <span>API Integrations & Payloads</span>
              </div>

              <div className="space-y-2.5">
                {project.apiIntegrations.map((api, aIdx) => (
                  <div
                    key={aIdx}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 font-mono text-xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-blue-700 font-bold">{api.service}</span>
                      {api.endpoint && (
                        <span className="px-2 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200 text-[10px]">
                          {api.endpoint}
                        </span>
                      )}
                    </div>
                    <div className="text-slate-900 font-semibold">{api.purpose}</div>
                    <div className="text-slate-600 text-[11px] leading-relaxed">
                      {api.details}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Code Snippets */}
          {project.customCode.snippets && project.customCode.snippets.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                <Code2 className="w-4 h-4 text-emerald-600" />
                <span>Non-Trivial Custom Code Snippets</span>
              </div>
              <p className="text-xs text-slate-600">
                {project.customCode.description}
              </p>

              {project.customCode.snippets.map((snip, sIdx) => (
                <div
                  key={sIdx}
                  className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden font-mono text-xs shadow-inner"
                >
                  <div className="bg-slate-800/90 px-4 py-2.5 flex items-center justify-between border-b border-slate-700">
                    <span className="text-slate-200 font-bold">{snip.filename}</span>
                    <button
                      onClick={() => handleCopy(snip.code, sIdx)}
                      className="flex items-center gap-1 text-[11px] text-blue-300 hover:text-white transition-colors"
                    >
                      {copiedIndex === sIdx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 text-slate-200 overflow-x-auto leading-relaxed text-[11px]">
                    <code>{snip.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          )}

          {/* Real-World Defect Log */}
          {project.defectLog && project.defectLog.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-700 uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                <span>Documented Defect & Failure-Mode Resolution</span>
              </div>

              {project.defectLog.map((def, dIdx) => (
                <div
                  key={dIdx}
                  className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2 text-xs font-mono"
                >
                  <div className="text-amber-900 font-bold">
                    Problem: {def.problem}
                  </div>
                  <div className="text-slate-700">
                    <strong className="text-slate-900">Root Cause:</strong> {def.rootCause}
                  </div>
                  <div className="text-emerald-800">
                    <strong className="text-emerald-900">Solution:</strong> {def.solution}
                  </div>
                  <div className="text-blue-800">
                    <strong className="text-blue-900">Engineering Impact:</strong> {def.impact}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Deployment Stack & Environment */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-800 font-bold uppercase">
              <Server className="w-4 h-4 text-blue-600" />
              <span>Deployment Stack & Environment</span>
            </div>
            <div className="text-slate-600">
              <strong className="text-slate-900">Runtime:</strong> {project.deploymentDetails.stack}
            </div>
            <div className="text-slate-600">
              <strong className="text-slate-900">Hosting:</strong> {project.deploymentDetails.hosting}
            </div>
            {project.deploymentDetails.specialFixes.map((fix, fIdx) => (
              <div key={fIdx} className="text-blue-700 flex items-start gap-1.5 pt-1">
                <span>&bull;</span>
                <span>{fix}</span>
              </div>
            ))}
          </div>

          {/* Demonstrates tags */}
          <div className="pt-1">
            <div className="text-xs font-mono uppercase text-slate-500 font-bold mb-2">
              Engineering Competencies
            </div>
            <div className="flex flex-wrap gap-2">
              {project.demonstrates.map((demo, dIdx) => (
                <span
                  key={dIdx}
                  className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700 font-semibold"
                >
                  {demo}
                </span>
              ))}
            </div>
          </div>
          </div>
          )}
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

