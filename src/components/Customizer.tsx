import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, User, Briefcase, Sparkles, FileCode, Plus, Trash2, 
  Copy, Check, RotateCcw, AlertCircle, Save, Layers 
} from "lucide-react";
import { PortfolioData, Project, Skill, Experience, Profile } from "../types";

interface CustomizerProps {
  data: PortfolioData;
  onChange: (newData: PortfolioData) => void;
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
}

type TabType = "profile" | "projects" | "skills" | "experience" | "data";

export default function Customizer({ data, onChange, onReset, isOpen, onClose }: CustomizerProps) {
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [copied, setCopied] = useState(false);
  const [jsonInput, setJsonInput] = useState("");
  const [jsonError, setJsonError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Helper to handle profile fields change
  const handleProfileChange = (key: keyof Profile, value: string) => {
    const updated = {
      ...data,
      profile: {
        ...data.profile,
        [key]: value
      }
    };
    onChange(updated);
    triggerSaveAlert();
  };

  // Helper to update a project
  const handleProjectChange = (index: number, key: keyof Project, value: any) => {
    const updatedProjects = [...data.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [key]: value
    };
    onChange({ ...data, projects: updatedProjects });
    triggerSaveAlert();
  };

  // Add Project
  const handleAddProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: "New Project",
      description: "A short, engaging description of your project.",
      longDescription: "A deeper dive into the features, challenges, and implementation details of this work.",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      category: "Creative Tech",
      role: "Lead Developer",
      year: new Date().getFullYear().toString(),
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
      highlights: ["Implemented custom performance filters.", "Engineered responsive layouts."]
    };
    onChange({ ...data, projects: [newProj, ...data.projects] });
    triggerSaveAlert();
  };

  // Delete Project
  const handleDeleteProject = (id: string) => {
    const filtered = data.projects.filter(p => p.id !== id);
    onChange({ ...data, projects: filtered });
    triggerSaveAlert();
  };

  // Helper to update a skill
  const handleSkillChange = (index: number, key: keyof Skill, value: any) => {
    const updatedSkills = [...data.skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [key]: value
    };
    onChange({ ...data, skills: updatedSkills });
    triggerSaveAlert();
  };

  // Add Skill
  const handleAddSkill = () => {
    const newSkill: Skill = {
      name: "New Skill",
      category: "Frontend",
      level: 80,
      iconName: "Code2"
    };
    onChange({ ...data, skills: [...data.skills, newSkill] });
    triggerSaveAlert();
  };

  // Delete Skill
  const handleDeleteSkill = (index: number) => {
    const filtered = data.skills.filter((_, i) => i !== index);
    onChange({ ...data, skills: filtered });
    triggerSaveAlert();
  };

  // Helper to update experience
  const handleExperienceChange = (index: number, key: keyof Experience, value: any) => {
    const updatedExp = [...data.experience];
    updatedExp[index] = {
      ...updatedExp[index],
      [key]: value
    };
    onChange({ ...data, experience: updatedExp });
    triggerSaveAlert();
  };

  // Add Experience
  const handleAddExperience = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      role: "Software Engineer",
      company: "Innovate Corp",
      period: "2024 - Present",
      description: "Designed and implemented interactive interfaces and modern data visualization dashboards.",
      points: [
        "Led front-end module design for core cloud monitoring dashboard.",
        "Collaborated with product designers to establish visual style guides."
      ]
    };
    onChange({ ...data, experience: [newExp, ...data.experience] });
    triggerSaveAlert();
  };

  // Delete Experience
  const handleDeleteExperience = (id: string) => {
    const filtered = data.experience.filter(e => e.id !== id);
    onChange({ ...data, experience: filtered });
    triggerSaveAlert();
  };

  // Trigger Save Alert
  const triggerSaveAlert = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  // Copy JSON Data
  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Import JSON Data
  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      // Simple validation check
      if (parsed.profile && parsed.projects && parsed.skills && parsed.experience) {
        onChange(parsed);
        setJsonError("");
        setJsonInput("");
        triggerSaveAlert();
        alert("Portfolio data imported successfully!");
      } else {
        setJsonError("Invalid schema: Must contain profile, projects, skills, and experience.");
      }
    } catch (e: any) {
      setJsonError(`JSON Parse Error: ${e.message}`);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />

          {/* Drawer Panel */}
          <motion.div
            id="portfolio-customizer-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-lg md:max-w-xl bg-gray-950 border-l border-gray-800 shadow-2xl z-50 flex flex-col overflow-hidden text-gray-200"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-gray-800 flex items-center justify-between bg-gray-950/80 backdrop-blur-md">
              <div>
                <h3 className="font-display font-semibold text-lg text-white flex items-center gap-2">
                  <Save className="w-5 h-5 text-indigo-400 animate-pulse" />
                  Live Portfolio Customizer
                </h3>
                <p className="text-xs text-gray-400">Modify your portfolio details live inside the browser</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onReset}
                  title="Reset to Template Defaults"
                  className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Save Status Alert */}
            <AnimatePresence>
              {saveSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-emerald-500/10 border-b border-emerald-500/20 text-emerald-400 text-xs py-2 px-5 font-mono text-center"
                >
                  ✔ Saved to browser memory (localStorage)
                </motion.div>
              )}
            </AnimatePresence>

            {/* Customizer Tabs */}
            <div className="flex border-b border-gray-900 bg-gray-950 overflow-x-auto text-xs font-mono scrollbar-none">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex-1 py-3 px-2 border-b-2 text-center whitespace-nowrap transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === "profile" 
                    ? "border-indigo-500 text-white bg-indigo-500/5 font-medium" 
                    : "border-transparent text-gray-400 hover:text-white hover:bg-gray-900"
                }`}
              >
                <User className="w-3.5 h-3.5" />
                Profile
              </button>
              <button
                onClick={() => setActiveTab("projects")}
                className={`flex-1 py-3 px-2 border-b-2 text-center whitespace-nowrap transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === "projects" 
                    ? "border-indigo-500 text-white bg-indigo-500/5 font-medium" 
                    : "border-transparent text-gray-400 hover:text-white hover:bg-gray-900"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Projects ({data.projects.length})
              </button>
              <button
                onClick={() => setActiveTab("skills")}
                className={`flex-1 py-3 px-2 border-b-2 text-center whitespace-nowrap transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === "skills" 
                    ? "border-indigo-500 text-white bg-indigo-500/5 font-medium" 
                    : "border-transparent text-gray-400 hover:text-white hover:bg-gray-900"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Skills ({data.skills.length})
              </button>
              <button
                onClick={() => setActiveTab("experience")}
                className={`flex-1 py-3 px-2 border-b-2 text-center whitespace-nowrap transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === "experience" 
                    ? "border-indigo-500 text-white bg-indigo-500/5 font-medium" 
                    : "border-transparent text-gray-400 hover:text-white hover:bg-gray-900"
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                Experience
              </button>
              <button
                onClick={() => setActiveTab("data")}
                className={`flex-1 py-3 px-2 border-b-2 text-center whitespace-nowrap transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === "data" 
                    ? "border-indigo-500 text-white bg-indigo-500/5 font-medium" 
                    : "border-transparent text-gray-400 hover:text-white hover:bg-gray-900"
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                JSON Data
              </button>
            </div>

            {/* Tab Contents - Scrollable */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-gray-950/50">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">Personal Information</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400 font-mono">Full Name</label>
                      <input
                        type="text"
                        value={data.profile.name}
                        onChange={(e) => handleProfileChange("name", e.target.value)}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 font-sans"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400 font-mono">Professional Title</label>
                      <input
                        type="text"
                        value={data.profile.title}
                        onChange={(e) => handleProfileChange("title", e.target.value)}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400 font-mono">Current Company</label>
                      <input
                        type="text"
                        value={data.profile.company}
                        onChange={(e) => handleProfileChange("company", e.target.value)}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400 font-mono">Location / Bounds</label>
                      <input
                        type="text"
                        value={data.profile.location}
                        onChange={(e) => handleProfileChange("location", e.target.value)}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-mono">Hero Large Greeting</label>
                    <input
                      type="text"
                      value={data.profile.heroGreeting}
                      onChange={(e) => handleProfileChange("heroGreeting", e.target.value)}
                      className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-mono">Biography Summary</label>
                    <textarea
                      rows={4}
                      value={data.profile.bio}
                      onChange={(e) => handleProfileChange("bio", e.target.value)}
                      className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
                    />
                  </div>

                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono pt-2">Links & Coordinates</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400 font-mono">Email Address</label>
                      <input
                        type="email"
                        value={data.profile.email}
                        onChange={(e) => handleProfileChange("email", e.target.value)}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400 font-mono">GitHub URL</label>
                      <input
                        type="text"
                        value={data.profile.github}
                        onChange={(e) => handleProfileChange("github", e.target.value)}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400 font-mono">LinkedIn URL</label>
                      <input
                        type="text"
                        value={data.profile.linkedin}
                        onChange={(e) => handleProfileChange("linkedin", e.target.value)}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400 font-mono">Twitter URL</label>
                      <input
                        type="text"
                        value={data.profile.twitter}
                        onChange={(e) => handleProfileChange("twitter", e.target.value)}
                        className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-gray-400 font-mono">Resume File / Anchor Link</label>
                    <input
                      type="text"
                      value={data.profile.resumeUrl}
                      onChange={(e) => handleProfileChange("resumeUrl", e.target.value)}
                      className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              )}

              {/* Projects Tab */}
              {activeTab === "projects" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">Showcase Projects</h4>
                    <button
                      onClick={handleAddProject}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-mono font-medium flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Project
                    </button>
                  </div>

                  {data.projects.map((proj, idx) => (
                    <div key={proj.id} className="p-4 bg-gray-900 rounded-lg border border-gray-800 space-y-3 relative group">
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="absolute top-4 right-4 p-1.5 text-gray-500 hover:text-red-400 hover:bg-gray-800 rounded transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="space-y-1 pr-8">
                        <span className="text-[10px] font-mono text-indigo-400 tracking-widest uppercase">Project #{idx + 1}</span>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => handleProjectChange(idx, "title", e.target.value)}
                          className="w-full bg-transparent border-b border-gray-800 hover:border-gray-700 focus:border-indigo-500 py-1 font-display font-medium text-white focus:outline-none text-base"
                          placeholder="Project Title"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                        <div className="space-y-1">
                          <label className="text-gray-400">Category</label>
                          <input
                            type="text"
                            value={proj.category}
                            onChange={(e) => handleProjectChange(idx, "category", e.target.value)}
                            className="w-full bg-gray-950 border border-gray-850 rounded px-2 py-1 text-white focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-gray-400">Year</label>
                          <input
                            type="text"
                            value={proj.year}
                            onChange={(e) => handleProjectChange(idx, "year", e.target.value)}
                            className="w-full bg-gray-950 border border-gray-850 rounded px-2 py-1 text-white focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                        <div className="space-y-1">
                          <label className="text-gray-400">Your Role</label>
                          <input
                            type="text"
                            value={proj.role}
                            onChange={(e) => handleProjectChange(idx, "role", e.target.value)}
                            className="w-full bg-gray-950 border border-gray-850 rounded px-2 py-1 text-white focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-gray-400">Image URL</label>
                          <input
                            type="text"
                            value={proj.image}
                            onChange={(e) => handleProjectChange(idx, "image", e.target.value)}
                            className="w-full bg-gray-950 border border-gray-850 rounded px-2 py-1 text-white focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-1 text-xs">
                        <label className="text-gray-400 font-mono">Card Description</label>
                        <input
                          type="text"
                          value={proj.description}
                          onChange={(e) => handleProjectChange(idx, "description", e.target.value)}
                          className="w-full bg-gray-950 border border-gray-850 rounded px-2 py-1.5 text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div className="space-y-1 text-xs">
                        <label className="text-gray-400 font-mono">Full Detail Description (Markdown supported)</label>
                        <textarea
                          rows={3}
                          value={proj.longDescription}
                          onChange={(e) => handleProjectChange(idx, "longDescription", e.target.value)}
                          className="w-full bg-gray-950 border border-gray-850 rounded px-2 py-1.5 text-white focus:outline-none focus:border-indigo-500 font-sans"
                        />
                      </div>

                      <div className="space-y-1 text-xs">
                        <label className="text-gray-400 font-mono">Tags (comma-separated)</label>
                        <input
                          type="text"
                          value={proj.tags.join(", ")}
                          onChange={(e) => handleProjectChange(idx, "tags", e.target.value.split(",").map(t => t.trim()))}
                          className="w-full bg-gray-950 border border-gray-850 rounded px-2 py-1.5 text-white focus:outline-none focus:border-indigo-500 font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                        <div className="space-y-1">
                          <label className="text-gray-400">Demo Live URL</label>
                          <input
                            type="text"
                            value={proj.demoUrl}
                            onChange={(e) => handleProjectChange(idx, "demoUrl", e.target.value)}
                            className="w-full bg-gray-950 border border-gray-850 rounded px-2 py-1 text-white focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-gray-400">GitHub Code URL</label>
                          <input
                            type="text"
                            value={proj.githubUrl}
                            onChange={(e) => handleProjectChange(idx, "githubUrl", e.target.value)}
                            className="w-full bg-gray-950 border border-gray-850 rounded px-2 py-1 text-white focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-1 text-xs">
                        <label className="text-gray-400 font-mono">Bullet Highlights (One per line)</label>
                        <textarea
                          rows={2}
                          value={proj.highlights.join("\n")}
                          onChange={(e) => handleProjectChange(idx, "highlights", e.target.value.split("\n").filter(h => h.trim() !== ""))}
                          className="w-full bg-gray-950 border border-gray-850 rounded px-2 py-1.5 text-white focus:outline-none focus:border-indigo-500 font-sans"
                          placeholder="Bullet point highlights of what you achieved..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Skills Tab */}
              {activeTab === "skills" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">Competencies & Skills</h4>
                    <button
                      onClick={handleAddSkill}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-mono font-medium flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Skill
                    </button>
                  </div>

                  <div className="space-y-3">
                    {data.skills.map((skill, idx) => (
                      <div key={idx} className="p-3 bg-gray-900 rounded-lg border border-gray-850 flex items-center gap-3">
                        <div className="flex-1 grid grid-cols-12 gap-3 text-xs items-center">
                          <div className="col-span-4">
                            <input
                              type="text"
                              value={skill.name}
                              onChange={(e) => handleSkillChange(idx, "name", e.target.value)}
                              className="w-full bg-transparent border-b border-gray-800 hover:border-gray-700 focus:border-indigo-500 text-white focus:outline-none font-medium py-0.5"
                              placeholder="Skill name"
                            />
                          </div>
                          
                          <div className="col-span-3">
                            <select
                              value={skill.category}
                              onChange={(e) => handleSkillChange(idx, "category", e.target.value)}
                              className="w-full bg-gray-950 border border-gray-800 rounded px-1.5 py-0.5 text-gray-300 focus:outline-none font-mono text-[11px]"
                            >
                              <option value="Frontend">Frontend</option>
                              <option value="Backend">Backend</option>
                              <option value="DevOps">DevOps</option>
                              <option value="Creative">Creative</option>
                            </select>
                          </div>

                          <div className="col-span-3 flex items-center gap-2">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={skill.level}
                              onChange={(e) => handleSkillChange(idx, "level", parseInt(e.target.value))}
                              className="w-full accent-indigo-500 h-1 bg-gray-850 rounded-lg appearance-none cursor-pointer"
                            />
                            <span className="font-mono text-[11px] text-gray-400 w-6 text-right">{skill.level}%</span>
                          </div>

                          <div className="col-span-2">
                            <input
                              type="text"
                              value={skill.iconName}
                              onChange={(e) => handleSkillChange(idx, "iconName", e.target.value)}
                              className="w-full bg-transparent border-b border-gray-800 text-center hover:border-gray-700 focus:border-indigo-500 text-gray-400 focus:outline-none font-mono text-[10px]"
                              title="Lucide Icon Name"
                              placeholder="Icon"
                            />
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteSkill(idx)}
                          className="text-gray-500 hover:text-red-400 p-1 hover:bg-gray-800 rounded transition-colors"
                          title="Delete Skill"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience Tab */}
              {activeTab === "experience" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">Professional History</h4>
                    <button
                      onClick={handleAddExperience}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-mono font-medium flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Experience
                    </button>
                  </div>

                  {data.experience.map((exp, idx) => (
                    <div key={exp.id} className="p-4 bg-gray-900 rounded-lg border border-gray-800 space-y-3 relative">
                      <button
                        onClick={() => handleDeleteExperience(exp.id)}
                        className="absolute top-4 right-4 p-1.5 text-gray-500 hover:text-red-400 hover:bg-gray-800 rounded transition-colors"
                        title="Delete Experience"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="space-y-1 pr-8">
                        <span className="text-[10px] font-mono text-indigo-400 tracking-widest uppercase">Job #{idx + 1}</span>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => handleExperienceChange(idx, "role", e.target.value)}
                          className="w-full bg-transparent border-b border-gray-800 hover:border-gray-700 focus:border-indigo-500 py-1 font-display font-medium text-white focus:outline-none text-base"
                          placeholder="Role/Title"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                        <div className="space-y-1">
                          <label className="text-gray-400">Company Name</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => handleExperienceChange(idx, "company", e.target.value)}
                            className="w-full bg-gray-950 border border-gray-850 rounded px-2 py-1 text-white focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-gray-400">Period / Years</label>
                          <input
                            type="text"
                            value={exp.period}
                            onChange={(e) => handleExperienceChange(idx, "period", e.target.value)}
                            className="w-full bg-gray-950 border border-gray-850 rounded px-2 py-1 text-white focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-1 text-xs">
                        <label className="text-gray-400 font-mono">Short Overview Description</label>
                        <input
                          type="text"
                          value={exp.description}
                          onChange={(e) => handleExperienceChange(idx, "description", e.target.value)}
                          className="w-full bg-gray-950 border border-gray-850 rounded px-2 py-1.5 text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div className="space-y-1 text-xs">
                        <label className="text-gray-400 font-mono">Achieved Points (One bullet per line)</label>
                        <textarea
                          rows={3}
                          value={exp.points.join("\n")}
                          onChange={(e) => handleExperienceChange(idx, "points", e.target.value.split("\n").filter(p => p.trim() !== ""))}
                          className="w-full bg-gray-950 border border-gray-850 rounded px-2 py-1.5 text-white focus:outline-none focus:border-indigo-500 font-sans"
                          placeholder="Details about achievements..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Data Export / Import Tab */}
              {activeTab === "data" && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">Portfolio State Sync</h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      You can download or copy your exact portfolio configuration, save it locally, or paste external JSON content below to restore your work across browsers!
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400 font-mono">Current Export JSON</span>
                      <button
                        onClick={handleCopyJson}
                        className="px-2.5 py-1 bg-gray-850 hover:bg-gray-800 text-white rounded text-[11px] font-mono flex items-center gap-1 transition-colors"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            Copy Portfolio JSON
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-3 bg-gray-900 border border-gray-800 rounded text-[10px] font-mono max-h-48 overflow-y-auto text-indigo-300">
                      {JSON.stringify(data, null, 2)}
                    </pre>
                  </div>

                  <div className="border-t border-gray-900 my-4" />

                  <div className="space-y-2">
                    <label className="text-xs text-gray-400 font-mono block">Import Portfolio JSON</label>
                    <textarea
                      rows={5}
                      value={jsonInput}
                      onChange={(e) => setJsonInput(e.target.value)}
                      placeholder='Paste your custom portfolio JSON config here...'
                      className="w-full bg-gray-900 border border-gray-800 rounded p-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
                    />
                    {jsonError && (
                      <p className="text-red-400 font-mono text-[11px] flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {jsonError}
                      </p>
                    )}
                    <button
                      onClick={handleImportJson}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-colors"
                    >
                      Apply Custom Config
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Customizer Footer */}
            <div className="p-4 border-t border-gray-900 bg-gray-950 flex items-center justify-between text-[11px] font-mono text-gray-400">
              <span>Status: <span className="text-emerald-400">● Live Preview Active</span></span>
              <span>v1.0.0</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
