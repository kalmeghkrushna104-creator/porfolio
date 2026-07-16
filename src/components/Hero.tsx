import { motion } from "motion/react";
import { Github, Linkedin, Twitter, Mail, ArrowDown, MapPin, Sparkles, FileText } from "lucide-react";
import { Profile } from "../types";

interface HeroProps {
  profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 20, stiffness: 100 }
    }
  };

  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[95vh] flex items-center justify-center pt-24 overflow-hidden"
    >
      {/* Background visual meshes and custom gridded ambient light */}
      <div className="absolute inset-0 bg-mesh-grid pointer-events-none opacity-60" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-radial-glow pointer-events-none filter blur-3xl opacity-75" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-radial-glow-accent pointer-events-none filter blur-3xl opacity-60" />

      {/* Hero Content Area */}
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Tagline / Opportunity status */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900/60 border border-indigo-500/20 text-[11px] font-mono font-medium text-indigo-400 tracking-wider uppercase backdrop-blur-sm shadow-inner"
          >
            <Sparkles className="w-3 h-3 text-indigo-400 animate-spin-slow" />
            <span>{profile.company ? `Developing at ${profile.company}` : "Available for select opportunities"}</span>
          </motion.div>

          {/* Heading Title */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.1] select-none">
              {profile.heroGreeting || `I'm ${profile.name}`}
            </h1>
            <p className="font-display font-semibold text-lg sm:text-2xl text-indigo-300/90 tracking-wide select-none">
              {profile.title}
            </p>
          </motion.div>

          {/* Location Badge */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center justify-center gap-1 text-xs font-mono text-gray-400"
          >
            <MapPin className="w-3.5 h-3.5 text-indigo-500" />
            <span>{profile.location}</span>
          </motion.div>

          {/* Short Bio Paragraph */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-sm sm:text-base text-gray-300 leading-relaxed font-sans font-light select-text"
          >
            {profile.bio}
          </motion.p>

          {/* Actions call to buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={() => handleScrollTo("projects")}
              className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/35 hover:-translate-y-0.5 cursor-pointer"
            >
              Examine Work
            </button>
            <button
              onClick={() => handleScrollTo("contact")}
              className="w-full sm:w-auto px-8 py-3.5 bg-gray-950 border border-gray-800 hover:border-indigo-500/50 hover:bg-gray-900/40 text-gray-300 hover:text-white rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
            >
              Initiate Contact
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3 pt-6"
          >
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-gray-900 border border-gray-850 hover:border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800 transition-all shadow-sm"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-gray-900 border border-gray-850 hover:border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800 transition-all shadow-sm"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {profile.twitter && (
              <a
                href={profile.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-gray-900 border border-gray-850 hover:border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800 transition-all shadow-sm"
                title="Twitter Profile"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="p-2.5 rounded-lg bg-gray-900 border border-gray-850 hover:border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800 transition-all shadow-sm"
                title="Direct Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
            {profile.resumeUrl && profile.resumeUrl !== "#" && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg bg-gray-900 border border-gray-850 hover:border-indigo-500/30 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/10 transition-all shadow-sm flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider px-4"
                title="Download CV"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none animate-bounce">
        <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">Scroll</span>
        <ArrowDown className="w-4 h-4 text-gray-500" />
      </div>
    </section>
  );
}
