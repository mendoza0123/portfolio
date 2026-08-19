import React, { useState } from 'react';
import { Send, Phone, Mail, CheckCircle2, Sparkles, MessageSquare, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface GrowthAuditSectionProps {
  onOpenContact?: (subject?: string) => void;
}

export const GrowthAuditSection: React.FC<GrowthAuditSectionProps> = () => {
  const [name, setName] = useState<string>('');
  const [brand, setBrand] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [serviceFocus, setServiceFocus] = useState<string>('Manufacturing & Factory Automation');
  const [bottleneck, setBottleneck] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
  };

  return (
    <section id="audit" className="py-20 relative bg-slate-900 text-white overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Direct Hook & Contact Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 font-mono text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>FREE 30-MIN TECHNICAL & ROI AUDIT</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              What should your operations, CRM, and AI automation systems be doing right now?
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-sans">
              Let's identify what's holding your business growth back — and build a high-performance autonomous system that moves your business forward with zero manual friction.
            </p>

            {/* Direct Contact Block */}
            <div className="pt-4 space-y-4 font-mono text-sm">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">
                Direct Contact & Inquiries
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:loharaditya301@gmail.com"
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white transition-all backdrop-blur-md group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-sans">Prefer direct email?</div>
                    <div className="text-white font-bold text-xs sm:text-sm">loharaditya301@gmail.com</div>
                  </div>
                </a>

                <a
                  href="tel:+918879940967"
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white transition-all backdrop-blur-md group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-sans">Or call directly:</div>
                    <div className="text-white font-bold text-xs sm:text-sm">+91 8879940967</div>
                  </div>
                </a>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 font-sans pt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Architect: <strong className="text-white font-semibold">Aditya Lohar</strong> &bull; Available Mon – Sat for Discovery Calls</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Converting Audit Card (Styled after Image 2) */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-slate-800/80 border border-slate-700/80 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6">
              <div>
                <h3 className="font-heading text-2xl font-bold text-white tracking-tight">
                  Get your free growth audit
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-1 font-sans">
                  Tell us where to look. We reply within 24 hours on weekdays.
                </p>
              </div>

              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white font-heading">
                    Audit Request Confirmed!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong className="text-blue-400">{name}</strong>. Aditya will review your operational focus for <strong className="text-white">{brand || 'your business'}</strong> and reach out via email/phone at <strong className="text-emerald-400">{phone || email}</strong> within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setBrand('');
                      setEmail('');
                      setPhone('');
                      setBottleneck('');
                    }}
                    className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono text-white transition-all mt-4"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase text-slate-300 font-bold tracking-wider">
                      Your Name <span className="text-blue-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aditya Lohar / Founder Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono text-xs"
                    />
                  </div>

                  {/* Brand / Website */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase text-slate-300 font-bold tracking-wider">
                      Brand / Business / Website
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Textiles / yourbrand.com"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono text-xs"
                    />
                  </div>

                  {/* Phone & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono uppercase text-slate-300 font-bold tracking-wider">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 8879940967"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono uppercase text-slate-300 font-bold tracking-wider">
                        Work Email <span className="text-blue-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono text-xs"
                      />
                    </div>
                  </div>

                  {/* Service Focus */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase text-slate-300 font-bold tracking-wider">
                      Service / Operational Focus
                    </label>
                    <select
                      value={serviceFocus}
                      onChange={(e) => setServiceFocus(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white focus:outline-none focus:border-blue-500 transition-all font-mono text-xs"
                    >
                      <option value="Manufacturing & Factory Automation">Manufacturing & Factory Floor Automation</option>
                      <option value="E-Commerce Cart & Return Recovery">E-Commerce Cart Recovery & RTO Reduction</option>
                      <option value="CRM & Inbound Lead Speed AI">B2B CRM Speed-to-Lead & Call Transcription</option>
                      <option value="Bilingual Voice AI Calling Bot">Bilingual Voice AI Phone Receptionist</option>
                      <option value="Custom ERP & Zero-Infra Portals">Custom Delivery/Order ERP on Zero Infra</option>
                    </select>
                  </div>

                  {/* Operational Bottleneck */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono uppercase text-slate-300 font-bold tracking-wider">
                      What is holding your growth back? (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Too many manual spreadsheets, slow lead response time, high Zapier bills..."
                      value={bottleneck}
                      onChange={(e) => setBottleneck(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono text-xs"
                    />
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-mono text-xs sm:text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.01]"
                  >
                    <span>Start a Conversation &rarr;</span>
                  </button>

                  <p className="text-center text-[11px] text-slate-400 font-sans">
                    No spam, no obligation. Just a clear read on your growth.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
