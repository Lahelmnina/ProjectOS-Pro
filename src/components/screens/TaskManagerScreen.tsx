"use client";

import React, { useState } from "react";
import { useOSState, Task } from "@/context/AppContext";
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
    const matchesCompleted = showCompleted || !t.completed;
    return matchesProject && matchesCompleted;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white glow-text-purple">
            TASK ENGINE 3.0
          </h2>
          <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">
            Quantified Action Hub & Cognitive Dependency Solver
          </p>
        </div>
        <button
          onClick={handleCreateTask}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-1.5 hover:from-purple-500 transition-all shadow-[0_0_12px_rgba(139,92,246,0.3)]"
        >
          <Plus className="w-4 h-4" /> Seed Action
        </button>
      </div>

      {/* Control Filters Row */}
      <div className="flex flex-wrap gap-4 items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 text-xs font-mono">
        <div className="flex items-center gap-4">
          <span className="text-gray-400 uppercase font-bold text-[10px]">Filter Universe:</span>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="bg-black/60 border border-white/10 rounded px-2.5 py-1 text-white outline-none"
          >
            <option value="all">ALL UNIVERSES</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-[10px] uppercase font-bold">Show Completed:</span>
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className={`px-3 py-1 rounded transition-colors ${
              showCompleted ? "bg-purple-900/30 border border-purple-500/40 text-purple-300" : "bg-white/5 border border-white/5 text-gray-500"
            }`}
          >
            {showCompleted ? "ON" : "OFF"}
          </button>
        </div>
      </div>

      {/* Main Lists */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="glass-panel p-10 text-center text-sm text-gray-500 font-mono uppercase">
            No matching tasks active in current workspace.
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isCritical = task.priority === "Critical";
            const projectObj = projects.find((p) => p.id === task.projectId);

            return (
              <div
                key={task.id}
                className={`glass-panel p-5 border-white/5 transition-all ${
                  task.completed ? "opacity-60 bg-black/20" : ""
                }`}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  {/* Title & Checkbox */}
                  <div className="flex items-start gap-3.5 flex-grow">
                    <button
                      onClick={() => toggleTaskComplete(task.id)}
                      className="mt-0.5 text-purple-400 hover:text-cyan-400 transition-colors flex-shrink-0"
                    >
                      {task.completed ? (
                        <CheckSquare className="w-5 h-5 text-purple-400" />
                      ) : (
                        <Square className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-sm font-bold ${task.completed ? "line-through text-gray-500" : "text-white"}`}>
                          {task.title}
                        </span>
                        {/* Project Badge */}
                        <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] text-cyan-300 font-mono">
                          {projectObj?.title || "Life OS"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 leading-normal">{task.context}</p>

                      {/* Why Important block */}
                      <p className="text-[10px] text-gray-500 font-mono italic">
                        <span className="text-purple-400 font-bold not-italic">Why:</span> {task.whyImportant}
                      </p>
                    </div>
                  </div>

                  {/* Badges & Actions */}
                  <div className="flex flex-wrap items-center gap-2.5 flex-shrink-0">
                    {/* Energy Cost Badge */}
                    <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase ${
                      task.energyCost === "High" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                      task.energyCost === "Medium" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                      "bg-green-500/10 text-green-400 border border-green-500/20"
                    }`}>
                      {task.energyCost} Energy
                    </span>

                    {/* Priority Badge */}
                    <span className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase ${
                      isCritical ? "bg-purple-900/40 text-purple-300 border border-purple-500/40" : "bg-white/5 text-gray-400"
                    }`}>
                      {task.priority}
                    </span>

                    <span className="text-[11px] text-gray-500 font-mono">{task.duration}</span>

                    {/* AI Breakdown Toggle */}
                    <button
                      onClick={() => triggerAIBreakdown(task.id)}
                      className={`p-2 rounded-lg border transition-all ${
                        activeBreakdownTaskId === task.id
                          ? "bg-purple-500 text-white border-purple-500 shadow-[0_0_12px_rgba(139,92,246,0.4)]"
                          : "bg-white/5 border-white/5 text-purple-400 hover:bg-white/10"
                      }`}
                      title="Request AI Breakdown"
                    >
                      <Bot className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Expanded AI breakdown display */}
                {activeBreakdownTaskId === task.id && (
                  <div className="mt-4 p-4 rounded-xl bg-purple-950/10 border border-purple-500/20 animate-slide-down text-xs font-mono space-y-3">
                    <div className="text-purple-400 font-bold uppercase tracking-widest flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> AI Autonomous Breakdown
                    </div>
                    {task.aiBreakdown ? (
                      <ul className="space-y-1.5 text-gray-300">
                        {task.aiBreakdown.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-purple-400 font-bold">{idx + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-400">
                        No pre-stored steps for this task. Running active scenario parser:
                        <br />
                        <span className="text-cyan-300">1. Segment goal into isolated functional code blocks.</span>
                        <br />
                        <span className="text-cyan-300">2. Verify constraints against active Memory Center lessons logs.</span>
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
