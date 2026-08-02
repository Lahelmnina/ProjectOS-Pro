"use client";

import React, { useState } from "react";
import { useOSState, Task } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ListTodo, CheckSquare, Square, Bot, Sparkles, Activity, AlertCircle, RefreshCw } from "lucide-react";

export default function TaskManagerScreen() {
  const { tasks, setTasks, projects, addAiLog } = useOSState();
  const [selectedProjectId, setSelectedProjectId] = useState("all");
  const [showCompleted, setShowCompleted] = useState(true);

  const [activeBreakdownTaskId, setActiveBreakdownTaskId] = useState<string | null>(null);

  const toggleTaskComplete = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextState = !t.completed;
          addAiLog(`Task updated: "${t.title}" changed to ${nextState ? "Completed" : "Active"}.`);
          return { ...t, completed: nextState };
        }
        return t;
      })
    );
  };

  const triggerAIBreakdown = (taskId: string) => {
    setActiveBreakdownTaskId(taskId === activeBreakdownTaskId ? null : taskId);
    addAiLog(`Task Engine 3.0: Generated autonomous micro-steps breakdown for Task ID ${taskId}.`);
  };

  const handleCreateTask = () => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      projectId: projects[0].id,
      title: "New Custom Task Universe Block",
      context: "User generated dynamic work parcel.",
      whyImportant: "Manually registered in Task Engine 3.0.",
      energyCost: "Medium",
      duration: "2 hours",
      priority: "High Impact",
      deadline: "Aug 20, 2026",
      dependencies: [],
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
    addAiLog(`Task Engine 3.0: Inserted "${newTask.title}" successfully.`);
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesProject = selectedProjectId === "all" || t.projectId === selectedProjectId;
    const matchesCompletion = showCompleted ? true : !t.completed;
    return matchesProject && matchesCompletion;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-black dark:text-white glow-text-purple">
            TASK ENGINE 3.0
          </h2>
          <p className="text-[10px] text-gray-400 font-mono uppercase tracking-widest font-bold">
            Algorithmic Focus Backlog & Task Quantizer
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleCreateTask}
          className="px-4 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 rounded-xl text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-1.5 hover:opacity-95 text-white transition-all shadow-[0_4px_15px_rgba(var(--accent-rgb),0.35)]"
        >
          <Plus className="w-4 h-4" /> Inject Task
        </motion.button>
      </div>

      {/* Filters bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
        <div className="flex items-center gap-2.5">
          <span className="text-[10px] text-gray-400 font-mono font-bold uppercase tracking-wider">Universe:</span>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="bg-white/50 dark:bg-black/60 border border-black/10 dark:border-white/10 text-xs rounded-xl px-2.5 py-1.5 text-black dark:text-white outline-none font-semibold cursor-pointer"
          >
            <option value="all">All Universes</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={showCompleted}
              onChange={(e) => setShowCompleted(e.target.checked)}
              className="accent-purple-500"
            />
            Show Completed Tasks
          </label>
        </div>
      </div>

      {/* Main Lists with Spring Interactions */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredTasks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="glass-panel p-12 text-center text-xs text-gray-400 font-mono uppercase font-bold tracking-widest leading-relaxed flex flex-col items-center justify-center space-y-3"
            >
              <Bot className="w-8 h-8 accent-text animate-pulse" />
              <span>No matching tasks active in current workspace.</span>
              <button
                onClick={handleCreateTask}
                className="text-[9px] font-black underline accent-text mt-2 block"
              >
                Create a task block now
              </button>
            </motion.div>
          ) : (
            filteredTasks.map((task) => {
              const isCritical = task.priority === "Critical";
              const projectObj = projects.find((p) => p.id === task.projectId);

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  key={task.id}
                  className={`glass-panel p-5 space-y-4 ${
                    task.completed ? "opacity-60 bg-black/10 dark:bg-black/20" : ""
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    {/* Title & Checkbox */}
                    <div className="flex items-start gap-3.5 flex-grow">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleTaskComplete(task.id)}
                        className="mt-0.5 accent-text hover:text-cyan-500 transition-colors flex-shrink-0"
                      >
                        {task.completed ? (
                          <CheckSquare className="w-5 h-5 accent-text" />
                        ) : (
                          <Square className="w-5 h-5 text-gray-400" />
                        )}
                      </motion.button>
                      <div className="space-y-1.5 leading-relaxed">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className={`text-sm font-extrabold ${task.completed ? "line-through text-gray-500" : "text-black dark:text-white"}`}>
                            {task.title}
                          </span>
                          {/* Project Badge */}
                          <span className="px-2 py-0.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-[9px] text-cyan-600 dark:text-cyan-300 font-mono font-bold uppercase tracking-wider">
                            {projectObj?.title || "Life OS"}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{task.context}</p>

                        {/* Why Important block */}
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 font-mono italic">
                          <span className="accent-text font-black not-italic">Why:</span> {task.whyImportant}
                        </p>
                      </div>
                    </div>

                    {/* Badges & Actions */}
                    <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
                      {/* Energy Cost Badge */}
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-black uppercase tracking-wider ${
                        task.energyCost === "High" ? "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20" :
                        task.energyCost === "Medium" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20" :
                        "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
                      }`}>
                        {task.energyCost} Energy
                      </span>

                      {/* Priority Badge */}
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-black uppercase tracking-wider ${
                        isCritical ? "bg-purple-900/20 text-purple-600 dark:text-purple-300 border border-purple-500/30" : "bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-gray-500 dark:text-gray-400"
                      }`}>
                        {task.priority}
                      </span>

                      <span className="text-[10px] text-gray-500 font-mono font-bold">{task.duration}</span>

                      {/* AI Breakdown Toggle */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => triggerAIBreakdown(task.id)}
                        className={`p-2 rounded-xl border transition-all ${
                          activeBreakdownTaskId === task.id
                            ? "bg-purple-600 text-white border-purple-500 shadow-[0_0_12px_rgba(139,92,246,0.4)]"
                            : "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 text-purple-600 dark:text-purple-400 hover:bg-black/10 dark:hover:bg-white/10"
                        }`}
                        title="Request AI Breakdown"
                      >
                        <Bot className="w-4 h-4 animate-pulse" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Expanded AI breakdown display */}
                  <AnimatePresence>
                    {activeBreakdownTaskId === task.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-4 rounded-xl bg-purple-950/10 dark:bg-purple-950/10 border border-purple-500/20 text-xs font-mono space-y-3 overflow-hidden leading-relaxed"
                      >
                        <div className="accent-text font-black uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-yellow-500 animate-spin-slow" /> AI Autonomous Breakdown
                        </div>
                        {task.aiBreakdown ? (
                          <ul className="space-y-1.5 text-gray-700 dark:text-gray-300">
                            {task.aiBreakdown.map((step, idx) => (
                              <li key={idx} className="flex items-start gap-2.5">
                                <span className="accent-text font-black">{idx + 1}.</span>
                                <span className="font-semibold">{step}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="text-gray-500 dark:text-gray-400 font-semibold space-y-1.5">
                            <p>No pre-stored steps for this task. Running active scenario parser:</p>
                            <p className="text-cyan-600 dark:text-cyan-400">1. Segment goal into isolated functional code blocks.</p>
                            <p className="text-cyan-600 dark:text-cyan-400">2. Verify constraints against active Memory Center lessons logs.</p>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
