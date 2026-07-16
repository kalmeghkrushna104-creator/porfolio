import { motion } from "motion/react";
import { Briefcase, Calendar, Building, BadgeCheck, Activity } from "lucide-react";
import { Experience } from "../types";

interface ExperienceTimelineProps {
  experience: Experience[];
}

export default function ExperienceTimeline({ experience }: ExperienceTimelineProps) {
  return (
    <section id="experience" className="py-24 border-t border-gray-900 bg-gray-950/40 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-widest">
            <Activity className="w-4 h-4 text-indigo-500" />
            <span>Academic & Training Journey</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Educational Timeline
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed font-light">
            An overview of academic qualifications, specialized professional training, and key student milestones in computer applications.
          </p>
        </div>

        {/* Timeline Path Structure */}
        <div className="relative max-w-4xl mx-auto pl-6 sm:pl-8 border-l border-gray-900 space-y-12">
          {experience.map((exp, idx) => {
            const isCurrent = idx === 0; // Assume first is current
            
            return (
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={exp.id}
                className="relative group"
              >
                {/* Connecting Circle Bullet */}
                <div 
                  className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                    isCurrent 
                      ? "bg-indigo-600 border-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.5)] scale-110" 
                      : "bg-gray-950 border-gray-800 group-hover:border-indigo-500/50"
                  }`}
                >
                  {isCurrent && (
                    <span className="absolute w-2.5 h-2.5 bg-indigo-400 rounded-full animate-ping opacity-75" />
                  )}
                </div>

                {/* Timeline Card */}
                <div className="glass-card rounded-xl p-6 border border-gray-900/60 transition-all duration-300 hover:border-gray-800">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-900 pb-4 mb-4">
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-indigo-400" />
                        <h3 className="font-display font-bold text-lg text-white">
                          {exp.company}
                        </h3>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-mono font-medium text-indigo-400 uppercase tracking-widest">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-indigo-300">
                        {exp.role}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-gray-500 self-start sm:self-center">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.period}</span>
                    </div>

                  </div>

                  {/* Short description */}
                  <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Accomplishment points list */}
                  {exp.points && exp.points.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-mono tracking-widest text-indigo-400 font-bold uppercase">
                        Key Engineering Milestones
                      </h4>
                      <ul className="space-y-2">
                        {exp.points.map((point, pidx) => (
                          <li key={pidx} className="flex items-start gap-2 text-xs text-gray-400 leading-relaxed font-sans group/point">
                            <BadgeCheck className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0 group-hover/point:scale-110 transition-transform" />
                            <span className="group-hover/point:text-gray-300 transition-colors">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Optional empty state resume indicator */}
        {experience.length === 0 && (
          <div className="text-center py-12 border border-dashed border-gray-850 rounded-xl max-w-sm mx-auto">
            <Briefcase className="w-6 h-6 text-gray-500 mx-auto mb-2" />
            <p className="text-xs text-gray-400 font-mono">No work experience loaded in timeline</p>
          </div>
        )}

      </div>
    </section>
  );
}
