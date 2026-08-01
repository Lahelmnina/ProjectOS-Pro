"use client";

import React from "react";
import { useOSState } from "@/context/AppContext";
import { Plus, Users, Landmark, Target, Layers, ArrowRight } from "lucide-react";

interface ProjectsDashboardScreenProps {
  onSelectProject: (projectId: string) => void;
}

export default function ProjectsDashboardScreen({ onSelectProject }: ProjectsDashboardScreenProps) {
  const { projects, tasks, addAiLog } = useOSState();

  const handleCreateProject = () => {
    addAiLog("Initializing Project Creation dialog. Custom model layout launched.");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white glow-text-purple">
            PROJECT UNIVERSES
          </h2>
          <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">
            Explore and Coordinate Independent Cognitive Hubs
          </p>
        </div>
        <button
          onClick={handleCreateProject}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-1.5 hover:from-purple-500 transition-all shadow-[0_0_12px_rgba(139,92,246,0.3)]"
        >
          <Plus className="w-4 h-4" /> Initialize Universe
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj) => {
          const projTasks = tasks.filter((t) => t.projectId === proj.id);
          const completedTasks = projTasks.filter((t) => t.completed).length;
          const pct = projTasks.length > 0 ? Math.round((completedTasks / projTasks.length) * 100) : 0;
          const budgetPct = proj.budget.allocated > 0 ? Math.round((proj.budget.spent / proj.budget.allocated) * 100) : 0;

          return (
            <div
              key={proj.id}
              className="glass-panel p-6 border-white/5 space-y-5 flex flex-col justify-between group cursor-pointer hover:border-purple-500/40 relative overflow-hidden"
              onClick={() => onSelectProject(proj.id)}
            >
              {/* Outer light sheen glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[10px] text-cyan-400 font-mono uppercase tracking-widest font-bold">
                      {proj.timeline}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {proj.title}
                    </h3>
                  </div>
                  {/* Status Indicator */}
                  <span className="px-2.5 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono uppercase font-semibold">
                    Live
                  </span>
                </div>

                <p className="text-xs text-gray-400 font-sans leading-relaxed">
                  {proj.description}
                </p>
              </div>

              {/* High Tech Diagnostics (Tasks & Budget) */}
              <div className="grid grid-cols-2 gap-4 border-t border-b border-white/5 py-4 my-2 text-xs font-mono">
                {/* Task completion meter */}
                <div className="space-y-1.5">
                  <span className="flex items-center gap-1 text-gray-400">
                    <Layers className="w-3.5 h-3.5 text-purple-400" /> Action Steps
                  </span>
                  <div className="flex justify-between font-bold">
                    <span>{pct}% Done</span>
                    <span className="text-gray-500">{completedTasks}/{projTasks.length}</span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-purple-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                {/* Budget spending meter */}
                <div className="space-y-1.5">
                  <span className="flex items-center gap-1 text-gray-400">
                    <Landmark className="w-3.5 h-3.5 text-cyan-400" /> Capital Pool
                  </span>
                  <div className="flex justify-between font-bold">
                    <span>{budgetPct}% Used</span>
                    <span className="text-gray-500">${proj.budget.spent / 1000}k/${proj.budget.allocated / 1000}k</span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-cyan-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${budgetPct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Team and Select action */}
              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center gap-1.5">
                  <div className="flex -space-x-1.5 overflow-hidden">
                    {proj.team.map((t, idx) => (
                      <div
                        key={idx}
                        title={`${t.name} (${t.role})`}
                        className="w-6 h-6 rounded-full bg-purple-900 border border-black flex items-center justify-center text-[9px] font-mono font-bold text-white"
                      >
                        {t.avatar}
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono uppercase">
                    {proj.team.length} specialists
                  </span>
                </div>

                <div className="text-xs font-mono font-bold text-purple-400 flex items-center gap-1 group-hover:text-cyan-400 transition-colors">
                  DIVE IN <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
