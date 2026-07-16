import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Sliders, ArrowUp, Terminal, Github, Linkedin, Twitter, Mail } from "lucide-react";
import { PortfolioData } from "./types";
import { DEFAULT_PORTFOLIO_DATA } from "./data";

// Component imports
import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import ExperienceTimeline from "./components/ExperienceTimeline";
import Contact from "./components/Contact";
import Customizer from "./components/Customizer";

export default function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(DEFAULT_PORTFOLIO_DATA);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [appLoaded, setAppLoaded] = useState(false);

  // Load custom data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("portfolio_custom_data");
    if (saved) {
      try {
        setPortfolioData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse custom portfolio data", e);
      }
    }
    setAppLoaded(true);

    // Scroll top button observer
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update data state & persistent memory
  const handleDataChange = (newData: PortfolioData) => {
    setPortfolioData(newData);
    localStorage.setItem("portfolio_custom_data", JSON.stringify(newData));
  };

  // Reset to original template defaults
  const handleResetData = () => {
    if (window.confirm("Are you sure you want to revert all custom modifications back to the default template?")) {
      setPortfolioData(DEFAULT_PORTFOLIO_DATA);
      localStorage.removeItem("portfolio_custom_data");
      alert("Portfolio template restored successfully!");
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const { profile, projects, skills, experience } = portfolioData;

  return (
    <div className="relative min-h-screen bg-[#030712] text-gray-100 selection:bg-indigo-500/30 selection:text-white antialiased font-sans flex flex-col justify-between overflow-hidden">
      
      {/* Intro Overlay Loader */}
      <AnimatePresence>
        {!appLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-gray-950 z-50 flex flex-col items-center justify-center space-y-4"
          >
            <div className="relative w-12 h-12 flex items-center justify-center">
              <span className="absolute inset-0 border-2 border-indigo-500/20 rounded-full" />
              <span className="absolute inset-0 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
            </div>
            <p className="font-mono text-xs text-gray-500 uppercase tracking-widest animate-pulse">
              Synthesizing Portfolio Matrix...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navigation Header */}
      <Header profile={profile} onOpenCustomizer={() => setCustomizerOpen(true)} />

      {/* Primary Section Canvas */}
      <main className="flex-1 w-full">
        {/* Hero Welcome Unit */}
        <Hero profile={profile} />

        {/* Masterpieces Project Catalog */}
        <Projects projects={projects} />

        {/* Skills Competency Matrix */}
        <Skills skills={skills} />

        {/* Career Experience Timeline */}
        <ExperienceTimeline experience={experience} />

        {/* Connection Form Section */}
        <Contact profile={profile} />
      </main>

      {/* Master Global Footer */}
      <footer className="border-t border-gray-900 bg-gray-950/80 backdrop-blur-md py-12 relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Copyright Branding */}
          <div className="md:col-span-4 space-y-2 text-center md:text-left">
            <h4 className="font-display font-bold text-sm tracking-tight text-white flex items-center justify-center md:justify-start gap-1.5">
              <span className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center font-mono font-bold text-xs text-white">
                {profile.name ? profile.name.charAt(0) : "A"}
              </span>
              <span>{profile.name}</span>
            </h4>
            <p className="text-xs text-gray-500 font-light font-sans leading-relaxed">
              &copy; {new Date().getFullYear()} {profile.name}. All systems operational. Built with high-contrast precision, modern React & Tailwind CSS.
            </p>
          </div>

          {/* Prompt Suggestion / Quick Customizer Link */}
          <div className="md:col-span-4 p-4 bg-gray-900/40 rounded-xl border border-gray-900 flex flex-col items-center text-center space-y-2">
            <Sliders className="w-4 h-4 text-indigo-400" />
            <div>
              <p className="text-[11px] font-mono text-gray-300 font-medium uppercase tracking-wide">Customize This Webspace</p>
              <p className="text-[10px] text-gray-500">Press customize to instantly replace these placeholder fields with your own details live!</p>
            </div>
            <button
              onClick={() => setCustomizerOpen(true)}
              className="py-1 px-3 bg-indigo-600 hover:bg-indigo-500 text-white font-mono rounded text-[10px] tracking-wider uppercase font-semibold transition-all cursor-pointer"
            >
              Open Customizer Drawer
            </button>
          </div>

          {/* Social Links Panel */}
          <div className="md:col-span-4 flex flex-col items-center md:items-end gap-3 text-xs font-mono">
            <span className="text-gray-500 uppercase text-[10px] tracking-wider">Communication Channels</span>
            <div className="flex items-center gap-3">
              {profile.github && (
                <a href={profile.github} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors" title="GitHub">
                  <Github className="w-4 h-4" />
                </a>
              )}
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors" title="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {profile.twitter && (
                <a href={profile.twitter} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors" title="Twitter">
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {profile.email && (
                <a href={`mailto:${profile.email}`} className="text-gray-500 hover:text-white transition-colors" title="Email">
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
            <div className="text-[10px] text-gray-600 flex items-center gap-1">
              <Terminal className="w-3 h-3 text-indigo-500/70" />
              <span>v1.0.0 (Reactive Frame)</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Sliding Control Customizer Drawer */}
      <Customizer
        data={portfolioData}
        onChange={handleDataChange}
        onReset={handleResetData}
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
      />

      {/* Scroll-To-Top Button Float */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={handleScrollToTop}
            className="fixed bottom-6 right-6 p-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-lg shadow-indigo-600/30 z-20 cursor-pointer transition-all hover:-translate-y-1"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
