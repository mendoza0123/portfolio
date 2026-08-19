import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Play, Pause, Trash2, CheckCircle2, Zap, ArrowRight, RefreshCw, Activity } from 'lucide-react';

interface LogItem {
  id: string;
  timestamp: string;
  category: 'N8N_ENGINE' | 'VOICE_GATEWAY' | 'RAG_LOCK' | 'ERP_WEBHOOK';
  level: 'INFO' | 'SUCCESS' | 'AUDIT' | 'GUARD';
  message: string;
}

const SAMPLE_LOGS: LogItem[] = [
  {
    id: '1',
    timestamp: '11:42:01',
    category: 'RAG_LOCK',
    level: 'GUARD',
    message: 'Canonical evidence dossier assembled [ID: EVID_89412]. Context locked against model priors.'
  },
  {
    id: '2',
    timestamp: '11:42:03',
    category: 'VOICE_GATEWAY',
    level: 'INFO',
    message: 'Vapi agent "Monika" initialized. Deepgram Nova-3 Hindi active with 20+ fabric boosted terms.'
  },
  {
    id: '3',
    timestamp: '11:42:06',
    category: 'N8N_ENGINE',
    level: 'SUCCESS',
    message: 'Universal Lead Gen: Pinecone cold-start guard intercepted empty vector match. Graceful fallback active.'
  },
  {
    id: '4',
    timestamp: '11:42:11',
    category: 'ERP_WEBHOOK',
    level: 'INFO',
    message: 'Customer Portal: RAW order received from client [UID: fabric_viscose_challan_149]. Acknowledgment pending in ERP.'
  },
  {
    id: '5',
    timestamp: '11:42:14',
    category: 'RAG_LOCK',
    level: 'AUDIT',
    message: 'Cross-Validator audit completed: 0.0% hallucination flags detected. Trust score: 99.1%.'
  },
  {
    id: '6',
    timestamp: '11:42:19',
    category: 'N8N_ENGINE',
    level: 'SUCCESS',
    message: 'Data Enrichment: 48,000-row batch-1 HTTP stream completed with zero memory overflow.'
  }
];

export const TerminalLogs: React.FC = () => {
  const [logs, setLogs] = useState<LogItem[]>(SAMPLE_LOGS);
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  useEffect(() => {
    let interval: any;
    if (isStreaming) {
      interval = setInterval(() => {
        const randomItem = SAMPLE_LOGS[Math.floor(Math.random() * SAMPLE_LOGS.length)];
        const newLog: LogItem = {
          ...randomItem,
          id: Math.random().toString(),
          timestamp: new Date().toLocaleTimeString(),
        };
        setLogs((prev) => [newLog, ...prev.slice(0, 19)]);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isStreaming]);

  const filteredLogs = logs.filter((log) => {
    if (selectedFilter === 'ALL') return true;
    return log.category === selectedFilter;
  });

  return (
    <section className="py-16 relative bg-slate-100/70 border-t border-slate-200 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span>System Diagnostics & Real-time Event Stream</span>
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="text-[11px] text-slate-500">
                  Live self-hosted n8n VPS & Voice Gateway Telemetry
                </div>
              </div>
            </div>

            {/* Filter Pills & Stream Toggle */}
            <div className="flex flex-wrap items-center gap-2">
              {['ALL', 'N8N_ENGINE', 'VOICE_GATEWAY', 'RAG_LOCK', 'ERP_WEBHOOK'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                    selectedFilter === cat
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {cat.replace('_', ' ')}
                </button>
              ))}

              <button
                onClick={() => setIsStreaming(!isStreaming)}
                className="p-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                title={isStreaming ? 'Pause Stream' : 'Resume Stream'}
              >
                {isStreaming ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => setLogs(SAMPLE_LOGS)}
                className="p-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                title="Reset Logs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Log Window Container */}
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 h-64 overflow-y-auto space-y-2 text-xs shadow-inner">
            {filteredLogs.map((log) => {
              const levelColor =
                log.level === 'GUARD'
                  ? 'text-amber-400'
                  : log.level === 'SUCCESS'
                  ? 'text-emerald-400'
                  : log.level === 'AUDIT'
                  ? 'text-blue-300'
                  : 'text-purple-300';

              return (
                <div
                  key={log.id}
                  className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-3 p-2 rounded-lg hover:bg-slate-800/60 transition-colors leading-relaxed"
                >
                  <span className="text-slate-500 shrink-0 text-[11px]">
                    [{log.timestamp}]
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] shrink-0 font-bold ${levelColor} bg-slate-800 border border-slate-700`}
                  >
                    {log.category}
                  </span>
                  <span className="text-slate-300 text-[11px]">
                    {log.message}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Bottom Terminal Status */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-4">
              <span>Host: <strong className="text-slate-800">Hostinger Cloud VPS</strong></span>
              <span>Process: <strong className="text-slate-800">Docker n8n v1.38</strong></span>
              <span>Memory: <strong className="text-emerald-700 font-bold">1.2GB / 8GB</strong></span>
            </div>
            <span className="text-blue-700 font-semibold">RAG Lock Active &bull; Zero Hallucination Pipeline</span>
          </div>
        </div>
      </div>
    </section>
  );
};

