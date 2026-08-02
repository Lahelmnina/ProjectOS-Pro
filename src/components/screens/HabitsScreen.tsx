"use client";

import React, { useState } from "react";
import { useOSState, Habit } from "@/context/AppContext";
import { Award, Zap, Heart, Plus, Activity, BookOpen, Layers } from "lucide-react";

export default function HabitsScreen() {
  const { habits, setHabits, addAiLog } = useOSState();

  const handleToggleHabit = (habitId: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id === habitId) {
          const today = "2026-07-31"; // mock today
          const wasCompleted = h.history[today] || false;
          const updatedHistory = { ...h.history, [today]: !wasCompleted };
          const updatedStreak = !wasCompleted ? h.streak + 1 : Math.max(0, h.streak - 1);

          addAiLog(`Habit Log: "${h.name}" check-in toggled to ${!wasCompleted ? "Complete" : "Incomplete"}.`);

          return {
            ...h,
            streak: updatedStreak,
            history: updatedHistory,
          };
        }
        return h;
      })
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white glow-text-purple">
            HABITS & MATRIX OS
          </h2>
          <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">
            Quantified Life Metrics, Daily Matrix Calibration & Streaks
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono uppercase">
          <Activity className="w-4 h-4 text-purple-400 animate-pulse" /> Neuro Calibration Calibrated
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT & MIDDLE: Habits list and heatmaps */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 border-white/5 space-y-5">
            <h3 className="text-sm font-mono uppercase text-gray-300 tracking-wider">
              Daily Calibration Matrix
            </h3>

            <div className="space-y-4">
              {habits.map((habit) => {
                const today = "2026-07-31";
                const isDoneToday = habit.history[today] || false;
                const isProductive = habit.category === "Productivity";
                const isHealth = habit.category === "Health";

                return (
                  <div
                    key={habit.id}
                    className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-purple-500/20 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        isProductive ? "bg-purple-950/30 text-purple-400" :
                        isHealth ? "bg-red-950/20 text-red-400" :
                        "bg-cyan-950/30 text-cyan-400"
                      }`}>
                        {isProductive ? <Layers className="w-4 h-4" /> :
                         isHealth ? <Heart className="w-4 h-4" /> :
                         <BookOpen className="w-4 h-4" />}
                      </div>

                      <div className="space-y-1">
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          {habit.name}
                          <span className="text-[9px] font-mono bg-white/5 text-gray-400 px-1.5 py-0.5 rounded uppercase">
                            {habit.category}
                          </span>
                        </div>
                        <div className="text-[10px] text-gray-500 font-mono">
                          Current consecutive streak: <span className="text-purple-400 font-bold">{habit.streak} days</span>
                        </div>
                      </div>
                    </div>

                    {/* Heatmap Grid & Action */}
                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                      {/* Interactive mock grid blocks */}
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5, 6, 7].map((blockIdx) => {
                          const isDone = blockIdx <= (habit.streak % 7) || (blockIdx === 7 && isDoneToday);
                          return (
                            <div
                              key={blockIdx}
                              title={`Day -${7 - blockIdx}`}
                              className={`w-3.5 h-3.5 rounded-sm transition-all duration-300 ${
                                isDone
                                  ? isProductive ? "bg-purple-500 shadow-[0_0_8px_rgba(139,92,246,0.5)]" :
                                    isHealth ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" :
                                    "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]"
                                  : "bg-white/5 border border-white/5"
                              }`}
                            />
                          );
                        })}
                      </div>

                      <button
                        onClick={() => handleToggleHabit(habit.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                          isDoneToday
                            ? "bg-green-500/10 border border-green-500/20 text-green-400"
                            : "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_10px_rgba(139,92,246,0.3)]"
                        }`}
                      >
                        {isDoneToday ? "Calibrated" : "Check-In"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Life Coach Agent integration */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel-purple p-6 space-y-4">
            <h3 className="text-sm font-mono uppercase text-purple-400 tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-purple-400 animate-pulse" /> Life Coach AI counselor
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed font-mono">
              "Your 12-day streak in Deep Focus (4 hours) has successfully calibrated your cognitive focus index to 92%. Let's secure today's training session before commencing the YOLO model quantizations."
            </p>

            <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-gray-400 space-y-1.5">
              <span className="font-bold text-gray-200">Suggested Action plan:</span>
              <p>Allocate a 30-minute cardio focus block at 18:00 to refresh energy levels after deep technical compilation loops.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
