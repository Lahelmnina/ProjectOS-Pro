"use client";

import React, { useState } from "react";
import { useOSState, Project } from "@/context/AppContext";
import { ArrowLeft, Target, Award, Calendar, Compass, Bot, Sparkles, Send, Users, ShieldAlert } from "lucide-react";

interface ProjectDetailScreenProps {
  projectId: string;
  onBack: () => void;
}

export default function ProjectDetailScreen({ projectId, onBack }: ProjectDetailScreenProps) {
  const { projects, tasks, addAiLog } = useOSState();
  const project = projects.find((p) => p.id === projectId) || projects[0];

  const [aiChat, setAiChat] = useState<string[]>([]);
  const [inputText, setInputText] = useState("");
  const [loadingAi, setLoadingAi] = useState(false);

  // Filter tasks belonging to this project
  const projectTasks = tasks.filter((t) => t.projectId === project.id);

  const triggerAIPredict = () => {
    setLoadingAi(true);
    addAiLog(`AI assistant requested to analyze bottlenecks for ${project.title}.`);

    setTimeout(() => {
      setAiChat((prev) => [
        ...prev,
        `🤖 [AI PROJECT MANAGER]: Analysis complete for ${project.title}.\nStagnation detected: Fleet API integration is currently blocked by local-first DB WAL syncing limitations.\n\nRECOMMENDED SPRINT RESCUE STRATEGY:\n1. Configure localized conflict-free vector timestamps.\n2. Authorize 48h focus block to optimize YOLO TensorRT quantization levels.\n3. Re-allocate 15% budget toward secure edge clusters.`,
      ]);
      setLoadingAi(false);
    }, 1200);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = `👤: ${inputText}`;
    setAiChat((prev) => [...prev, userMsg]);
    setInputText("");
    setLoadingAi(true);

    setTimeout(() => {
      setAiChat((prev) => [
        ...prev,
        `🤖 [AI COGNITIVE SENTRY]: I've evaluated your request regarding "${inputText}". Running dynamic scenario simulations. Based on lessons logged in Memory Hub, setting up an isolated development container with quantitative precision parameters is the fastest path forward.`,
      ]);
      setLoadingAi(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Upper header */}
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-white/5 border border-white/5 hover:bg-white/10 text-xs font-mono font-bold tracking-widest text-gray-300 rounded-lg flex items-center gap-1.5 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> BACK TO UNIVERSES
        </button>

        <span className="text-xs text-gray-400 font-mono">
          UNIVERSE IDENTITY: <span className="text-purple-400">{project.id}</span>
        </span>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT COLUMN: Project Details (Goal, Vision, Team, Budget) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-6 border-white/5 space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider">
                ACTIVE FOCUS
              </span>
              <h2 className="text-2xl font-bold text-white">{project.title}</h2>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">{project.description}</p>
            </div>

            <div className="border-t border-white/5 pt-4 space-y-3.5 text-xs">
              <div className="space-y-1">
                <div className="text-gray-400 font-mono uppercase text-[10px] flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-purple-400" /> Ultimate Vision
                </div>
                <div className="text-white font-semibold leading-normal">{project.vision}</div>
              </div>

              <div className="space-y-1">
                <div className="text-gray-400 font-mono uppercase text-[10px] flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-cyan-400" /> Key Milestone Goal
                </div>
                <div className="text-white font-semibold leading-normal">{project.goal}</div>
              </div>
            </div>
          </div>

          {/* Budget & Team stats */}
          <div className="glass-panel p-6 border-white/5 space-y-4">
            <h3 className="text-xs font-mono uppercase text-gray-300 tracking-wider flex items-center gap-1.5">
              <Users className="w-4 h-4 text-purple-400" /> Specialists & Resources
            </h3>

            {/* Team */}
            <div className="space-y-2">
              <div className="text-[10px] text-gray-500 font-mono uppercase">Assigned Humans</div>
              <div className="flex flex-col gap-2">
                {project.team.map((m, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded bg-white/5 text-xs">
                    <span className="text-white font-bold">{m.name}</span>
                    <span className="text-[10px] text-purple-400 font-mono uppercase">{m.role}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources list */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <div className="text-[10px] text-gray-500 font-mono uppercase">Reference assets</div>
              <div className="flex flex-wrap gap-1.5">
                {project.resources.map((res, i) => (
                  <span key={i} className="px-2 py-1 rounded bg-black/40 border border-white/5 text-[10px] text-cyan-300">
                    {res}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE & RIGHT: Roadmap & AI Assistant */}
        <div className="lg:col-span-2 space-y-6">

          {/* Timeline & Roadmap */}
          <div className="glass-panel p-6 border-white/5 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-mono uppercase text-gray-300 tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-cyan-400" /> Strategic Roadmap & Milestones
              </h3>
              <span className="text-[10px] text-cyan-400 font-mono font-bold uppercase">{project.timeline}</span>
            </div>

            {/* Milestones checklists */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-white/5 pb-4">
              {project.milestones.map((m, i) => (
                <div key={i} className="p-3 rounded-lg bg-black/40 border border-white/5 flex justify-between items-center">
                  <div>
                    <div className="text-xs font-bold text-white">{m.name}</div>
                    <div className="text-[10px] text-gray-500 font-mono">{m.date}</div>
                  </div>
                  <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded ${
                    m.status === "Completed" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  }`}>
                    {m.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Roadmap Phases */}
            <div className="relative border-l-2 border-white/5 pl-4 ml-2 space-y-5">
              {project.roadmap.map((phase, i) => (
                <div key={i} className="relative">
                  {/* Glowing Node Dot */}
                  <div className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-purple-500 border-2 border-black shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
                        {phase.phase}
                      </h4>
                      <span className="text-[10px] text-gray-500 font-mono">{phase.date}</span>
                    </div>
                    <p className="text-xs text-gray-300 leading-normal">{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Project Universe Assistant */}
          <div className="glass-panel-purple p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-mono uppercase text-purple-400 tracking-wider flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-purple-400 animate-pulse" /> AI Assistant Co-pilot
              </h3>
              <button
                onClick={triggerAIPredict}
                className="px-3 py-1 bg-purple-900/40 border border-purple-500/30 hover:bg-purple-900/60 rounded-full text-[10px] font-mono font-bold text-white flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin-slow" /> STAGNATION DIAGNOSTIC
              </button>
            </div>

            {/* Mini Chat dialog log */}
            <div className="bg-black/60 border border-white/5 rounded-xl p-4 h-48 overflow-y-auto space-y-3 font-mono text-xs text-gray-300">
              <div className="text-cyan-400 text-[10px] font-bold uppercase pb-1 border-b border-white/5">
                SECURE AGENT FEEDBACK MATRIX
              </div>

              {aiChat.length === 0 ? (
                <p className="text-gray-500 text-center py-10">
                  Select "STAGNATION DIAGNOSTIC" or type a directive to coordinate with your agent.
                </p>
              ) : (
                aiChat.map((msg, i) => (
                  <div key={i} className="whitespace-pre-wrap leading-relaxed border-l-2 border-purple-500/20 pl-3">
                    {msg}
                  </div>
                ))
              )}

              {loadingAi && (
                <div className="flex items-center gap-1 text-purple-400 animate-pulse text-[10px]">
                  <Bot className="w-3.5 h-3.5 animate-bounce" />
                  <span>Agent simulating scenario results...</span>
                </div>
              )}
            </div>

            {/* Chat inputs */}
            <form onSubmit={handleSendChat} className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Instruct your Universe PM sub-agent (e.g., 'Optimize task deadlines')..."
                className="flex-grow glass-input bg-white/5 border-white/5 text-xs"
              />
              <button
                type="submit"
                className="p-3 bg-purple-600 rounded-lg hover:bg-purple-500 text-white flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
