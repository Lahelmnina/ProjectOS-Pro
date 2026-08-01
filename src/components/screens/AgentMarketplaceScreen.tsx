"use client";

import React from "react";
import { useOSState, AIAgent } from "@/context/AppContext";
import { Bot, CheckCircle2, XCircle, ShieldCheck, Sparkles } from "lucide-react";

export default function AgentMarketplaceScreen() {
  const { agents, setAgents, addAiLog } = useOSState();

  const toggleAgentActive = (agentId: string) => {
    setAgents((prev) =>
      prev.map((ag) => {
        if (ag.id === agentId) {
          const nextState = !ag.active;
          addAiLog(`Agent Marketplace: Agent "${ag.name}" is now ${nextState ? "ACTIVATED" : "DEACTIVATED"}.`);
          return { ...ag, active: nextState };
        }
        return ag;
      })
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-white glow-text-purple">
          AI AGENT MARKETPLACE
        </h2>
        <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">
          Instantiate and Coordinate Specialized Autonomous Cognitive Workers
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((ag) => {
          return (
            <div
              key={ag.id}
              className={`glass-panel p-6 border-white/5 space-y-4 flex flex-col justify-between transition-all ${
                ag.active ? "border-purple-500/30 bg-purple-950/5" : ""
              }`}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-900/30 border border-purple-500/20 flex items-center justify-center text-lg shadow-[0_0_10px_rgba(139,92,246,0.15)]">
                      {ag.avatar}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                        {ag.name}
                      </h3>
                      <div className="text-[10px] text-purple-400 font-mono uppercase font-semibold">
                        {ag.role}
                      </div>
                    </div>
                  </div>

                  {/* Status badge */}
                  <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded ${
                    ag.active ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-white/5 text-gray-500"
                  }`}>
                    {ag.active ? "ACTIVE" : "STANDBY"}
                  </span>
                </div>

                <p className="text-xs text-gray-400 leading-normal font-sans">
                  {ag.description}
                </p>

                {/* System instructions prompt snippet */}
                <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-[10px] font-mono text-gray-500">
                  <span className="text-gray-400 font-bold">SYSTEM CORE:</span> "{ag.systemPrompt}"
                </div>
              </div>

              {/* Activation action */}
              <button
                onClick={() => toggleAgentActive(ag.id)}
                className={`w-full py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all border ${
                  ag.active
                    ? "bg-red-950/20 border-red-500/30 text-red-400 hover:bg-red-950/40"
                    : "bg-purple-600 border-purple-600 text-white hover:bg-purple-500 shadow-[0_0_12px_rgba(139,92,246,0.25)]"
                }`}
              >
                {ag.active ? "DEACTIVATE WORKER" : "LAUNCH SPECIALIST"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
