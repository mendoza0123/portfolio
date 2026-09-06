import React, { useState } from 'react';
import { Factory, ShoppingBag, Users, Truck, ArrowRight, CheckCircle2, ShieldAlert, Sparkles, Zap, Database, Bot, Clock, ChevronRight } from 'lucide-react';

interface IndustrySolutionsProps {
  onOpenContact: (subject?: string) => void;
}

interface IndustrySolution {
  id: string;
  name: string;
  icon: any;
  tagline: string;
  badge: string;
  realProblem: string;
  problemPoints: string[];
  autonomousSolution: string;
  solutionNodes: string[];
  realWorldOutcome: string;
  metrics: { label: string; value: string; change: string }[];
  exampleWorkflow: string;
}

const INDUSTRIES: IndustrySolution[] = [
  {
    id: 'manufacturing',
    name: 'Manufacturing & Factories',
    icon: Factory,
    tagline: 'Kill clipboard logs, scrap leaks & ERP drift',
    badge: 'Industrial Operations',
    realProblem: 'Downtime and scrap live on paper. Accounting sees the numbers days late.',
    problemPoints: [
      'Downtime alerts hours late',
      'Floor usage never matches Tally/ERP',
      'Challans written by hand',
    ],
    autonomousSolution: 'A WhatsApp voice note in Hindi or English. n8n logs the lot, flags scrap spikes, issues the challan.',
    solutionNodes: [
      'Hindi/English Voice or Text Note',
      'AI Audio Transcription & Entity Extractor',
      'Postgres Production Batch Ledger',
      'Instant Scrap Spike Alert',
      'Automated PDF Delivery Challan'
    ],
    realWorldOutcome: 'Full traceability. 14 hrs/week saved. Scrap gap under 0.2%.',
    metrics: [
      { label: 'Batch Traceability', value: '100%', change: 'Real-Time Ledger' },
      { label: 'Downtime Delay', value: '0 Mins', change: 'Instant Webhook' },
      { label: 'Weekly Admin Saved', value: '14+ Hrs', change: 'Zero Paperwork' },
    ],
    exampleWorkflow: 'Raw Material Intake -> WhatsApp Barcode Snap -> AI Vision Qty Extractor -> Database Stock Sync -> Auto-PO when threshold < 15%',
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce & D2C Brands',
    icon: ShoppingBag,
    tagline: 'Recover carts, cut RTO losses, sync stock 24/7',
    badge: 'D2C & Retail Scale',
    realProblem: '65%+ abandon checkout, COD returns hit 25–35% RTO, and stock drifts across channels.',
    problemPoints: [
      'Email reminders open below 8%',
      '$3–$6 lost per returned COD parcel',
      'Amazon oversells while Shopify sits empty',
    ],
    autonomousSolution: 'WhatsApp plus a voice confirmation within 3 minutes of abandonment, and AI address checks before COD dispatch.',
    solutionNodes: [
      'Shopify Abandoned Cart Webhook',
      'Instant WhatsApp Cart Recovery & Coupon',
      'Sub-300ms Voice Intent Qualifier',
      'AI Address Validation & RTO Risk Score',
      'Multi-Channel Real-time Stock Sync'
    ],
    realWorldOutcome: '22.4% of carts recovered. COD returns down 38%.',
    metrics: [
      { label: 'Cart Recovery Rate', value: '+22.4%', change: 'WhatsApp + Voice' },
      { label: 'COD RTO Reduction', value: '-38%', change: 'Pre-dispatch Check' },
      { label: 'Stockout Sync Delay', value: '< 2 Sec', change: 'Multi-Channel Buffer' },
    ],
    exampleWorkflow: 'Abandoned Checkout -> 3-Min Delay -> Personalized WhatsApp Video/Discount -> Intent Voice Check -> Converted Order Webhook',
  },
  {
    id: 'crm-sales',
    name: 'CRM & B2B Sales Teams',
    icon: Users,
    tagline: 'Sub-45s qualification, zero data entry, 4-min quotes',
    badge: 'Revenue Velocity',
    realProblem: 'Reps call back 45+ minutes late, then lose 2 hours a day pasting notes into the CRM.',
    problemPoints: [
      '78% of buyers pick whoever calls first',
      'Call context stuck in personal WhatsApp',
      'Quotes take 24–48 hours',
    ],
    autonomousSolution: 'A bilingual AI agent calls in 45 seconds, writes budget and spec to the CRM, then sends the quote.',
    solutionNodes: [
      'Meta / Google Ad Webhook Trigger',
      'Sub-45s AI Voice & WhatsApp Outreach',
      'Speech-to-Structured-JSON Extraction',
      'Automatic CRM Deal & Task Creation',
      'Instant Branded PDF Proposal Dispatch'
    ],
    realWorldOutcome: 'Speed-to-lead: 48 minutes to 38 seconds. Meetings up 340%.',
    metrics: [
      { label: 'Speed-to-Lead', value: '< 45 Sec', change: 'Instant Outreach' },
      { label: 'Booked Meeting Lift', value: '+340%', change: 'Zero Drop-off' },
      { label: 'Quote Turnaround', value: '4 Mins', change: 'Auto-Generated' },
    ],
    exampleWorkflow: 'Meta Ad Form -> Webhook -> AI Voice Outreach -> Budget Extracted -> HubSpot Deal Created -> Proposal Sent to Client WhatsApp',
  },
  {
    id: 'logistics',
    name: 'Logistics & Delivery Operations',
    icon: Truck,
    tagline: '750+ daily dispatches on zero-cost infra',
    badge: 'Logistics & Dispatch',
    realProblem: 'Hundreds of daily runs tracked in WhatsApp groups and sheets. Missing signatures become payment disputes.',
    problemPoints: [
      'Lost paper PODs trigger payment disputes',
      'Driver trips and COD cash tallied by hand',
      'No central view of pending packages',
    ],
    autonomousSolution: 'A driver portal takes one-tap photo proof, WhatsApp updates the customer, and COD cash reconciles at day end.',
    solutionNodes: [
      'Order Dispatch Trigger',
      'Automated Route Grouping & Assignment',
      'Mobile Single-Tap Driver Web Portal',
      'Live Photo Proof & Signature Ingestion',
      'End-of-Day COD Cash Reconciliation'
    ],
    realWorldOutcome: '759+ deliveries a day on $0/month hosting, zero cash gaps.',
    metrics: [
      { label: 'Active Deliveries', value: '759+', change: 'Zero-Infra Scaled' },
      { label: 'Hosting Cost', value: '$0 / mo', change: 'Serverless Architecture' },
      { label: 'Collection Accuracy', value: '100%', change: 'Auto-Reconciled' },
    ],
    exampleWorkflow: 'Dispatch Created -> Driver Portal Ping -> Customer ETA SMS -> Photo Upload on Delivery -> Bank Reconcile Webhook',
  },
];

