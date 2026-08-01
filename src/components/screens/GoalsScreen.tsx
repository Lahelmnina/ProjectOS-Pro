"use client";

import React, { useState } from "react";
import { useOSState } from "@/context/AppContext";
import { Target, Compass, Layers, CheckSquare, Sparkles, ChevronRight } from "lucide-react";

export default function GoalsScreen() {
  const { projects, tasks, addAiLog } = useOSState();

  const [vision] = useState("Build a sustainable software business that automates everyday intelligence.");
  const [strategicGoals] = useState([
    { id: "g-1", title: "Launch DriverPilot AI MVP Flight Controller", timeline: "Q3 2026", progress: 65 },
    { id: "g-2", title: "Optimize Multi-Cloud Geo Distributed Database Latency", timeline: "Q4 2026", progress: 40 },
  ]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-white glow-text-purple">
          STRATEGIC GOALS OS
        </h2>
        <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">
          Cascade Architecture: Vision → Goals → Projects → Tasks
        </p>
      </div>

      {/* 1. Vision Layer Card */}
      <div className="glass-panel-purple p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-white/5 pb-2">
          <h3 className="text-xs font-mono uppercase text-purple-400 tracking-wider flex items-center gap-1.5">
            <Compass className="w-5 h-5 text-purple-400 animate-pulse" /> Level 1: Ultimate Vision
          </h3>
          <span className="text-[10px] text-gray-500 font-mono">NORTH STAR</span>
        </div>
        <p className="text-lg font-bold tracking-tight text-white leading-relaxed">
          "{vision}"
        </p>
      </div>

      {/* 2. Cascading Chain visual boards */}
      <div className="space-y-6">
        <h3 className="text-sm font-mono uppercase text-gray-300 tracking-wider">
          Level 2 & 3: Active Goals & Projects Links
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {strategicGoals.map((goal) => {
            // Find corresponding project
            const projectObj = projects.find((p) => p.title.includes(goal.title.split(" ")[1]) || p.id === `proj-${goal.id.split("-")[1]}`);
            const projTasks = projectObj ? tasks.filter((t) => t.projectId === projectObj.id) : [];

            return (
              <div key={goal.id} className="glass-panel p-6 border-white/5 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                        Strategic Goal ({goal.timeline})
                      </span>
                      <h4 className="text-base font-bold text-white leading-snug">
                        {goal.title}
                      </h4>
                    </div>
                    {/* Goal Progress Dial Indicator */}
                    <div className="w-10 h-10 rounded-full border-2 border-purple-500/20 flex items-center justify-center text-[10px] font-mono font-bold text-purple-300 bg-purple-950/10">
                      {goal.progress}%
                    </div>
                  </div>

                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-purple-500 h-full rounded-full"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>

                {/* Level 3: Connected Project Universe */}
                {projectObj && (
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                      <span className="uppercase text-cyan-300 font-bold">Project Universe link</span>
                      <span>{projectObj.timeline}</span>
                    </div>
                    <div className="text-xs font-bold text-white">{projectObj.title}</div>
                    <p className="text-[11px] text-gray-400 leading-normal">{projectObj.description}</p>

                    {/* Level 4: Immediate Action Tasks */}
                    <div className="space-y-1.5 pt-2 border-t border-white/5">
                      <div className="text-[10px] text-gray-500 font-mono uppercase">Immediate Action steps</div>
                      <div className="space-y-1">
                        {projTasks.slice(0, 2).map((task) => (
                          <div key={task.id} className="flex items-center gap-2 text-[10px] text-gray-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                            <span className="truncate">{task.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
