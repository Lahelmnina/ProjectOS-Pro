"use client";

import React, { useState } from "react";
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
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-[#030303] flex items-center justify-center p-6 overflow-y-auto z-30">
      {/* Background radial lines */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute w-[800px] h-[800px] rounded-full bg-cyan-900/10 blur-[150px] -top-80 -left-20 pointer-events-none" />

      <div className="w-full max-w-2xl glass-panel p-8 relative space-y-6 border-white/10 shadow-2xl">
        {/* Onboarding progress bar */}
        <div className="flex justify-between items-center text-xs text-gray-400 font-mono">
          <span className="flex items-center gap-1">
            <Bot className="w-4 h-4 text-purple-400 animate-pulse" /> SYSTEM ONBOARDING SETUP
          </span>
          <span>STEP {step} OF 3</span>
        </div>
        <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Step 1: Core Vision & Focus */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Compass className="w-6 h-6 text-purple-400" /> Define Your Core Vision
              </h2>
              <p className="text-sm text-gray-400">
                The life system starts with your ultimate Vision, which determines all future Goals, Projects, and daily Actions.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs text-gray-300 font-mono uppercase tracking-wider">Your Ultimate Vision</label>
                <textarea
                  value={userVision}
                  onChange={(e) => setUserVision(e.target.value)}
                  className="w-full glass-input h-24 bg-white/5 border-white/5 text-sm resize-none"
                  placeholder="Enter your life/career vision..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-gray-300 font-mono uppercase tracking-wider">Primary Life Focus</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Software Engineering", "Venture Building", "Health & Habits", "Financial Independence"].map((area) => (
                    <button
                      key={area}
                      onClick={() => setFocusArea(area)}
                      className={`p-3 rounded-lg border text-xs text-center transition-all ${
                        focusArea === area
                          ? "bg-purple-900/30 border-purple-500 text-white shadow-[0_0_12px_rgba(139,92,246,0.25)]"
                          : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10"
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-violet-500 text-white text-sm font-semibold flex items-center gap-2 hover:from-purple-500"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Target className="w-6 h-6 text-cyan-400" /> Formulate Key Strategic Goal
              </h2>
              <p className="text-sm text-gray-400">
                Goals anchor your projects. What specific milestone must be completed next to realize your vision?
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs text-gray-300 font-mono uppercase tracking-wider">Strategic Goal</label>
                <textarea
                  value={activeGoal}
                  onChange={(e) => setActiveGoal(e.target.value)}
                  className="w-full glass-input h-24 bg-white/5 border-white/5 text-sm resize-none"
                  placeholder="e.g. Launch AI app and gather 1,000 users"
                />
              </div>

              <div className="p-4 rounded-lg bg-cyan-950/20 border border-cyan-500/20 text-xs text-cyan-300/90 flex gap-3">
                <Bot className="w-5 h-5 text-cyan-400 flex-shrink-0 animate-pulse" />
                <div>
                  <span className="font-bold">AI Systems Architect recommendation:</span> Based on your focus in <span className="text-white font-semibold">{focusArea}</span>,
                  I suggest establishing a Project Universe specializing in edge compilation and AI-driven telemetry sync models.
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2.5 rounded-lg border border-white/10 text-gray-300 text-sm hover:bg-white/5"
              >
                Back
              </button>

              <button
                onClick={simulateAIGeneration}
                disabled={generating}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-cyan-600 to-purple-500 text-white text-sm font-semibold flex items-center gap-2 hover:from-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              >
                {generating ? "AI is Thinking..." : "Synergize Life OS Model"} <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <div className="inline-flex p-3 rounded-full bg-green-500/10 border border-green-500/20 mb-2 animate-bounce">
                <Check className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">ProjectOS Pro Configured!</h2>
              <p className="text-sm text-gray-400">
                Your digital brain is calibrated and ready to load.
              </p>
            </div>

            <div className="space-y-4 border border-white/5 rounded-xl p-5 bg-black/50 text-xs font-mono">
              <div className="text-purple-400 border-b border-white/5 pb-2 uppercase tracking-widest font-bold">Generated Project Universe</div>

              <div className="space-y-3">
                <div>
                  <span className="text-gray-400">Title:</span> <span className="text-white font-semibold">{generatedOutput?.projects[0].title}</span>
                </div>
                <div>
                  <span className="text-gray-400">Target Core Action Steps:</span>
                  <ul className="list-disc pl-5 text-cyan-300 mt-1 space-y-1">
                    {generatedOutput?.tasks.map((t: any, i: number) => (
                      <li key={i}>{t.title} ({t.duration})</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-gray-400">Assigned Autonomous Agent:</span> <span className="text-white font-bold">{generatedOutput?.agent}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onComplete}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-sm tracking-widest uppercase hover:from-purple-500 hover:to-cyan-400 transition-all shadow-[0_0_20px_rgba(139,92,246,0.35)]"
            >
              Enter Personal Command Center
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
