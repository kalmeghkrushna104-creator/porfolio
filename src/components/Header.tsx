import { useState, useEffect } from "react";
import { Settings, Command, Menu, X, ArrowUpRight } from "lucide-react";
import { Profile } from "../types";

interface HeaderProps {
  profile: Profile;
  onOpenCustomizer: () => void;
}

export default function Header({ profile, onOpenCustomizer }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = ["home", "projects", "skills", "experience", "contact"];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-30 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-gray-950/85 backdrop-blur-md border-gray-900 py-3"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-2 group cursor-pointer text-left focus:outline-none"
        >
          <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center font-mono font-bold text-white shadow-lg shadow-indigo-600/20 group-hover:bg-indigo-500 transition-colors">
            {profile.name ? profile.name.charAt(0) : "A"}
          </div>
          <div>
            <span className="font-display font-bold text-sm tracking-tight text-white group-hover:text-indigo-400 transition-colors">
              {profile.name || "Portfolio"}
            </span>
            <span className="hidden sm:block text-[9px] font-mono text-gray-500 tracking-wider uppercase">
              {profile.title || "Developer"}
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-gray-900/40 p-1 rounded-full border border-gray-850 backdrop-blur-sm">
          {[
            { id: "home", label: "Home" },
            { id: "projects", label: "Projects" },
            { id: "skills", label: "Skills" },
            { id: "experience", label: "History" },
            { id: "contact", label: "Contact" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all ${
                activeSection === item.id
                  ? "bg-indigo-600 text-white font-medium"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Button & Menu */}
        <div className="flex items-center gap-3">
          {/* Customizer Slider Toggle */}
          <button
            onClick={onOpenCustomizer}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-850 hover:bg-gray-800 hover:border-gray-700 text-xs font-mono text-indigo-400 hover:text-indigo-300 transition-all cursor-pointer shadow-sm group"
          >
            <Settings className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300" />
            <span>Customize</span>
          </button>

          {/* Resume link */}
          {profile.resumeUrl && profile.resumeUrl !== "#" && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-xs font-mono text-gray-300 hover:text-white transition-colors"
            >
              Resume
              <ArrowUpRight className="w-3 h-3" />
            </a>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-900 rounded-lg transition-colors focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[57px] bg-gray-950 border-b border-gray-900 shadow-xl py-6 px-6 space-y-4 flex flex-col z-20">
          {[
            { id: "home", label: "Home" },
            { id: "projects", label: "Featured Projects" },
            { id: "skills", label: "Skills & Capabilities" },
            { id: "experience", label: "Work Experience" },
            { id: "contact", label: "Get In Touch" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left py-2 font-display text-sm font-medium border-b border-gray-900 pb-2 transition-all ${
                activeSection === item.id ? "text-indigo-400 pl-2" : "text-gray-300"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 flex justify-between items-center text-xs font-mono text-gray-500">
            <span>{profile.location}</span>
            <a href={`mailto:${profile.email}`} className="text-indigo-400">
              {profile.email}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
