"use client";

import React, { useState } from "react";
import { useOSState } from "@/context/AppContext";
import { Zap, Brain, Smile, Activity, ChevronRight, Play, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";

export default function CommandCenterScreen() {
  const { userStats, setUserStats, tasks, projects, aiLog, addAiLog } = useOSState();
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);

  // Filter tasks based on priority categories
  const getTasksByPriority = (prio: "Critical" | "High Impact" | "Maintenance" | "Ignore") => {
    return tasks.filter((t) => t.priority === prio);
  };

  const handleStatAdjust = (type: "energy" | "concentration", value: number) => {
    setUserStats((prev) => ({
      ...prev,
      [type]: Math.max(10, Math.min(100, prev[type] + value)),
    }));
    addAiLog(`User stats calibration: adjusted ${type} by ${value > 0 ? "+" : ""}${value}%`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-white glow-text-purple">
          COMMAND CENTER
        </h2>
        <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">
          Personal Operating System Central Console
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: Current State Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-6 border-white/5 space-y-5">
            <h3 className="text-sm font-mono uppercase text-gray-300 tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-400" /> Current State
            </h3>

            {/* Energy level widget */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="flex items-center gap-1 text-orange-400">
                  <Zap className="w-3.5 h-3.5" /> Energy Meter
                </span>
                <span className="text-white font-bold">{userStats.energy}%</span>
              </div>
              <div className="w-full bg-white/5 h-2.5 rounded-full p-0.5 border border-white/5">
                <div
                  className="bg-gradient-to-r from-orange-600 to-amber-400 h-full rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(249,115,22,0.3)]"
                  style={{ width: `${userStats.energy}%` }}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => handleStatAdjust("energy", -10)}
                  className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] hover:bg-white/10"
                >
                  -10
                </button>
                <button
                  onClick={() => handleStatAdjust("energy", 10)}
                  className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] hover:bg-white/10"
                >
                  +10
                </button>
              </div>
            </div>

            {/* Concentration level widget */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="flex items-center gap-1 text-cyan-400">
                  <Brain className="w-3.5 h-3.5" /> Focus Level
                </span>
                <span className="text-white font-bold">{userStats.concentration}%</span>
              </div>
              <div className="w-full bg-white/5 h-2.5 rounded-full p-0.5 border border-white/5">
                <div
                  className="bg-gradient-to-r from-cyan-600 to-indigo-400 h-full rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                  style={{ width: `${userStats.concentration}%` }}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => handleStatAdjust("concentration", -10)}
                  className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] hover:bg-white/10"
                >
                  -10
                </button>
                <button
                  onClick={() => handleStatAdjust("concentration", 10)}
                  className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] hover:bg-white/10"
                >
                  +10
                </button>
              </div>
            </div>

            {/* Mood / Core State Status */}
            <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smile className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="text-[10px] text-gray-400 font-mono">NEURAL MODE</div>
                  <div className="text-sm font-bold text-white">{userStats.mood}</div>
                </div>
              </div>
              <select
                value={userStats.mood}
                onChange={(e) => setUserStats((prev) => ({ ...prev, mood: e.target.value }))}
                className="bg-black/60 border border-white/10 text-xs rounded px-2 py-1 text-white outline-none"
              >
                <option value="Supercharged">Supercharged</option>
                <option value="Flow State">Flow State</option>
                <option value="Calm & Analytical">Calm & Analytical</option>
                <option value="Exhausted">Exhausted</option>
              </select>
            </div>
          </div>

          {/* Connected Projects Overview */}
          <div className="glass-panel p-6 border-white/5 space-y-4">
            <h3 className="text-sm font-mono uppercase text-gray-300 tracking-wider">
              Active Universes
            </h3>
            <div className="space-y-3">
              {projects.map((p) => {
                const projTasks = tasks.filter((t) => t.projectId === p.id);
                const doneCount = projTasks.filter((t) => t.completed).length;
                const ratio = projTasks.length > 0 ? (doneCount / projTasks.length) * 100 : 0;
                return (
                  <div key={p.id} className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all">
                    <div className="flex justify-between items-center">
                      <div className="font-bold text-xs text-white">{p.title}</div>
                      <span className="text-[10px] text-purple-400 font-mono">{p.timeline}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2 text-[10px] text-gray-400">
                      <span>Tasks: {doneCount}/{projTasks.length}</span>
                      <span>{Math.round(ratio)}% complete</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* MIDDLE & RIGHT COLUMNS: AI Briefing and Priority Engine */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Briefing Module */}
          <div className="glass-panel-purple p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-mono uppercase text-purple-400 tracking-wider flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-400 animate-pulse" /> AI Daily Briefing
              </h3>
              <span className="text-[10px] text-gray-500 font-mono">CALIBRATED TODAY</span>
            </div>

            <div className="space-y-3 text-sm text-gray-300">
              <p className="font-sans leading-relaxed">
                "Good morning. Today's main focus is to <span className="text-purple-300 font-semibold underline">Optimize YOLO TensorRT execution layers</span> for <span className="text-cyan-300 font-semibold">DriverPilot AI</span>.
              </p>
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-xs text-gray-400 space-y-2">
                <div className="font-bold text-gray-200 flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-yellow-400" /> Why this matters:
                </div>
                <p>
                  Your physical flight controller is restricted to 18 FPS due to unquantized FP32 tensor configurations. By converting model weights to FP16, you unlock sub-millisecond physical decision loops which completely avoids autonomous drift failures.
                </p>
              </div>

              {/* Action plan checklist */}
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase text-purple-300">Today's Micro-Directives:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2 p-2 rounded bg-white/5 border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span>Run YOLO FP16 Quantization tests</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded bg-white/5 border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span>Integrate local CRDT db keys</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Priority Engine Widget */}
          <div className="glass-panel p-6 border-white/5 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-mono uppercase text-gray-300 tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" /> Priority Engine
              </h3>
              <span className="text-[10px] text-gray-500 font-mono">DETERMINED BY AI PM</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: "Critical", icon: "🔥", color: "border-red-500/30 text-red-400 bg-red-950/10" },
                { name: "High Impact", icon: "⚡", color: "border-orange-500/30 text-orange-400 bg-orange-950/10" },
                { name: "Maintenance", icon: "📌", color: "border-cyan-500/30 text-cyan-400 bg-cyan-950/10" },
                { name: "Ignore", icon: "💤", color: "border-gray-500/30 text-gray-400 bg-gray-950/10" },
              ].map((prio) => (
                <button
                  key={prio.name}
                  onClick={() => setSelectedPriority(selectedPriority === prio.name ? null : prio.name)}
                  className={`p-3 rounded-xl border text-left transition-all ${prio.color} ${
                    selectedPriority === prio.name
                      ? "ring-2 ring-purple-500 ring-offset-2 ring-offset-black scale-105 shadow-xl"
                      : "opacity-80 hover:opacity-100 hover:scale-102"
                  }`}
                >
                  <div className="text-lg mb-1">{prio.icon}</div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider">{prio.name}</div>
                  <div className="text-[10px] text-gray-500 font-mono mt-1">
                    {getTasksByPriority(prio.name as any).length} Action Tasks
                  </div>
                </button>
              ))}
            </div>

            {/* Filtered priority task results */}
            {selectedPriority && (
              <div className="p-4 rounded-xl bg-black/60 border border-white/5 space-y-3 animate-slide-down">
                <div className="text-xs font-mono uppercase text-purple-400 font-bold flex justify-between">
                  <span>Filtered Category: {selectedPriority}</span>
                  <button onClick={() => setSelectedPriority(null)} className="text-gray-500 hover:text-white">Clear</button>
                </div>
                <div className="space-y-2">
                  {getTasksByPriority(selectedPriority as any).length === 0 ? (
                    <p className="text-xs text-gray-500 font-mono">No actions scheduled in this priority level.</p>
                  ) : (
                    getTasksByPriority(selectedPriority as any).map((task) => (
                      <div key={task.id} className="flex justify-between items-center p-2 rounded bg-white/5 text-xs">
                        <span className="font-semibold text-gray-300">{task.title}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-500 font-mono">{task.duration}</span>
                          <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400 text-[10px]">
                            {task.energyCost} Energy
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
