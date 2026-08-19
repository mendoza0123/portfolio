import React from 'react';
import { Terminal, Shield, ArrowUp, Github, Linkedin, Mail, Heart, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 font-mono text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="font-heading text-base font-bold text-white tracking-tight">
                ADITYA LOHAR
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Freelance AI Automation & Systems Architect helping founders eliminate manual operational bottlenecks with self-hosted n8n, sub-300ms bilingual voice AI, and zero-hallucination RAG pipelines.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-white font-bold uppercase tracking-wider text-[11px] mb-2">
              Solutions Index
            </div>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <a href="#solutions" className="hover:text-blue-400 transition-colors">
                  &bull; Cross-Industry Solutions
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-blue-400 transition-colors">
                  &bull; 16+ Executive Case Studies
                </a>
              </li>
              <li>
                <a href="#voice-ai" className="hover:text-blue-400 transition-colors">
                  &bull; Bilingual Voice AI Receptionist
                </a>
              </li>
              <li>
                <a href="#audit" className="hover:text-blue-400 transition-colors">
                  &bull; Free Systems Growth Audit
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Confidentiality & Compliance */}
          <div className="md:col-span-4 space-y-2">
            <div className="flex items-center gap-1.5 text-white font-bold uppercase tracking-wider text-[11px] mb-2">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              <span>Direct Contact & Confidentiality</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2 text-[11px]">
              <div className="text-white font-bold flex items-center justify-between">
                <span>Aditya Lohar</span>
                <span className="text-emerald-400">+91 8879940967</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Case studies and architecture briefs are published with client-identifying trade secrets sanitized. Named live demos available upon request under NDA.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Aditya Lohar. High-Performance Business AI & Automation Architecture.
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+918879940967"
              className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
            >
              <span>+91 8879940967</span>
            </a>
            <a
              href="mailto:loharaditya301@gmail.com"
              className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>loharaditya301@gmail.com</span>
            </a>

            <button
              onClick={scrollToTop}
              className="px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white transition-all flex items-center gap-1.5"
              title="Scroll to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

