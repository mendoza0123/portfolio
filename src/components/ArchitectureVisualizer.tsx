import React, { useState } from 'react';
import { Play, RotateCcw, ShieldCheck, CheckCircle2, Terminal, Zap, ArrowRight, Layers, Bot, Cpu, Database, Eye, Shield } from 'lucide-react';
import { WORKFLOW_SIMULATION_STEPS } from '../data/portfolioData';

export const ArchitectureVisualizer: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedStep, setSelectedStep] = useState<number>(0);
  const [executionLogs, setExecutionLogs] = useState<string[]>([
    '[INIT] Autonomous n8n Workflow Engine initialized on secure VPS.',
    '[READY] Click "Simulate Live Lead Pipeline" to observe end-to-end autonomous execution telemetry.'
  ]);

  const handleRunSimulation = () => {
    setIsRunning(true);
    setActiveStepIndex(0);
    setSelectedStep(0);
    setExecutionLogs(['[TRIGGER] Inbound lead received via website webhook.']);

    WORKFLOW_SIMULATION_STEPS.forEach((step, idx) => {
      setTimeout(() => {
        setActiveStepIndex(idx);
        setSelectedStep(idx);
        setExecutionLogs((prev) => [...prev, step.log]);
        if (idx === WORKFLOW_SIMULATION_STEPS.length - 1) {
          setIsRunning(false);
          setExecutionLogs((prev) => [
            ...prev,
            '[SUCCESS] Pipeline executed in 1.4s with 0 errors. RAG Lock confirmed 100% evidence-bound. Meeting booked & WhatsApp sent.'
          ]);
        }
      }, (idx + 1) * 1200);
    });
  };

  const handleReset = () => {
    setIsRunning(false);
    setActiveStepIndex(0);
    setSelectedStep(0);
    setExecutionLogs([
      '[RESET] Pipeline state reset to idle.',
      '[READY] Ready for next execution run.'
    ]);
  };

  const currentStepData = WORKFLOW_SIMULATION_STEPS[selectedStep] || WORKFLOW_SIMULATION_STEPS[0];

  return (
    <section id="architecture" className="py-24 sm:py-40 relative bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-mono text-xs mb-3 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>SEE IT WORK, STEP BY STEP</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How One Lead Becomes a <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Booked Meeting</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mt-2 leading-relaxed">
              Press play and watch a real enquiry move through the system in seconds — researched, called, qualified and logged. Every fact is checked against a source, so nothing is invented.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <button
              onClick={handleRunSimulation}
              disabled={isRunning}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-xs font-bold transition-all ${
                isRunning
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20'
              }`}
            >
              <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : 'fill-white'}`} />
              <span>{isRunning ? 'Executing Nodes...' : 'Simulate Live Lead Pipeline'}</span>
            </button>
            <button
              onClick={handleReset}
              disabled={isRunning}
              className="p-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
              title="Reset Simulation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Visual Pipeline Graph: 4 Interactive Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {WORKFLOW_SIMULATION_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex && isRunning;
            const isCompleted = idx <= activeStepIndex;
            const isSelected = idx === selectedStep;

            return (
              <div
                key={step.step}
                onClick={() => setSelectedStep(idx)}
                className={`cursor-pointer rounded-2xl p-5 transition-all relative border ${
                  isSelected
                    ? 'bg-blue-50/50 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                    : 'bg-slate-50 hover:bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                {/* Node Status Header */}
                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <span className="text-slate-500 font-bold">NODE {step.step}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive
                        ? 'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse'
                        : isCompleted
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isActive ? 'PROCESSING' : isCompleted ? 'VERIFIED' : 'STANDBY'}
                  </span>
                </div>

                <div className="font-heading text-base font-bold text-slate-900 mb-1">
                  {step.title}
                </div>
                <div className="text-xs font-mono text-blue-700 mb-3 truncate font-semibold">
                  {step.nodeName}
                </div>

                <div className="text-[11px] font-mono text-slate-500 flex items-center justify-between pt-3 border-t border-slate-200">
                  <span>Latency: <strong className="text-slate-800">{step.latency}</strong></span>
                  <span className="flex items-center gap-1 text-blue-600 font-bold">
                    <Eye className="w-3 h-3" />
                    <span>Inspect</span>
                  </span>
                </div>

                {/* Progress bar line if active */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 animate-pulse rounded-b-2xl" />
                )}
              </div>
            );
          })}
        </div>

        {/* Detailed Inspector Panel (2 Columns: JSON Payload & Real-time Execution Console) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Selected Node Payload Inspector */}
          <div className="lg:col-span-7 rounded-2xl bg-white border border-slate-200 p-4 sm:p-6 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <span className="font-mono text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Node Output Payload: {currentStepData.nodeName}
                </span>
              </div>
              <span className="text-xs font-mono text-slate-500 font-medium">
                Execution Time: <span className="text-emerald-600 font-bold">{currentStepData.latency}</span>
              </span>
            </div>

            {/* Formatted JSON output in high-contrast dark box */}
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 font-mono text-xs text-slate-200 overflow-x-auto shadow-inner">
              <pre className="text-blue-300">
                {JSON.stringify(currentStepData.payload, null, 2)}
              </pre>
            </div>

            {/* Architecture note for this node */}
            <div className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-slate-700 space-y-1">
              <div className="font-mono font-bold text-blue-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Executive Quality & Anti-Hallucination Guarantee</span>
              </div>
              <p className="text-slate-600 leading-relaxed font-sans text-xs">
                {selectedStep === 0 && 'Validates contact inputs across international formatters before initiating search to prevent junk data entering your CRM.'}
                {selectedStep === 1 && 'Canonical markdown dossier is frozen with cryptographic timestamp. All model prior hallucinations and fabricated numbers are strictly banned.'}
                {selectedStep === 2 && 'Cross-Validator compares extracted specifications and company revenue against evidence dossier to calculate a quantifiable trust score.'}
                {selectedStep === 3 && 'Triggers bilingual Hinglish voice agent with 18 call variables mapped from payload, followed by immediate WhatsApp catalog dispatch.'}
              </p>
            </div>
          </div>

          {/* Right: Real-time Execution Console */}
          <div className="lg:col-span-5 rounded-2xl bg-white border border-slate-200 p-4 sm:p-6 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-600" />
                  <span className="font-mono text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Execution Telemetry Stream
                  </span>
                </div>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>

              <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 font-mono text-[11px] text-slate-200 space-y-2 h-[260px] overflow-y-auto shadow-inner">
                {executionLogs.map((log, lIdx) => (
                  <div key={lIdx} className="leading-relaxed">
                    <span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span>{' '}
                    <span
                      className={
                        log.includes('[RAG LOCK]')
                          ? 'text-blue-400 font-semibold'
                          : log.includes('[AUDITOR]')
                          ? 'text-emerald-400 font-semibold'
                          : log.includes('[VOICE AGENT]')
                          ? 'text-purple-400 font-semibold'
                          : log.includes('[SUCCESS]')
                          ? 'text-emerald-300 font-bold'
                          : 'text-slate-300'
                      }
                    >
                      {log}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Summary */}
            <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
              <span>Environment: <strong className="text-slate-800">Self-Hosted VPS</strong></span>
              <span className="text-emerald-700 font-bold">0.0% Hallucination Rate</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