export const IndustrySolutions: React.FC<IndustrySolutionsProps> = ({ onOpenContact }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('manufacturing');

  const current = INDUSTRIES.find((ind) => ind.id === selectedIndustry) || INDUSTRIES[0];
  const IconComponent = current.icon;

  return (
    <section id="solutions" className="py-24 sm:py-40 relative bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-mono text-xs mb-3 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>CROSS-INDUSTRY SYSTEM BLUEPRINTS</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Proven Systems Engineered For <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Real Business Problems</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Pick your operation. See exactly what gets engineered out.
          </p>
        </div>

        {/* Industry Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-8 sm:mb-10">
          {INDUSTRIES.map((ind) => {
            const TabIcon = ind.icon;
            const isSelected = ind.id === selectedIndustry;
            return (
              <button
                key={ind.id}
                onClick={() => setSelectedIndustry(ind.id)}
                className={`p-3 sm:p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-blue-500 shadow-md ring-2 ring-blue-500/10'
                    : 'bg-slate-100/70 border-slate-200 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200/80 text-slate-700'
                    }`}
                  >
                    <TabIcon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-slate-200/60 text-slate-600'
                    }`}
                  >
                    {ind.badge}
                  </span>
                </div>
                <div>
                  <div className={`font-heading text-sm font-bold ${isSelected ? 'text-blue-900' : 'text-slate-800'}`}>
                    {ind.name}
                  </div>
                  <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {ind.tagline}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Industry Deep-Dive Card */}
        <div className="rounded-3xl bg-white border border-slate-200 p-4 sm:p-10 shadow-lg transition-all">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 mb-8 border-b border-slate-100 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
                <IconComponent className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider">
                    {current.badge} ARCHITECTURE
                  </span>
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
                  {current.name}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1">
                  {current.tagline}
                </p>
              </div>
            </div>

            <button
              onClick={() => onOpenContact(`Custom Architecture for ${current.name}`)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-mono text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all hover:scale-[1.01] shrink-0"
            >
              <span>Build This System For My Business</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {current.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-200 text-center"
              >
                <div className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {m.value}
                </div>
                <div className="text-xs text-slate-600 font-semibold mt-0.5">
                  {m.label}
                </div>
                <div className="text-[10px] font-mono text-blue-700 font-bold uppercase tracking-wider mt-1">
                  {m.change}
                </div>
              </div>
            ))}
          </div>

          {/* The Real Problem vs The Autonomous Fix */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* The Real Problem */}
            <div className="p-4 sm:p-6 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 text-rose-700 font-mono text-xs font-bold uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>The Unsolved Business Bottleneck</span>
              </div>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                {current.realProblem}
              </p>
              <div className="space-y-2 pt-2 border-t border-rose-200/60">
                {current.problemPoints.map((pt, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-700">
                    <span className="text-rose-500 font-bold text-sm leading-none">&bull;</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* The Autonomous Solution */}
            <div className="p-4 sm:p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3 sm:space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-emerald-700 font-mono text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>
                    The Autonomous Fix
                    <span className="hidden sm:inline"> (Engineered in n8n &amp; AI)</span>
                  </span>
                </div>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                  {current.autonomousSolution}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-emerald-200 text-xs text-emerald-900 font-medium space-y-1">
                <strong className="text-emerald-950 font-bold flex items-center gap-1.5 text-xs font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Measurable Outcome:</span>
                </strong>
                <p className="text-slate-700 text-xs">
                  {current.realWorldOutcome}
                </p>
              </div>
            </div>
          </div>

          {/* Workflow Graph Pipeline */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 font-mono">
            <div className="flex items-center justify-end text-xs text-slate-500 font-bold uppercase tracking-wider">
              <span className="text-blue-700 font-bold">100% Owned &amp; Self-Hosted</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {current.solutionNodes.map((node, nIdx) => (
                <React.Fragment key={nIdx}>
                  <div className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center text-[10px] font-bold">
                      {nIdx + 1}
                    </span>
                    <span>{node}</span>
                  </div>
                  {nIdx < current.solutionNodes.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
