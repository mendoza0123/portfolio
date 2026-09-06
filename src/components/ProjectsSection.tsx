import React, { useState, useMemo } from 'react';
import { Layers, Search, ArrowRight, ShieldCheck, Cpu, Code2, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { PROJECT_BRIEFS } from '../data/portfolioData';
import { ProjectBrief, ProjectCategory } from '../types';
import { ProjectDetailModal } from './ProjectDetailModal';

interface ProjectsSectionProps {
  onOpenContact: (subject?: string) => void;
}

const CATEGORY_TABS: { id: ProjectCategory; label: string; count?: number }[] = [
  { id: 'all', label: 'All Flagship Systems' },
  { id: 'ai_automation', label: 'AI & n8n Workflows' },
  { id: 'voice_ai', label: 'Voice AI Calling' },
  { id: 'enterprise_apps', label: 'Manufacturing ERP' },
];

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenContact }) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<ProjectBrief | null>(null);
  const [featuredOnly, setFeaturedOnly] = useState<boolean>(false);

  const filteredProjects = useMemo(() => {
    return PROJECT_BRIEFS.filter((item) => {
      const matchesCat = activeCategory === 'all' || item.category === activeCategory;
      const matchesFeatured = !featuredOnly || item.featured;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.briefNumber.toLowerCase().includes(q) ||
        item.demonstrates.some((d) => d.toLowerCase().includes(q)) ||
        item.architectureSummary.toLowerCase().includes(q);

      return matchesCat && matchesFeatured && matchesSearch;
    });
  }, [activeCategory, searchQuery, featuredOnly]);

  return (
    <section id="projects" className="py-24 sm:py-40 relative bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 font-mono text-xs mb-3 font-bold">
              <Layers className="w-3.5 h-3.5 text-red-600" />
              <span>REAL PROJECTS, REAL NUMBERS</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              What We Built & <span className="bg-gradient-to-r from-red-600 via-rose-600 to-indigo-600 bg-clip-text text-transparent">What It Saved</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mt-2 leading-relaxed">
              Every system below runs in a real business today. Tap one for the full story — the technical detail is tucked inside for your tech team.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <button
              onClick={() => setFeaturedOnly(!featuredOnly)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold border transition-all flex items-center gap-1.5 ${
                featuredOnly
                  ? 'bg-red-50 border-red-300 text-red-700 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-red-600" />
              <span>{featuredOnly ? 'Showing Featured' : 'Featured Only'}</span>
            </button>
          </div>
        </div>

        {/* Filter Controls: Category Tabs & Search Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-full bg-slate-100/80 border border-slate-200 w-full lg:w-auto">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all ${
                  activeCategory === tab.id
                    ? 'bg-white text-red-700 font-bold shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 shadow-sm"
            />
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((brief) => (
            <div
              key={brief.id}
              onClick={() => setSelectedProject(brief)}
              className="group cursor-pointer rounded-2xl bg-white p-4 sm:p-7 border border-slate-200 hover:border-red-300 flex flex-col justify-between relative overflow-hidden transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              {/* Top Meta Bar */}
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-700 font-bold text-[11px]">
                    {brief.briefNumber}
                  </span>
                  <span className="text-slate-500 text-[11px] uppercase tracking-wider font-semibold">
                    {brief.category.replace('_', ' ')}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-heading text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors leading-snug">
                  {brief.title}
                </h3>
                <div className="text-[13px] text-slate-700 mt-1.5 mb-3 leading-snug font-sans font-medium">
                  {brief.plainSubtitle}
                </div>

                {/* The pain, in the owner's words */}
                <p className="text-[13px] sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4 font-sans">
                  {brief.plainProblem}
                </p>

                {/* What it saved */}
                <div className="mb-4 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 mb-1">
                    Result
                  </div>
                  <p className="text-[13px] text-slate-700 leading-relaxed font-sans">
                    {brief.plainImpact}
                  </p>
                </div>

                {/* Metrics row */}
                <div className="grid grid-cols-3 gap-2 mb-5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  {brief.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="text-center">
                      <div className="font-heading text-sm sm:text-base font-bold text-slate-900">
                        {m.value}
                      </div>
                      <div className="text-[10px] font-mono text-slate-500 truncate font-medium mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div>
                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {brief.plainTags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-full text-[11px] font-sans font-medium bg-slate-100 border border-slate-200 text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Button Action */}
                <button
                  className="w-full min-h-[44px] flex items-center justify-center gap-2 py-3 rounded-xl font-mono text-xs font-bold bg-slate-50 group-hover:bg-red-600 text-slate-700 group-hover:text-white border border-slate-200 group-hover:border-red-600 transition-all shadow-sm"
                >
                  <span>See how it works</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 text-slate-500 font-mono text-sm">
            No projects matched your search.
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenContact={onOpenContact}
        />
      )}
    </section>
  );
};

