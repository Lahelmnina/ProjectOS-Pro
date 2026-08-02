"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Target, Sparkles, Compass, Check, ArrowRight, UserPlus } from "lucide-react";

interface OnboardingScreenProps {
  onComplete: () => void;
}

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [step, setStep] = useState(1);
  const [userVision, setUserVision] = useState("Build a sustainable software business that automates everyday intelligence.");
  const [activeGoal, setActiveGoal] = useState("Launch an AI Copilot product and capture 500 active beta testers.");
  const [focusArea, setFocusArea] = useState("Software Engineering");

  const [generating, setGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState<any>(null);

  const simulateAIGeneration = () => {
    setGenerating(true);
    setTimeout(() => {
      setGeneratedOutput({
        projects: [
          {
            title: "Project: DriverPilot AI - MVP",
            description: "Core autonomous drone routing with custom YOLO and TensorRT modules.",
            budget: "$25,000",
          }
        ],
        tasks: [
          { title: "Optimize custom YOLO models using INT8 Quantization", duration: "4 hours" },
          { title: "Set up Docker development workspace with TensorRT libraries", duration: "3 hours" },
        ],
        agent: "Project Manager AI Agent"
      });
      setGenerating(false);
      setStep(3);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-[#030303] flex items-center justify-center p-6 overflow-y-auto z-30">
      {/* Background radial lines */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute w-[800px] h-[800px] rounded-full bg-[rgba(var(--accent-rgb),0.07)] blur-[150px] -top-80 -left-20 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-2xl glass-panel p-8 relative space-y-6 border-white/10 shadow-2xl"
      >
        {/* Onboarding progress bar */}
        <div className="flex justify-between items-center text-xs text-gray-400 font-mono">
          <span className="flex items-center gap-1.5 font-bold">
            <Bot className="w-4 h-4 accent-text animate-pulse" /> SYSTEM ONBOARDING SETUP
          </span>
          <span className="font-bold">STEP {step} OF 3</span>
        </div>
        <div className="w-full bg-black/30 h-1.5 rounded-full overflow-hidden p-0.5 border border-white/5">
          <motion.div
            className="bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 h-full rounded-full"
            initial={{ width: "33.3%" }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          />
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Core Vision & Focus */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
                  <Compass className="w-6 h-6 accent-text" /> Define Your Core Vision
                </h2>
                <p className="text-xs text-gray-400 leading-relaxed">
                  The life system starts with your ultimate Vision, which determines all future Goals, Projects, and daily Actions.
                </p>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-400 font-mono uppercase tracking-wider font-bold">Your Ultimate Vision</label>
                  <textarea
                    value={userVision}
                    onChange={(e) => setUserVision(e.target.value)}
                    className="w-full glass-input h-24 bg-white/5 border-white/5 text-sm resize-none font-medium"
                    placeholder="Enter your life/career vision..."
                  />
                </div>

                <div className="space-y-2.5">
                  <label className="text-[10px] text-gray-400 font-mono uppercase tracking-wider font-bold">Primary Life Focus</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                    {["Software Engineering", "Venture Building", "Health & Habits", "Financial Independence"].map((area) => (
                      <motion.button
                        key={area}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFocusArea(area)}
                        className={`p-3.5 rounded-xl border text-xs text-center font-bold tracking-tight transition-all ${
                          focusArea === area
                            ? "bg-purple-950/20 border-purple-500/40 text-purple-300 shadow-[0_0_15px_rgba(var(--accent-rgb),0.2)]"
                            : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10"
                        }`}
                      >
                        {area}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:opacity-95 shadow-[0_4px_15px_rgba(var(--accent-rgb),0.3)]"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
                  <Target className="w-6 h-6 text-cyan-400" /> Formulate Key Strategic Goal
                </h2>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Goals anchor your projects. What specific milestone must be completed next to realize your vision?
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-400 font-mono uppercase tracking-wider font-bold">Strategic Goal</label>
                  <textarea
                    value={activeGoal}
                    onChange={(e) => setActiveGoal(e.target.value)}
                    className="w-full glass-input h-24 bg-white/5 border-white/5 text-sm resize-none font-medium"
                    placeholder="e.g. Launch AI app and gather 1,000 users"
                  />
                </div>

                <div className="p-4.5 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-cyan-300/90 flex gap-3.5 leading-relaxed">
                  <Bot className="w-5 h-5 text-cyan-400 flex-shrink-0 animate-pulse" />
                  <div>
                    <span className="font-extrabold text-white block mb-0.5">AI Systems Architect recommendation:</span> Based on your focus in <span className="text-white font-semibold">{focusArea}</span>,
                    I suggest establishing a Project Universe specializing in edge compilation and AI-driven telemetry sync models.
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep(1)}
                  className="px-6 py-3 rounded-xl border border-white/10 text-gray-400 text-xs font-bold uppercase tracking-wider hover:bg-white/5"
                >
                  Back
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={simulateAIGeneration}
                  disabled={generating}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:opacity-95 shadow-[0_4px_15px_rgba(var(--accent-rgb),0.3)]"
                >
                  {generating ? "AI is Thinking..." : "Synergize Life OS Model"} <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="space-y-2 text-center">
                <div className="inline-flex p-3 rounded-full bg-green-500/10 border border-green-500/20 mb-2">
                  <Check className="w-6 h-6 text-green-400 animate-bounce" />
                </div>
                <h2 className="text-2xl font-extrabold text-white leading-none">ProjectOS Pro Configured!</h2>
                <p className="text-xs text-gray-400 mt-1.5">
                  Your digital brain is calibrated and ready to load.
                </p>
              </div>

              <div className="space-y-4 border border-black/10 dark:border-white/5 rounded-2xl p-6 bg-black/50 text-xs font-mono">
                <div className="accent-text border-b border-white/5 pb-2.5 uppercase tracking-widest font-extrabold text-[10px]">
                  Generated Project Universe
                </div>

                <div className="space-y-3 leading-relaxed">
                  <div>
                    <span className="text-gray-400 font-bold uppercase text-[9px] tracking-wider block mb-0.5">Title:</span>
                    <span className="text-white font-semibold text-sm">{generatedOutput?.projects[0].title}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold uppercase text-[9px] tracking-wider block mb-1">Target Core Action Steps:</span>
                    <ul className="list-disc pl-5 text-cyan-300 space-y-1">
                      {generatedOutput?.tasks.map((t: any, i: number) => (
                        <li key={i} className="font-semibold">{t.title} ({t.duration})</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold uppercase text-[9px] tracking-wider block mb-0.5">Assigned Autonomous Agent:</span>
                    <span className="text-white font-extrabold">{generatedOutput?.agent}</span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={onComplete}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs tracking-widest uppercase hover:opacity-95 transition-all shadow-[0_4px_20px_rgba(var(--accent-rgb),0.35)]"
              >
                Enter Personal Command Center
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
