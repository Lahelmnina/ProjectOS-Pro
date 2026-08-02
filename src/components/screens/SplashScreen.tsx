"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    }, 300);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            onComplete();
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[#030303] flex flex-col items-center justify-center z-50 p-6 overflow-hidden">
      {/* Background ambient glowing spheres */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[rgba(var(--accent-rgb),0.1)] blur-[120px] top-1/4 left-1/4 animate-pulse" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-cyan-900/5 blur-[100px] bottom-1/4 right-1/4" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="w-full max-w-2xl glass-panel p-8 flex flex-col space-y-6 relative border-purple-500/20 shadow-2xl"
      >
        {/* Upper tech accents */}
        <div className="flex justify-between items-center text-xs text-gray-500 font-mono">
          <span className="flex items-center gap-1.5 font-bold">
            <Activity className="w-3.5 h-3.5 animate-pulse accent-text" /> SYS.ACTIVE: V1.1.0-PRO
          </span>
          <span className="flex items-center gap-1.5 font-bold">
            <Shield className="w-3.5 h-3.5 text-cyan-400" /> SECURE DECRYPTION
          </span>
        </div>

        {/* Center Logo & Loading Dial */}
        <div className="flex flex-col items-center py-6 text-center">
          <div className="relative w-24 h-24 mb-5 flex items-center justify-center">
            {/* Spinning futuristic arcs */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute inset-0 border-t-2 border-r-2 border-purple-500 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
              className="absolute inset-2 border-b-2 border-l-2 border-cyan-400 rounded-full"
            />
            <Cpu className="w-10 h-10 accent-text" />
          </div>
          <h1 className="text-3xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-300 to-cyan-300 font-sans leading-none">
            PROJECT<span className="accent-text font-black">OS</span> PRO
          </h1>
          <p className="text-[10px] text-gray-400 font-mono uppercase tracking-[0.25em] mt-2">
            Personal Operating System for Human Productivity
          </p>
        </div>

        {/* Terminal Boot logs */}
        <div className="bg-black/40 border border-white/5 rounded-2xl p-5 font-mono text-xs text-cyan-400/90 h-44 overflow-y-auto space-y-2 flex flex-col justify-end">
          <AnimatePresence>
            {logs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-2"
              >
                <span className="accent-text select-none font-bold">&gt;</span>
                <span>{log}</span>
                {i === logs.length - 1 && logs.length === bootLogs.length && (
                  <Check className="w-4 h-4 text-green-400 inline ml-1.5" />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {logs.length < bootLogs.length && (
            <div className="flex items-center gap-1.5 text-purple-400/80 font-bold">
              <Terminal className="w-3.5 h-3.5 animate-pulse" />
              <span className="animate-pulse">Loading modules...</span>
            </div>
          )}
        </div>

        {/* Outer glowing progress bar */}
        <div className="space-y-2.5">
          <div className="flex justify-between text-xs text-gray-400 font-mono">
            <span>COGNITIVE CORE SYNC</span>
            <span className="accent-text font-black">{progress}%</span>
          </div>
          <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5 p-0.5">
            <motion.div
              className="bg-gradient-to-r from-purple-600 via-violet-500 to-cyan-400 h-full rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        {/* Footer credits */}
        <div className="text-center text-[9px] text-gray-500 font-mono uppercase tracking-wider pt-2">
          DESIGNED BY APPLE LEVEL UX ARCHITECTS & CTO SAAS TEAM
        </div>
      </motion.div>
    </div>
  );
}
