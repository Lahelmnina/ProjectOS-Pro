"use client";

import React, { useState } from "react";
import { useOSState } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
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
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-black tracking-tight text-black dark:text-white glow-text-purple">
          COMMAND CENTER
        </h2>
        <p className="text-[10px] text-gray-400 font-mono uppercase tracking-widest font-bold">
          Personal Operating System Central Console
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: Current State Stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-6 space-y-6">
            <h3 className="text-xs font-mono uppercase text-gray-500 dark:text-gray-300 tracking-widest flex items-center gap-2 font-bold">
              <Activity className="w-4 h-4 accent-text" /> Current State
            </h3>

            {/* Energy level widget */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-mono">
                <span className="flex items-center gap-1.5 text-orange-500 font-bold">
                  <Zap className="w-4 h-4" /> Energy Meter
                </span>
                <span className="text-black dark:text-white font-extrabold">{userStats.energy}%</span>
              </div>
              <div className="w-full bg-black/10 dark:bg-white/5 h-3 rounded-full p-0.5 border border-black/5 dark:border-white/5">
                <motion.div
                  className="bg-gradient-to-r from-orange-600 to-amber-400 h-full rounded-full shadow-[0_0_12px_rgba(249,115,22,0.4)]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${userStats.energy}%` }}
                  transition={{ type: "spring", stiffness: 80, damping: 15 }}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleStatAdjust("energy", -10)}
                  className="px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-[10px] font-mono font-bold hover:bg-black/10 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300"
                >
                  -10
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleStatAdjust("energy", 10)}
                  className="px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-[10px] font-mono font-bold hover:bg-black/10 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300"
                >
                  +10
                </motion.button>
              </div>
            </div>

            {/* Concentration level widget */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-mono">
                <span className="flex items-center gap-1.5 text-cyan-500 font-bold">
                  <Brain className="w-4 h-4" /> Focus Level
                </span>
                <span className="text-black dark:text-white font-extrabold">{userStats.concentration}%</span>
              </div>
              <div className="w-full bg-black/10 dark:bg-white/5 h-3 rounded-full p-0.5 border border-black/5 dark:border-white/5">
                <motion.div
                  className="bg-gradient-to-r from-cyan-600 to-indigo-400 h-full rounded-full shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${userStats.concentration}%` }}
                  transition={{ type: "spring", stiffness: 80, damping: 15 }}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleStatAdjust("concentration", -10)}
                  className="px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-[10px] font-mono font-bold hover:bg-black/10 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300"
                >
                  -10
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleStatAdjust("concentration", 10)}
                  className="px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-[10px] font-mono font-bold hover:bg-black/10 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300"
                >
                  +10
                </motion.button>
              </div>
            </div>

            {/* Mood / Core State Status */}
            <div className="p-4 rounded-2xl bg-purple-950/10 dark:bg-purple-950/20 border border-purple-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Smile className="w-5 h-5 accent-text" />
                <div>
                  <div className="text-[9px] text-gray-400 font-mono font-bold uppercase tracking-wider">NEURAL MODE</div>
                  <div className="text-sm font-bold text-black dark:text-white">{userStats.mood}</div>
                </div>
              </div>
              <select
                value={userStats.mood}
                onChange={(e) => setUserStats((prev) => ({ ...prev, mood: e.target.value }))}
                className="bg-white/50 dark:bg-black/60 border border-black/10 dark:border-white/10 text-xs rounded-xl px-2.5 py-1.5 text-black dark:text-white outline-none font-semibold cursor-pointer"
              >
                <option value="Supercharged">Supercharged</option>
                <option value="Flow State">Flow State</option>
                <option value="Calm & Analytical">Calm & Analytical</option>
                <option value="Exhausted">Exhausted</option>
              </select>
            </div>
          </div>

          {/* Connected Projects Overview */}
          <div className="glass-panel p-6 space-y-4">
            <h3 className="text-xs font-mono uppercase text-gray-500 dark:text-gray-300 tracking-widest font-bold">
              Active Universes
            </h3>
            <div className="space-y-3">
              {projects.map((p) => {
                const projTasks = tasks.filter((t) => t.projectId === p.id);
                const doneCount = projTasks.filter((t) => t.completed).length;
                const ratio = projTasks.length > 0 ? (doneCount / projTasks.length) * 100 : 0;
                return (
                  <motion.div
                    key={p.id}
                    whileHover={{ scale: 1.01, x: 2 }}
                    className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-purple-500/30 transition-all cursor-pointer"
                  >
                    <div className="flex justify-between items-center">
                      <div className="font-extrabold text-xs text-black dark:text-white">{p.title}</div>
                      <span className="text-[10px] accent-text font-mono font-bold">{p.timeline}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2.5 text-[10px] text-gray-500 font-mono font-bold">
                      <span>Tasks: {doneCount}/{projTasks.length}</span>
                      <span>{Math.round(ratio)}% complete</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* MIDDLE & RIGHT COLUMNS: AI Briefing and Priority Engine */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Briefing Module */}
          <div className="glass-panel-accent p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-mono uppercase accent-text tracking-widest flex items-center gap-2 font-bold">
                <Brain className="w-5 h-5 accent-text animate-pulse" /> AI Daily Briefing
              </h3>
              <span className="text-[10px] text-gray-400 font-mono font-bold">CALIBRATED TODAY</span>
            </div>

            <div className="space-y-3.5 text-sm text-gray-800 dark:text-gray-300">
              <p className="font-sans leading-relaxed text-sm font-semibold text-black dark:text-white">
                "Good morning. Today's main focus is to <span className="accent-text underline underline-offset-4 decoration-2">Optimize YOLO TensorRT execution layers</span> for <span className="text-cyan-500 dark:text-cyan-300 font-extrabold">DriverPilot AI</span>.
              </p>
              <div className="p-4.5 rounded-2xl bg-black/5 dark:bg-black/40 border border-black/5 dark:border-white/5 text-xs text-gray-600 dark:text-gray-400 space-y-2 leading-relaxed">
                <div className="font-extrabold text-black dark:text-gray-200 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-yellow-500" /> Why this matters:
                </div>
                <p>
                  Your physical flight controller is restricted to 18 FPS due to unquantized FP32 tensor configurations. By converting model weights to FP16, you unlock sub-millisecond physical decision loops which completely avoids autonomous drift failures.
                </p>
              </div>

              {/* Action plan checklist */}
              <div className="space-y-2.5 pt-1">
                <div className="text-[10px] font-mono font-extrabold uppercase accent-text tracking-wider">Today's Micro-Directives:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
                  <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-black dark:text-white">
                    <CheckCircle2 className="w-4 h-4 accent-text flex-shrink-0" />
                    <span className="font-semibold">Run YOLO FP16 Quantization tests</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-black dark:text-white">
                    <CheckCircle2 className="w-4 h-4 accent-text flex-shrink-0" />
                    <span className="font-semibold">Integrate local CRDT db keys</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Priority Engine Widget */}
          <div className="glass-panel p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-mono uppercase text-gray-500 dark:text-gray-300 tracking-widest flex items-center gap-2 font-bold">
                <Zap className="w-4 h-4 text-cyan-500" /> Priority Engine
              </h3>
              <span className="text-[10px] text-gray-400 font-mono font-bold">DETERMINED BY AI PM</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
              {[
                { name: "Critical", icon: "🔥", color: "border-red-500/20 text-red-500 bg-red-950/5 dark:bg-red-950/10 hover:border-red-500/40" },
                { name: "High Impact", icon: "⚡", color: "border-orange-500/20 text-orange-500 bg-orange-950/5 dark:bg-orange-950/10 hover:border-orange-500/40" },
                { name: "Maintenance", icon: "📌", color: "border-cyan-500/20 text-cyan-500 bg-cyan-950/5 dark:bg-cyan-950/10 hover:border-cyan-500/40" },
                { name: "Ignore", icon: "💤", color: "border-gray-500/20 text-gray-500 bg-gray-950/5 dark:bg-gray-950/10 hover:border-gray-500/40" },
              ].map((prio) => (
                <motion.button
                  key={prio.name}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedPriority(selectedPriority === prio.name ? null : prio.name)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${prio.color} ${
                    selectedPriority === prio.name
                      ? "ring-2 ring-purple-500 ring-offset-2 ring-offset-white dark:ring-offset-black scale-102 shadow-lg"
                      : ""
                  }`}
                >
                  <div className="text-2xl mb-1">{prio.icon}</div>
                  <div className="text-xs font-mono font-extrabold uppercase tracking-wider">{prio.name}</div>
                  <div className="text-[10px] text-gray-400 font-mono mt-1 font-bold">
                    {getTasksByPriority(prio.name as any).length} Action Tasks
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Filtered priority task results */}
            <AnimatePresence>
              {selectedPriority && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 rounded-2xl bg-black/10 dark:bg-black/60 border border-black/5 dark:border-white/5 space-y-3 overflow-hidden"
                >
                  <div className="text-[10px] font-mono uppercase accent-text font-extrabold flex justify-between items-center">
                    <span>Filtered Category: {selectedPriority}</span>
                    <button onClick={() => setSelectedPriority(null)} className="text-gray-400 hover:text-black dark:hover:text-white uppercase font-bold text-[9px]">Clear</button>
                  </div>
                  <div className="space-y-2">
                    {getTasksByPriority(selectedPriority as any).length === 0 ? (
                      <p className="text-xs text-gray-400 font-mono font-bold py-2">No actions scheduled in this priority level.</p>
                    ) : (
                      getTasksByPriority(selectedPriority as any).map((task) => (
                        <div key={task.id} className="flex justify-between items-center p-3 rounded-xl bg-white/40 dark:bg-white/5 text-xs border border-black/5 dark:border-white/5 text-black dark:text-white">
                          <span className="font-bold text-black dark:text-gray-200">{task.title}</span>
                          <div className="flex items-center gap-2.5">
                            <span className="text-[10px] text-gray-400 font-mono font-bold">{task.duration}</span>
                            <span className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-300 text-[9px] font-mono uppercase font-bold">
                              {task.energyCost} Energy
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
