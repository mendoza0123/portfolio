import React, { useState, useEffect } from 'react';
import { Terminal, Shield, PhoneCall, Workflow, Cpu, ArrowUpRight, Menu, X, Sparkles, Zap } from 'lucide-react';

interface NavbarProps {
  onOpenContact: (subject?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Industry Solutions', href: '#solutions' },
    { label: 'Case Studies', href: '#projects' },
    { label: 'Voice AI Studio', href: '#voice-ai' },
    { label: 'Free Growth Audit', href: '#audit' },
  ];

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-xl border-b border-slate-200/80 py-3.5 shadow-sm'
          : 'bg-transparent py-5 border-b border-slate-200/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-blue-600 border border-blue-700 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-all">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading text-lg font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                ADITYA LOHAR
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-bold">
                AI Architect
              </span>
            </div>
            <div className="text-xs text-slate-500 font-mono flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Autonomous Systems & Revenue AI</span>
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/80 p-1.5 rounded-full border border-slate-200 shadow-sm backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => onOpenContact('Free Systems & Cost Audit')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold font-mono bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md shadow-blue-500/20 hover:scale-[1.02]"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-200" />
            <span>Book Free Audit</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white" />
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in fade-in">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact('Free Systems & Cost Audit');
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-blue-600 text-white font-bold text-xs font-mono shadow-md shadow-blue-500/20"
            >
              <Sparkles className="w-4 h-4 text-blue-200" />
              <span>Book Free Systems Audit</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

