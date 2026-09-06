import React, { useState, useEffect } from 'react';
import { Mail, MessageSquare, Send, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Phone, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitEnquiry } from '../lib/enquiry';

interface ContactSectionProps {
  initialSubject?: string;
  onClearSubject?: () => void;
}

const ENGAGEMENT_TYPES = [
  'AI Automation & n8n Workflows',
  'Bilingual Voice AI Agent (Hinglish/English)',
  'Custom Manufacturing ERP / CRM',
  'Sheets / GAS to Supabase Migration',
  'Architecture & Anti-Hallucination Audit',
  'Other Custom Systems Project',
];

const TIMELINE_OPTIONS = [
  'Immediate (Within 1-2 Weeks)',
  'Q3/Q4 Active Sprint',
  'Exploring Architecture / Scoping Phase',
];

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialSubject = '',
  onClearSubject,
}) => {
  const [selectedType, setSelectedType] = useState<string>(ENGAGEMENT_TYPES[0]);
  const [selectedTimeline, setSelectedTimeline] = useState<string>(TIMELINE_OPTIONS[0]);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [message, setMessage] = useState<string>(initialSubject ? `Inquiry regarding: ${initialSubject}` : '');
  const [trap, setTrap] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);
  const [sendError, setSendError] = useState<string>('');

  useEffect(() => {
    if (initialSubject) {
      setMessage(`Inquiry regarding: ${initialSubject}`);
    }
  }, [initialSubject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || sending) return;

    setSending(true);
    setSendError('');

    const result = await submitEnquiry({
      form: 'Architecture Audit',
      name,
      email,
      company,
      interest: selectedType,
      timeline: selectedTimeline,
      message,
      source: initialSubject,
      trap,
    });

    setSending(false);

    if (result.ok === false) {
      setSendError(
        result.reason === 'unconfigured'
          ? 'The enquiry endpoint is not configured yet, so this was not recorded. Please email loharaditya301@gmail.com directly.'
          : 'Could not reach the server. Please check your connection or email loharaditya301@gmail.com directly.'
      );
      return;
    }

    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2563eb', '#10b981', '#6366f1', '#f59e0b'],
    });
  };

  return (
    <section id="contact" className="py-24 sm:py-40 relative bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-mono text-xs mb-3 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>CONFIDENTIAL & NDA-PROTECTED CONSULTATION</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Schedule a <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Free Architecture Audit</span>
          </h2>
          <p className="text-base text-slate-600 mt-3 leading-snug sm:leading-relaxed">
            Automate the repetitive data entry, put a bilingual AI receptionist on your phone line, or replace messy spreadsheets with a system you own. Tell us the bottleneck and we’ll map the fix.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto items-start">
          {/* Left Column: Direct Info & NDA Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-slate-900">
                Direct Contact Channels
              </h3>

              <div className="space-y-3.5 text-xs font-mono">
                <a
                  href="mailto:loharaditya301@gmail.com"
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 transition-all group"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-semibold">Primary Direct Inbox</div>
                    <div className="text-blue-700 font-bold text-xs">loharaditya301@gmail.com</div>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-semibold">Discovery Call Hours</div>
                    <div className="text-slate-900 font-bold text-xs">Mon – Sat (IST Business Hours)</div>
                  </div>
                </div>
              </div>

              {/* NDA & Governance Box */}
              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2 text-xs font-mono">
                <div className="flex items-center gap-2 text-blue-800 font-bold">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Strict NDA & Data Governance</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  All consultations can be executed under mutual Non-Disclosure Agreements. Your client databases and proprietary workflows remain 100% confidential.
                </p>
              </div>

              {/* Transferable Deliverables Summary */}
              <div className="pt-1">
                <div className="text-[11px] font-mono uppercase text-slate-500 font-bold mb-3 tracking-wider">
                  Audit Deliverables Include:
                </div>
                <div className="flex sm:block gap-2 overflow-x-auto hide-scrollbar -mx-1 px-1 sm:mx-0 sm:px-0 sm:space-y-2.5 text-xs font-mono text-slate-700 font-medium">
                  <div className="flex items-center gap-2 shrink-0 whitespace-nowrap bg-slate-50 sm:bg-transparent border sm:border-0 border-slate-200 rounded-full sm:rounded-none px-3 py-1.5 sm:p-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Complete Workflow Diagram & ROI Projection</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 whitespace-nowrap bg-slate-50 sm:bg-transparent border sm:border-0 border-slate-200 rounded-full sm:rounded-none px-3 py-1.5 sm:p-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Self-Hosted VPS Setup & Token Cost Audit</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 whitespace-nowrap bg-slate-50 sm:bg-transparent border sm:border-0 border-slate-200 rounded-full sm:rounded-none px-3 py-1.5 sm:p-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Zero-Hallucination Data Guard Blueprint</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Scoping Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-slate-900">
                    Audit Request Received!
                  </h3>
                  <p className="text-sm text-slate-600 font-sans max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-blue-700 font-bold">{name}</strong>. I will review your operational requirements for <strong className="text-slate-900 font-bold">{selectedType}</strong> and reply within 24 hours with an actionable blueprint.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setSendError('');
                      setName('');
                      setEmail('');
                      setCompany('');
                      setMessage('');
                    }}
                    className="px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-mono font-bold text-slate-700 transition-all mt-4"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Step 1: Engagement Type */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-slate-700 font-bold tracking-wider">
                      1. Select Business Archetype
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {ENGAGEMENT_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setSelectedType(type)}
                          className={`p-2.5 rounded-xl text-left text-xs font-mono transition-all border ${
                            selectedType === type
                              ? 'bg-blue-50 border-blue-400 text-blue-700 font-bold shadow-sm ring-1 ring-blue-400/20'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-700 font-medium">
                        Full Name <span className="text-blue-600 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Mehta"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-base sm:text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-700 font-medium">
                        Work Email <span className="text-blue-600 font-bold">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="rahul@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-base sm:text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Company & Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-700 font-medium">
                        Company / Brand Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Apex Textiles / Studio"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-base sm:text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-700 font-medium">
                        Target Timeline
                      </label>
                      <select
                        value={selectedTimeline}
                        onChange={(e) => setSelectedTimeline(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-base sm:text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-500"
                      >
                        {TIMELINE_OPTIONS.map((t) => (
                          <option key={t} value={t} className="bg-white text-slate-800">
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message Details */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-700 font-medium">
                      Current Operational Bottlenecks or Goals
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Describe your current systems, volume (leads/day, order volume, manual tasks), or desired automation outcome..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-base sm:text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* Honeypot: hidden from people, irresistible to bots */}
                  <input
                    type="text"
                    name="company_website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={trap}
                    onChange={(e) => setTrap(e.target.value)}
                    className="absolute left-[-9999px] w-px h-px opacity-0"
                  />

                  {sendError && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono leading-relaxed">
                      {sendError}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full min-h-[48px] flex items-center justify-center gap-2 py-3.5 rounded-xl font-mono text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <Send className={`w-4 h-4 ${sending ? 'animate-pulse' : ''}`} />
                    <span>{sending ? 'Sending…' : 'Submit Free Architecture Audit Request'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

