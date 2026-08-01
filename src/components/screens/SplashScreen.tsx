"use client";

import React, { useEffect, useState } from "react";
import { Terminal, Shield, Cpu, Activity, Database, Check } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const bootLogs = [
    "INITIALIZING COGNITIVE INTERFACE...",
    "ESTABLISHING SECURE SSH TUNNEL (LOCAL-FIRST OVERLAY)...",
    "DECRYPTING CORE METADATA NODES [AES-256-GCM]...",
    "CONNECTING TO VECTOR DATABASE CLUSTERS...",
    "LAUNCHING PROJECT MANAGER AGENT CORE...",
    "AUDITING CRYPTOGRAPHIC INTEGRITY... [SECURE]",
    "SYSTEM HEALTH DIAGNOSTICS: 100% OPERATIONAL.",
  ];

  useEffect(() => {
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < bootLogs.length) {
        setLogs((prev) => [...prev, bootLogs[logIndex]]);
        logIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 400);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            onComplete();
          }, 600);
          return 100;
        }
        return prev + 5;
      });
    }, 150);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[#030303] flex flex-col items-center justify-center z-50 p-6 overflow-hidden">
      {/* Background ambient glowing spheres */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-purple-900/10 blur-[120px] top-1/4 left-1/4 animate-pulse-glow" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-cyan-900/10 blur-[100px] bottom-1/4 right-1/4" />

      <div className="w-full max-w-2xl glass-panel p-8 flex flex-col space-y-6 relative border-purple-500/20 shadow-2xl">
        {/* Upper tech accents */}
        <div className="flex justify-between items-center text-xs text-purple-400 font-mono">
          <span className="flex items-center gap-1">
            <Activity className="w-3 h-3 animate-pulse text-purple-400" /> SYS.ACTIVE: V1.0.4-PRO
          </span>
          <span className="flex items-center gap-1">
            <Shield className="w-3 h-3 text-cyan-400" /> SECURE DECRYPTION ON
          </span>
        </div>

        {/* Center Logo & Loading Dial */}
        <div className="flex flex-col items-center py-6 text-center">
          <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
            {/* Spinning futuristic arcs */}
            <div className="absolute inset-0 border-t-2 border-r-2 border-purple-500 rounded-full animate-spin-slow" />
            <div className="absolute inset-2 border-b-2 border-l-2 border-cyan-400 rounded-full animate-spin" style={{ animationDirection: "reverse" }} />
            <Cpu className="w-10 h-10 text-purple-400 animate-pulse" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-cyan-300 font-sans">
            PROJECT<span className="text-purple-400">OS</span> PRO
          </h1>
          <p className="text-xs text-gray-400 uppercase tracking-[0.25em] mt-1">
            Personal Operating System for Human Productivity
          </p>
        </div>

        {/* Terminal Boot logs */}
        <div className="bg-black/60 border border-white/5 rounded-lg p-4 font-mono text-xs text-cyan-400/90 h-40 overflow-y-auto space-y-2 flex flex-col justify-end">
          {logs.map((log, i) => (
            <div key={i} className="flex items-start gap-2 animate-fade-in">
              <span className="text-purple-500 select-none">&gt;</span>
              <span>{log}</span>
              {i === logs.length - 1 && logs.length === bootLogs.length && (
                <Check className="w-3.5 h-3.5 text-green-400 inline" />
              )}
            </div>
          ))}
          {logs.length < bootLogs.length && (
            <div className="flex items-center gap-1 text-purple-400/80">
              <Terminal className="w-3 h-3 animate-pulse" />
              <span className="animate-pulse">Loading modules...</span>
            </div>
          )}
        </div>

        {/* Outer glowing progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-400 font-mono">
            <span>COGNITIVE CORE SYNC</span>
            <span className="text-cyan-400 font-bold">{progress}%</span>
          </div>
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5 p-0.5">
            <div
              className="bg-gradient-to-r from-purple-600 via-violet-500 to-cyan-400 h-full rounded-full transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Footer credits */}
        <div className="text-center text-[10px] text-gray-500 font-mono uppercase tracking-wider pt-2">
          DESIGNED BY APPLE LEVEL UX ARCHITECTS & CTO SAAS TEAM
        </div>
      </div>
    </div>
  );
}
