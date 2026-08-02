"use client";

import React from "react";
import { useOSState } from "@/context/AppContext";
import { User, Shield, Target, Award, Brain, Activity } from "lucide-react";

export default function ProfileScreen() {
  const { userStats } = useOSState();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-white glow-text-purple">
          NEURO PROFILE
        </h2>
        <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">
          Cognitive Efficiency Tier, Active Certifications & Bio
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT COLUMN: User basic details */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-6 border-white/5 space-y-4 text-center">

            {/* Holographic style avatar container */}
            <div className="relative w-24 h-24 mx-auto mb-4 flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-purple-500 rounded-full animate-spin-slow" />
              <div className="absolute inset-1.5 border border-cyan-400 rounded-full animate-pulse" />
              <div className="w-16 h-16 rounded-full bg-purple-950/40 border border-purple-500/30 flex items-center justify-center">
                <User className="w-8 h-8 text-purple-400" />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">SaaS Tech Architect</h3>
              <div className="text-[10px] text-purple-400 font-mono uppercase tracking-widest font-semibold">
                Product Architect Tier 5
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              Developing autonomous localized drone autopilots and spatial data networks. Peak focus capacity 92%.
            </p>
          </div>

          {/* Neuro Diagnostics */}
          <div className="glass-panel p-6 border-white/5 space-y-4">
            <h3 className="text-xs font-mono uppercase text-gray-300 tracking-wider">
              Diagnostic Indicators
            </h3>
            <div className="space-y-3.5 text-xs font-mono">
              <div className="flex justify-between items-center p-2 rounded bg-white/5">
                <span className="text-gray-500">CONCENTRATION METRIC</span>
                <span className="text-purple-400 font-bold">{userStats.concentration}%</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-white/5">
                <span className="text-gray-500">ACTIVE STABILITY STATUS</span>
                <span className="text-cyan-400 font-bold">OPTIMAL</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-white/5">
                <span className="text-gray-500">NEURAL CALIBRATOR BANDWIDTH</span>
                <span className="text-amber-400 font-bold">1.2 GB/S</span>
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE & RIGHT: Active Milestones & Certifications */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel-purple p-6 space-y-4">
            <h3 className="text-sm font-mono uppercase text-purple-400 tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-purple-400 animate-pulse" /> Strategic Achievements & Certifications
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Full Stack AI Systems Architect", issue: "CTO Platforms Association", date: "July 2026", color: "border-purple-500/20" },
                { name: "Cryptographic local-first Specialist", issue: "Cybersecurity Global Council", date: "June 2026", color: "border-cyan-500/20" },
              ].map((cert, idx) => (
                <div key={idx} className={`p-4 rounded-xl bg-black/40 border ${cert.color} space-y-2`}>
                  <div className="text-xs font-bold text-white">{cert.name}</div>
                  <div className="text-[10px] text-gray-500 font-mono">
                    Issued: {cert.issue} • {cert.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-6 border-white/5 space-y-4">
            <h3 className="text-sm font-mono uppercase text-gray-300 tracking-wider flex items-center gap-1.5">
              <Target className="w-4 h-4 text-cyan-400" /> Active Milestones Tracked
            </h3>

            <div className="space-y-3">
              {[
                { label: "Level 4 Autonomy Validation", target: "Flight prototypes validation logs completion", progress: 65 },
                { label: "SaaS ROI Run-Rate Target", target: "Secure $10,000 weekly platform license sales", progress: 85 },
              ].map((m, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">{m.label}</span>
                    <span className="text-cyan-400 font-mono font-bold">{m.progress}%</span>
                  </div>
                  <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${m.progress}%` }} />
                  </div>
                  <p className="text-[10px] text-gray-500 font-mono">{m.target}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
