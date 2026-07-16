import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Mail, MessageSquare, Send, CheckCircle2, Inbox, 
  Trash2, Clock, Calendar, AlertTriangle 
} from "lucide-react";
import { MessageSubmission, Profile } from "../types";

interface ContactProps {
  profile: Profile;
}

export default function Contact({ profile }: ContactProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [validationError, setValidationError] = useState("");

  const [submissions, setSubmissions] = useState<MessageSubmission[]>([]);
  const [showInbox, setShowInbox] = useState(false);

  // Load submissions on mount
  useEffect(() => {
    const saved = localStorage.getItem("portfolio_submissions");
    if (saved) {
      try {
        setSubmissions(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load submissions", e);
      }
    }
  }, []);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    setValidationError("");

    // Simple validation
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setValidationError("All coordinate lines must be filled to establish a connection.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setValidationError("Please input a valid transmission email address.");
      return;
    }

    setIsSending(true);

    // Simulate Network Latency
    setTimeout(() => {
      const newSubmission: MessageSubmission = {
        id: `msg-${Date.now()}`,
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        date: new Date().toLocaleString()
      };

      const updated = [newSubmission, ...submissions];
      setSubmissions(updated);
      localStorage.setItem("portfolio_submissions", JSON.stringify(updated));

      // Reset form fields
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      
      setIsSending(false);
      setIsSuccess(true);

      // Auto dismiss success toast after 4 seconds
      setTimeout(() => setIsSuccess(false), 4000);
    }, 1200);
  };

  const deleteSubmission = (id: string) => {
    const filtered = submissions.filter(s => s.id !== id);
    setSubmissions(filtered);
    localStorage.setItem("portfolio_submissions", JSON.stringify(filtered));
  };

  const clearAllSubmissions = () => {
    if (window.confirm("Are you sure you want to purge the message logs?")) {
      setSubmissions([]);
      localStorage.removeItem("portfolio_submissions");
    }
  };

  return (
    <section id="contact" className="py-24 border-t border-gray-900 bg-gray-950 relative">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-radial-glow pointer-events-none filter blur-3xl opacity-50" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-widest">
            <MessageSquare className="w-4 h-4 text-indigo-500" />
            <span>Sub-space Uplink</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Initiate Connection
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed font-light">
            Have an interesting system constraint to solve or a creative web campaign to launch? Send a message and let's coordinate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Info Panel / Left */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glass-card rounded-2xl p-6 border border-gray-900/60 space-y-6">
              <h3 className="font-display font-semibold text-lg text-white">
                Coordinates & Inquiries
              </h3>
              
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light">
                Feel free to send a direct message, schedule a virtual review meeting, or email me directly using the transmission details below.
              </p>

              <div className="border-t border-gray-900 my-4" />

              <div className="space-y-4 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-gray-950 border border-gray-850 rounded text-indigo-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">DIRECT MAILBOX</span>
                    <a href={`mailto:${profile.email}`} className="text-gray-200 hover:text-indigo-400 transition-colors">
                      {profile.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-gray-950 border border-gray-850 rounded text-indigo-400">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-gray-500 block text-[10px]">TIME ZONE REFERENCE</span>
                    <span className="text-gray-200">
                      UTC-8 / Pacific Standard Time
                    </span>
                  </div>
                </div>
              </div>

              {/* Submission Logs Button (The client-side message inbox!) */}
              <div className="pt-4">
                <button
                  onClick={() => setShowInbox(!showInbox)}
                  className="w-full py-2 bg-gray-900 hover:bg-gray-850 border border-gray-800 text-gray-300 hover:text-white rounded-lg text-xs font-mono font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Inbox className="w-3.5 h-3.5 text-indigo-400" />
                  <span>
                    {showInbox ? "Hide Local Messages" : "Inspect Submission Logs"} ({submissions.length})
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Contact Form / Right */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSendMessage} className="glass-card rounded-2xl p-6 sm:p-8 border border-gray-900/60 space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-gray-400 tracking-wider uppercase">Name Coordinates</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-gray-950 border border-gray-850 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-gray-400 tracking-wider uppercase">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-gray-950 border border-gray-850 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-gray-400 tracking-wider uppercase">Subject / Objective</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Collaborative projects / Hiring Inquiry / System review"
                  className="w-full bg-gray-950 border border-gray-850 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-gray-400 tracking-wider uppercase">Detailed Transmission Package</label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your design specifications, budget bounds, or hiring constraints..."
                  className="w-full bg-gray-950 border border-gray-850 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors leading-relaxed"
                />
              </div>

              {/* Error Alert */}
              <AnimatePresence>
                {validationError && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono flex items-center gap-2"
                  >
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{validationError}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Success Toast / Notification */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Transmission sent successfully! Sub-space coordinate logs updated.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={isSending}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSending ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/35 border-t-white rounded-full animate-spin" />
                    <span>Transmitting Package...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Transmit Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Local Submissions Inbox Overlay Drawer */}
        <AnimatePresence>
          {showInbox && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-12 p-6 bg-gray-900/40 rounded-2xl border border-gray-900 space-y-6 overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                <div className="flex items-center gap-2">
                  <Inbox className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-display font-semibold text-white">
                    Client Submissions Mailbox
                  </h3>
                  <span className="py-0.5 px-2 bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-mono text-indigo-400 rounded-full">
                    Local Sandbox Database
                  </span>
                </div>
                {submissions.length > 0 && (
                  <button
                    onClick={clearAllSubmissions}
                    className="text-xs font-mono text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Purge Inbox
                  </button>
                )}
              </div>

              {submissions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {submissions.map((sub) => (
                    <div key={sub.id} className="p-4 bg-gray-950 border border-gray-850 rounded-xl relative space-y-3 group">
                      <button
                        onClick={() => deleteSubmission(sub.id)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-red-400 p-1 rounded hover:bg-gray-900 transition-colors"
                        title="Purge Message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="space-y-1 pr-6">
                        <div className="flex items-center gap-1 text-[10px] font-mono text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>{sub.date}</span>
                        </div>
                        <h4 className="font-display font-semibold text-sm text-white">
                          {sub.subject}
                        </h4>
                        <p className="text-xs text-indigo-400 font-mono">
                          From: {sub.name} &lt;{sub.email}&gt;
                        </p>
                      </div>

                      <p className="text-xs text-gray-300 leading-relaxed font-sans font-light bg-gray-900/60 p-3 rounded border border-gray-900 max-h-32 overflow-y-auto">
                        {sub.message}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500 font-mono text-xs">
                  <Inbox className="w-8 h-8 text-gray-700 mx-auto mb-3" />
                  No local transmissions recorded. Test the form above to record submissions!
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
