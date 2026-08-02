"use client";

import React, { useState } from "react";
import { useOSState } from "@/context/AppContext";
import { Bot, Sparkles, Send, Check, AlertCircle, RefreshCw } from "lucide-react";

export default function AIPmScreen() {
  const { aiLog, addAiLog, projects, setTasks } = useOSState();
  const [messages, setMessages] = useState<any[]>([
    {
      sender: "ai",
      text: "Greetings. I am your autonomous AI Project Manager Agent. I monitor repository actions, milestones logs, and personal energy capacity thresholds.",
    },
    {
      sender: "ai",
      text: "CRITICAL SYSTEM NOTICE: DriverPilot AI has registered 0 commits or task adjustments for the past 5 consecutive days.\n\nRoot Block Cause: Backend API development is completely blocked due to the lack of an atomic DB sync schema layout.",
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const simulateSprintSetup = () => {
    setLoading(true);
    addAiLog("AI Project Manager Agent: Re-building task roadmap for database sprint.");

    setTimeout(() => {
      // Inject new rescue tasks
      const sprintTasks = [
        {
          id: `db-sprint-1`,
          projectId: "proj-1",
          title: "Generate PostgreSQL CRDT Logical Schema",
          context: "Create relational tables mapping atomic logic units for offline replication support.",
          whyImportant: "Directly solves DriverPilot sync blockade.",
          energyCost: "High" as const,
          duration: "3 hours",
          priority: "Critical" as const,
          deadline: "Aug 06, 2026",
          dependencies: [],
          completed: false,
        },
        {
          id: `db-sprint-2`,
          projectId: "proj-1",
          title: "Configure Vector Clock Synchronization protocol",
          context: "Replaces physical server logical timestamps with secure distributed sequence markers.",
          whyImportant: "Guarantees zero database write collisions under high cluster load.",
          energyCost: "Medium" as const,
          duration: "2 hours",
          priority: "High Impact" as const,
          deadline: "Aug 09, 2026",
          dependencies: ["db-sprint-1"],
          completed: false,
        }
      ];

      setTasks((prev) => [...sprintTasks, ...prev]);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "🚀 RESCUE SPRINT CONFIGURED SUCCESSFULLY!\nI've generated and seeded 2 critical action tasks in Task Engine 3.0:\n1. 'Generate PostgreSQL CRDT Logical Schema'\n2. 'Configure Vector Clock Synchronization protocol'\n\nFocus block recommendation has been dispatched to Smart Calendar.",
        }
      ]);
      setLoading(false);
      addAiLog("AI Project Manager Agent: Successfully inserted 2 Database Sprint rescue tasks.");
    }, 1500);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: inputText }]);
    const query = inputText;
    setInputText("");
    setLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `I've analyzed your query "${query}". Checking local vector store metrics. I recommend isolating focus blocks toward YOLO model optimizations before tackling secondary fleet sync operations. Let me know if you would like me to adjust task priority ratings automatically.`,
        }
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-white glow-text-purple">
          AI COGNITIVE MANAGER
        </h2>
        <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">
          Autonomous Coordination Engine & Agile Sprint Planner
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT COLUMN: System alerts & Quick actions */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-6 border-white/5 space-y-4">
            <h3 className="text-sm font-mono uppercase text-gray-300 tracking-wider flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-purple-400" /> Bottleneck Warning
            </h3>
            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs text-purple-200 leading-normal space-y-2">
              <span className="font-bold">Project Block:</span> DriverPilot AI is lagging. 0 physical updates since 5 days.
              <div className="font-semibold text-white mt-1">Suggested Rescue Strategy:</div>
              Launch an isolated "Database Sprint" of 2 key focus actions to clear API blockades.
            </div>

            <button
              onClick={simulateSprintSetup}
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs font-mono font-bold uppercase tracking-wider hover:from-purple-500 transition-all shadow-[0_0_12px_rgba(139,92,246,0.3)] flex items-center justify-center gap-1"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              LAUNCH DATABASE SPRINT
            </button>
          </div>

          <div className="glass-panel p-6 border-white/5 space-y-3">
            <h3 className="text-xs font-mono uppercase text-gray-400 tracking-wider">
              Diagnostic Core Feed
            </h3>
            <div className="max-h-40 overflow-y-auto text-[10px] font-mono text-cyan-400/80 space-y-1">
              {aiLog.slice(0, 5).map((log, i) => (
                <div key={i} className="flex gap-1 items-start">
                  <span className="text-purple-400">&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MIDDLE & RIGHT: Dialogue panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel-purple p-6 space-y-4 flex flex-col justify-between h-[450px]">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <h3 className="text-sm font-mono uppercase text-purple-400 tracking-wider flex items-center gap-1.5">
                <Bot className="w-5 h-5 text-purple-400 animate-pulse" /> Active Coordinator Terminal
              </h3>
              <span className="text-[10px] text-gray-500 font-mono">ONLINE & CALIBRATED</span>
            </div>

            {/* Chat list */}
            <div className="flex-grow overflow-y-auto p-2 space-y-4 text-xs font-mono">
              {messages.map((msg, i) => {
                const isAi = msg.sender === "ai";
                return (
                  <div
                    key={i}
                    className={`p-3.5 rounded-xl border flex gap-3 ${
                      isAi
                        ? "bg-purple-950/10 border-purple-500/20 text-gray-300"
                        : "bg-white/5 border-white/5 text-cyan-300 justify-end"
                    }`}
                  >
                    {isAi && <Bot className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />}
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {msg.text}
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex items-center gap-2 text-purple-400 text-xs animate-pulse">
                  <Bot className="w-4 h-4 animate-bounce" />
                  <span>Agent formulating sprint optimization matrix...</span>
                </div>
              )}
            </div>

            {/* Input form */}
            <form onSubmit={handleSend} className="flex gap-2 border-t border-white/5 pt-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask PM Agent to audit project milestones, generate tasks, or reschedule..."
                className="flex-grow glass-input bg-white/5 border-white/5 text-xs"
              />
              <button
                type="submit"
                className="px-4 py-3 bg-purple-600 rounded-lg hover:bg-purple-500 text-white font-bold font-mono text-xs"
              >
                SEND
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
