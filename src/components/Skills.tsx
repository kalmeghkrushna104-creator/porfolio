import { useMemo } from "react";
import { motion } from "motion/react";
import * as LucideIcons from "lucide-react";
import { Skill } from "../types";

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  // Dynamically resolve lucide icons
  const renderSkillIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className="w-5 h-5 text-indigo-400" />;
    }
    return <LucideIcons.Terminal className="w-5 h-5 text-indigo-400" />;
  };

  // Group skills by category
  const groupedSkills = useMemo(() => {
    return skills.reduce((acc, skill) => {
      const cat = skill.category || "General";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(skill);
      return acc;
    }, {} as Record<string, Skill[]>);
  }, [skills]);

  return (
    <section id="skills" className="py-24 border-t border-gray-900 bg-gray-950 relative">
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full bg-radial-glow pointer-events-none filter blur-3xl opacity-40 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-widest">
            <LucideIcons.Sparkles className="w-4 h-4 animate-pulse" />
            <span>Capabilities Matrix</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Technical Proficiency & Engineering Arsenal
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed font-light">
            An overview of structural capabilities, development frameworks, and creative software practices curated to build durable high-performance applications.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(groupedSkills).map(([category, rawList], catIdx) => {
            const list = rawList as Skill[];
            return (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                key={category}
                className="glass-card rounded-2xl p-6 border border-gray-900/60 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-gray-900 pb-4 mb-6">
                    <h3 className="font-display font-semibold text-base text-indigo-300 uppercase tracking-wider font-mono">
                      {category}
                    </h3>
                    <span className="py-0.5 px-2 bg-gray-900 border border-gray-850 text-gray-500 rounded font-mono text-[10px]">
                      {list.length} {list.length === 1 ? "Skill" : "Skills"}
                    </span>
                  </div>

                  {/* Skill List Progress Bars */}
                  <div className="space-y-5">
                    {list.map((skill) => (
                      <div key={skill.name} className="space-y-1.5 group">
                        <div className="flex justify-between items-center text-xs">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-gray-950 border border-gray-850/60 rounded group-hover:border-indigo-500/20 transition-colors">
                              {renderSkillIcon(skill.iconName)}
                            </div>
                            <span className="text-gray-200 font-medium font-sans group-hover:text-white transition-colors">
                              {skill.name}
                            </span>
                          </div>
                          <span className="font-mono text-gray-400 group-hover:text-indigo-400 transition-colors">
                            {skill.level}%
                          </span>
                        </div>

                        {/* Progress bar background */}
                        <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden relative border border-gray-850/20">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.2)]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category Footer Accents */}
                <div className="mt-8 border-t border-gray-900 pt-4 flex items-center justify-between text-[10px] font-mono text-gray-500">
                  <span className="flex items-center gap-1">
                    <LucideIcons.CheckCircle2 className="w-3.5 h-3.5 text-emerald-500/80" />
                    Production Ready
                  </span>
                  <span>Verified Aptitude</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
