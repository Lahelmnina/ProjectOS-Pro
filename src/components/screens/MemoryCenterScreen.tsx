"use client";

import React, { useState } from "react";
import { useOSState, MemoryLog } from "@/context/AppContext";
import { Brain, Search, Plus, ShieldCheck, Heart, AlertTriangle } from "lucide-react";

export default function MemoryCenterScreen() {
  const { memoryCenter, setMemoryCenter, addAiLog } = useOSState();
  const [selectedLogId, setSelectedLogId] = useState(memoryCenter[0]?.id || "");
  const [query, setQuery] = useState("");

  const activeLog = memoryCenter.find((m) => m.id === selectedLogId) || memoryCenter[0];

  const handleCreateMemory = () => {
    const newLog: MemoryLog = {
      id: `mem-${Date.now()}`,
      topic: "Unoptimized Parallel GPU Flight Batches",
      solution: "Implemented batch queue pooling with dynamic scheduling matrices.",
      errorMade: "Direct unqueued concurrent memory threads allocation.",
      lessonLearned: "Always maintain single-pipeline thread pools for hardware-bound flight control inferences.",
      timestamp: "Aug 01, 2026",
    };
    setMemoryCenter((prev) => [newLog, ...prev]);
    setSelectedLogId(newLog.id);
    addAiLog(`Memory Center: Logged new learning experience: "${newLog.topic}".`);
  };

  const filteredLogs = memoryCenter.filter(
    (m) =>
      m.topic.toLowerCase().includes(query.toLowerCase()) ||
      m.lessonLearned.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white glow-text-purple">
            MEMORY CENTER
          </h2>
          <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">
            User Experience Registry, Decision History & Past Fallibility Log
          </p>
        </div>
        <button
          onClick={handleCreateMemory}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-1.5 hover:from-purple-500 transition-all shadow-[0_0_12px_rgba(139,92,246,0.3)]"
        >
          <Plus className="w-4 h-4" /> Log Experience
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT COLUMN: Search & Experience list */}
        <div className="lg:col-span-1 space-y-4">
          <div className="glass-panel p-4 border-white/5 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-purple-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search past logs..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full glass-input pl-9 bg-white/5 border-white/5 text-xs"
              />
            </div>

            <div className="space-y-1.5 max-h-[350px] overflow-y-auto pr-1">
              {filteredLogs.map((log) => {
                const isSelected = log.id === selectedLogId;
                return (
                  <button
                    key={log.id}
                    onClick={() => setSelectedLogId(log.id)}
                    className={`w-full p-3 rounded-lg text-left border space-y-1 transition-all ${
                      isSelected
                        ? "bg-purple-950/20 border-purple-500 text-white"
                        : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    <div className="font-bold text-xs text-gray-200 truncate">
                      {log.topic}
                    </div>
                    <div className="flex justify-between items-center text-[9px] text-gray-500 font-mono uppercase">
                      <span>{log.timestamp}</span>
                      <span className="text-purple-400">View logs</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* MIDDLE & RIGHT: Content display (Solution, error, lessons) */}
        <div className="lg:col-span-2 space-y-6">
          {activeLog ? (
            <div className="space-y-6">

              {/* Core Details */}
              <div className="glass-panel p-6 border-white/5 space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-widest">
                      Decision Log: {activeLog.id}
                    </span>
                    <h3 className="text-xl font-bold text-white">
                      {activeLog.topic}
                    </h3>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">
                    {activeLog.timestamp}
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Error made */}
                  <div className="p-4 rounded-xl bg-red-950/10 border border-red-500/10 text-xs text-gray-300 space-y-1.5">
                    <div className="font-bold text-red-400 font-mono uppercase text-[10px] flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Error Logged:
                    </div>
                    <p>{activeLog.errorMade}</p>
                  </div>

                  {/* Solution */}
                  <div className="p-4 rounded-xl bg-cyan-950/10 border border-cyan-500/10 text-xs text-gray-300 space-y-1.5">
                    <div className="font-bold text-cyan-400 font-mono uppercase text-[10px] flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Actionable Solution:
                    </div>
                    <p>{activeLog.solution}</p>
                  </div>

                  {/* Lesson */}
                  <div className="p-4 rounded-xl bg-purple-950/10 border border-purple-500/15 text-xs text-gray-300 space-y-1.5">
                    <div className="font-bold text-purple-400 font-mono uppercase text-[10px] flex items-center gap-1">
                      <Brain className="w-3.5 h-3.5 text-purple-400 animate-pulse" /> Strategic Lesson Learned:
                    </div>
                    <p>{activeLog.lessonLearned}</p>
                  </div>
                </div>
              </div>

              {/* Preference Log summary */}
              <div className="glass-panel-purple p-6 space-y-3">
                <h4 className="text-xs font-mono uppercase text-purple-400 tracking-wider flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-purple-400 animate-pulse" /> Personal Cognitive Preferences
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Based on your past decision history, AI has compiled your primary focus profile. You exhibit high concentration efficiency during mornings (09:00 - 13:00) with a preference for technical deep work, while afternoons operate optimally on coordination tasks.
                </p>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-12 text-center text-sm text-gray-500 font-mono uppercase">
              No experiential logs logged in current workspace.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
