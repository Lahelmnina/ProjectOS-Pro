"use client";

import React, { useState } from "react";
import { useOSState } from "@/context/AppContext";
import { Activity, Brain, Zap, Clock, ShieldCheck, HelpCircle } from "lucide-react";

export default function AnalyticsScreen() {
  const { userStats } = useOSState();

  const [activeMetricTab, setActiveMetricTab] = useState<"focus" | "energy">("focus");

  // Chart data
  const focusScores = [70, 75, 82, 90, 88, 92, 95];
  const energyLevels = [80, 85, 90, 78, 85, 82, 85];

  const currentScores = activeMetricTab === "focus" ? focusScores : energyLevels;
  const currentAvg = Math.round(currentScores.reduce((sum, score) => sum + score, 0) / currentScores.length);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-white glow-text-purple">
          NEURAL ANALYTICS
        </h2>
        <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">
          Advanced Performance Diagnostics, Flow Indexing & Energy Waveforms
        </p>
      </div>

      {/* Overview Stat Dials */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-panel p-5 border-white/5 flex justify-between items-center">
          <div>
            <div className="text-[10px] text-gray-500 font-mono uppercase">WEEKLY FOCUS AVERAGE</div>
            <div className="text-2xl font-extrabold text-white glow-text-purple">92%</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-purple-950/20 border border-purple-500/20 flex items-center justify-center">
            <Brain className="w-4 h-4 text-purple-400" />
          </div>
        </div>

        <div className="glass-panel p-5 border-white/5 flex justify-between items-center">
          <div>
            <div className="text-[10px] text-gray-500 font-mono uppercase">ENERGY CONGRUENCE</div>
            <div className="text-2xl font-extrabold text-cyan-400">85%</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-cyan-950/20 border border-cyan-500/20 flex items-center justify-center">
            <Zap className="w-4 h-4 text-cyan-400" />
          </div>
        </div>

        <div className="glass-panel p-5 border-white/5 flex justify-between items-center">
          <div>
            <div className="text-[10px] text-gray-500 font-mono uppercase">DEEP WORK DIRECT HOURS</div>
            <div className="text-2xl font-extrabold text-amber-400">28.4 hrs</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-amber-950/20 border border-amber-500/20 flex items-center justify-center">
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
        </div>

        <div className="glass-panel p-5 border-white/5 flex justify-between items-center">
          <div>
            <div className="text-[10px] text-gray-500 font-mono uppercase">STABILITY SCORE</div>
            <div className="text-2xl font-extrabold text-green-400">EXCELLENT</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-green-950/20 border border-green-500/20 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-green-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT & MIDDLE: Performance diagnostic charts */}
        <div className="lg:col-span-2 glass-panel p-6 border-white/5 space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-3">
            <h3 className="text-sm font-mono uppercase text-gray-300 tracking-wider">
              Diagnostic Charts
            </h3>

            {/* Metric Tab Selector */}
            <div className="flex gap-2">
              <button
                onClick={() => setActiveMetricTab("focus")}
                className={`px-3 py-1 text-xs font-mono rounded transition-colors border ${
                  activeMetricTab === "focus"
                    ? "bg-purple-900/30 border-purple-500/40 text-purple-300"
                    : "bg-white/5 border-white/5 text-gray-500"
                }`}
              >
                FOCUS INDEX
              </button>
              <button
                onClick={() => setActiveMetricTab("energy")}
                className={`px-3 py-1 text-xs font-mono rounded transition-colors border ${
                  activeMetricTab === "energy"
                    ? "bg-purple-900/30 border-purple-500/40 text-purple-300"
                    : "bg-white/5 border-white/5 text-gray-500"
                }`}
              >
                ENERGY TRENDS
              </button>
            </div>
          </div>

          {/* SVG Line Chart Representation */}
          <div className="py-2">
            <div className="h-48 w-full relative flex items-end">

              {/* Grid guide-lines */}
              <div className="absolute inset-x-0 top-0 border-t border-white/5 text-[9px] text-gray-600 font-mono uppercase py-1">
                Peak threshold (100)
              </div>
              <div className="absolute inset-x-0 top-1/2 border-t border-white/5 text-[9px] text-gray-600 font-mono uppercase py-1">
                Baseline (50)
              </div>

              {/* Bar charts representing daily levels */}
              <div className="w-full h-full flex justify-between items-end px-2 z-10">
                {currentScores.map((score, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 flex-grow">
                    <div className="text-[10px] text-cyan-400 font-mono font-bold">
                      {score}%
                    </div>
                    <div
                      className={`w-10 rounded-t-md transition-all duration-500 bg-gradient-to-t ${
                        activeMetricTab === "focus" ? "from-purple-600/80 to-purple-400/80" : "from-cyan-600/80 to-cyan-400/80"
                      }`}
                      style={{ height: `${(score / 100) * 120}px` }}
                    />
                    <div className="text-[10px] text-gray-500 font-mono uppercase">
                      Day {idx + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between text-xs font-mono text-gray-500 uppercase border-t border-white/5 pt-3">
            <span>Average: {currentAvg}%</span>
            <span>Calibration standard verified</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Performance diagnosis */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel-purple p-6 space-y-4">
            <h3 className="text-xs font-mono uppercase text-purple-400 tracking-wider flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-purple-400" /> Cognitive Stability Analysis
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed font-mono">
              "Your focus amplitude remains high at 95% today, matching your 12-day Deep Focus habit streak. Our neural algorithm calculates a 14% improvement in task-completion velocity over the trailing 48-hour index."
            </p>

            <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-gray-400 space-y-1">
              <span className="font-bold text-gray-200 uppercase text-[9px] font-mono block">Recommended next block:</span>
              <p>Commence the DriverPilot YOLO TensorRT quantization tasks. Current neural indicators point toward peak logical problem-solving capability.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
