import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Github, ExternalLink, Calendar, FolderOpen, Award, X, Sparkles, CheckCircle2 } from "lucide-react";
import { Project } from "../types";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Compute unique categories dynamically
  const categories = useMemo(() => {
    const list = new Set(projects.map((p) => p.category));
    return ["All", ...Array.from(list)];
  }, [projects]);

  // Filter projects by active category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [projects, selectedCategory]);

  return (
    <section id="projects" className="py-24 border-t border-gray-900 bg-gray-950/40 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-widest">
              <FolderOpen className="w-4 h-4" />
              <span>Project Catalog</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              Curated Masterpieces
            </h2>
            <p className="text-gray-400 max-w-xl text-sm leading-relaxed font-light">
              A comprehensive selection of engineering solutions, high-performance visual dashboards, and creative interaction blueprints.
            </p>
          </div>

          {/* Filter Pill Badges */}
          <div className="flex flex-wrap gap-1.5 bg-gray-900/35 p-1 rounded-lg border border-gray-850/80 max-w-max self-start md:self-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-[11px] font-mono tracking-wide transition-all uppercase cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white font-medium"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              key={project.id}
              className="glass-card rounded-xl overflow-hidden flex flex-col group border border-gray-900 hover:border-gray-800 transition-all duration-300 relative"
            >
              {/* Card Media Preview */}
              <div className="h-52 overflow-hidden relative bg-gray-900">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out brightness-[0.85] group-hover:brightness-95"
                />
                
                {/* Visual Category Label */}
                <div className="absolute top-4 left-4 py-1 px-2.5 rounded bg-gray-950/85 backdrop-blur-sm text-[10px] font-mono tracking-wider font-semibold text-indigo-400 border border-gray-800">
                  {project.category}
                </div>

                {/* Live Demo Trigger Hover Overlay */}
                <div className="absolute inset-0 bg-indigo-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button
                    onClick={() => setActiveProject(project)}
                    className="px-4 py-2 rounded-lg bg-white text-gray-950 text-xs font-mono font-bold uppercase tracking-wider shadow-xl flex items-center gap-1 hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    Examine Specs
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card Body Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[11px] font-mono text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {project.year}
                    </span>
                    <span>{project.role}</span>
                  </div>

                  <h3 className="font-display font-semibold text-lg text-white group-hover:text-indigo-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-300 text-xs leading-relaxed font-light">
                    {project.description}
                  </p>
                </div>

                {/* Tags and Action Links */}
                <div className="space-y-4 pt-2">
                  {/* Skill Badge Tags */}
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="py-0.5 px-2 bg-gray-900/60 text-gray-400 border border-gray-850/80 rounded font-mono text-[10px] tracking-tight"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="py-0.5 px-2 bg-gray-900/60 text-indigo-400 border border-gray-850/80 rounded font-mono text-[10px]">
                        +{project.tags.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="border-t border-gray-900 pt-3 flex items-center justify-between">
                    <button
                      onClick={() => setActiveProject(project)}
                      className="text-xs font-mono font-semibold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 group/btn cursor-pointer"
                    >
                      Technical Deep Dive
                      <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>

                    <div className="flex items-center gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-gray-500 hover:text-white transition-colors"
                          title="View Source Code"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-gray-500 hover:text-white transition-colors"
                          title="View Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state fallback */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 border border-dashed border-gray-850 rounded-xl max-w-md mx-auto">
            <Award className="w-8 h-8 text-gray-600 mx-auto mb-3" />
            <p className="text-sm text-gray-400 font-mono">No active project listings under this filter</p>
          </div>
        )}
      </div>

      {/* Modal Detail Overlay */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal Body Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-gray-950 border border-gray-800 rounded-2xl shadow-2xl z-10 text-gray-200"
            >
              {/* Close Button Floating */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 p-2 bg-gray-900/80 hover:bg-gray-800 border border-gray-800 rounded-full text-gray-400 hover:text-white transition-colors z-20 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Large Image Header */}
              <div className="h-64 sm:h-80 w-full relative bg-gray-900">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover brightness-[0.75]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/30 to-transparent" />
                <div className="absolute bottom-6 left-6 pr-6">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="py-0.5 px-2 bg-indigo-600 rounded text-[9px] font-mono tracking-widest uppercase text-white">
                      {activeProject.category}
                    </span>
                    <span className="py-0.5 px-2 bg-gray-900 border border-gray-800 rounded text-[9px] font-mono tracking-widest uppercase text-gray-400">
                      {activeProject.year}
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                    {activeProject.title}
                  </h3>
                </div>
              </div>

              {/* Modal Body Content */}
              <div className="p-6 space-y-6">
                {/* Meta Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-gray-900/60 rounded-xl border border-gray-900 text-xs font-mono">
                  <div>
                    <span className="text-gray-500 block">ROLE / SCOPE</span>
                    <span className="text-gray-200 font-semibold">{activeProject.role}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">TIMELINE</span>
                    <span className="text-gray-200 font-semibold">{activeProject.year}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">SECTOR</span>
                    <span className="text-gray-200 font-semibold">{activeProject.category}</span>
                  </div>
                  <div className="flex gap-2 items-center justify-start sm:justify-end">
                    {activeProject.githubUrl && (
                      <a
                        href={activeProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-gray-850 hover:bg-gray-800 rounded text-gray-300 hover:text-white border border-gray-800 transition-colors"
                        title="GitHub Code"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {activeProject.demoUrl && (
                      <a
                        href={activeProject.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-indigo-600 hover:bg-indigo-500 rounded text-white transition-colors flex items-center gap-1 px-3 text-[11px]"
                      >
                        <span>Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Overview Description */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
                    System Architecture & Scope
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed font-light">
                    {activeProject.longDescription}
                  </p>
                </div>

                {/* Key Technical Highlights */}
                {activeProject.highlights && activeProject.highlights.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
                      Engineering Triumphs
                    </h4>
                    <ul className="space-y-2">
                      {activeProject.highlights.map((highlight, hidx) => (
                        <li key={hidx} className="flex items-start gap-2.5 text-xs text-gray-300 leading-relaxed font-sans">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technology Stack Grid */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
                    Integrated Stack & SDKs
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="py-1 px-2.5 bg-gray-900 text-indigo-200 border border-gray-850 rounded font-mono text-[10px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-gray-900 bg-gray-900/35 flex justify-end gap-3 rounded-b-2xl">
                <button
                  onClick={() => setActiveProject(null)}
                  className="px-4 py-2 bg-gray-900 hover:bg-gray-850 border border-gray-800 rounded-lg text-xs font-mono font-medium text-gray-400 hover:text-white transition-all cursor-pointer"
                >
                  Dismiss Specs
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
