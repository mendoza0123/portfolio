import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { IndustrySolutions } from './components/IndustrySolutions';
import { ProjectsSection } from './components/ProjectsSection';
import { VoiceAiStudio } from './components/VoiceAiStudio';
import { GrowthAuditSection } from './components/GrowthAuditSection';
import { Footer } from './components/Footer';
import { StickyMobileCta } from './components/StickyMobileCta';
import { MessageCircle } from 'lucide-react';

export default function App() {
  const [contactSubject, setContactSubject] = useState<string>('');

  const handleOpenContact = (subject?: string) => {
    if (subject) {
      setContactSubject(subject);
    }
    const auditElement = document.getElementById('audit') || document.getElementById('contact');
    if (auditElement) {
      auditElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRunSimulation = () => {
    const archElement = document.getElementById('architecture');
    if (archElement) {
      archElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-blue-600 selection:text-white relative overflow-hidden font-sans">
      {/* Light Frosted Ambient Orbs */}
      <div className="fixed top-[-10%] right-[-10%] w-[650px] h-[650px] bg-blue-400/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[550px] h-[550px] bg-indigo-400/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="fixed top-[45%] left-[25%] w-[450px] h-[450px] bg-emerald-400/08 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Sticky Header Navigation */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* 1. Hero Section with Live Metrics and Immediate Business Outcomes */}
        <Hero
          onOpenContact={handleOpenContact}
          onRunSimulation={handleRunSimulation}
        />

        {/* 2. Solutions by Industry (Manufacturing, E-Commerce, CRM Sales, Logistics) */}
        <IndustrySolutions onOpenContact={handleOpenContact} />

        {/* 3. Executive Case Studies (Selected High-Impact Deployments) */}
        <ProjectsSection onOpenContact={handleOpenContact} />

        {/* 4. Bilingual Voice AI & Autonomous Capabilities */}
        <VoiceAiStudio onOpenContact={handleOpenContact} />

        {/* 5. Free Systems & AI Growth Audit (Direct Contact 8879940967) */}
        <GrowthAuditSection onOpenContact={handleOpenContact} />
      </main>

      {/* Floating WhatsApp Action Button (as seen in Image 2) */}
      <a
        href="https://wa.me/918879940967?text=Hi%20Aditya,%20I%20would%20like%20to%20discuss%20an%20AI%20automation%20project%20for%20my%20business."
        target="_blank"
        rel="noreferrer"
        className="hidden sm:flex fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/30 items-center justify-center transition-all hover:scale-110 group focus:outline-none"
        title="Chat on WhatsApp with Aditya Lohar"
        aria-label="Chat on WhatsApp with Aditya Lohar (+91 8879940967)"
      >
        <MessageCircle className="w-7 h-7 fill-white text-emerald-500" />
        <span className="sr-only">Chat on WhatsApp</span>
        {/* Tooltip on hover */}
        <span className="absolute right-16 bg-slate-900 text-white text-xs font-mono font-bold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          WhatsApp: +91 8879940967
        </span>
      </a>

      {/* Phone-only action bar (replaces the floating bubble below sm) */}
      <StickyMobileCta onOpenContact={handleOpenContact} />

      {/* Footer with Compliance & Specs */}
      <Footer />
    </div>
  );
}

