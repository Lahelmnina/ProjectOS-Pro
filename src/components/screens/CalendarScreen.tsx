"use client";

import React, { useState } from "react";
import { useOSState } from "@/context/AppContext";
import { Calendar, Play, Pause, RotateCcw, AlertTriangle, Sparkles, RefreshCw, Layers } from "lucide-react";

export default function CalendarScreen() {
  const { calendarEvents, setCalendarEvents, pomodoroState, setPomodoroState, addAiLog } = useOSState();
  const [deepFocus, setDeepFocus] = useState(false);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const togglePomodoro = () => {
    setPomodoroState((prev) => ({ ...prev, isRunning: !prev.isRunning }));
    addAiLog(`Smart Calendar: Pomodoro clock ${!pomodoroState.isRunning ? "Started" : "Paused"}.`);
  };

  const resetPomodoro = () => {
    setPomodoroState((prev) => ({ ...prev, isRunning: false, timeLeft: 1500 }));
    addAiLog("Smart Calendar: Pomodoro clock reset to 25 minutes.");
  };

  const triggerAutoReschedule = () => {
    addAiLog("Smart Calendar: Triggered AI Auto-Reschedule. Optimizing focus blocks.");
    // Simulate updating a calendar event
    setCalendarEvents((prev) =>
      prev.map((evt) => {
        if (evt.id === "cal-2") {
          return { ...evt, title: "🚀 OPTIMIZED: Fleet Telemetry Sync Block", start: "15:00", end: "16:30" };
        }
        return evt;
      })
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white glow-text-purple">
            SMART CALENDAR
          </h2>
          <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">
            Temporal Management & Cognitive Time Blocking
          </p>
        </div>
        <button
          onClick={triggerAutoReschedule}
          className="px-4 py-2 bg-purple-900/40 border border-purple-500/30 hover:bg-purple-900/60 rounded-lg text-xs font-mono font-bold tracking-widest text-white flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(139,92,246,0.2)]"
        >
          <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin-slow" /> AUTO RESCHEDULE
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT COLUMN: Pomodoro Timer & Deep Focus Toggle */}
        <div className="lg:col-span-1 space-y-6">
          {/* Pomodoro */}
          <div className="glass-panel p-6 border-white/5 space-y-5 text-center relative overflow-hidden">
            {/* Soft backdrop pulsing sphere */}
            {pomodoroState.isRunning && (
              <div className="absolute w-36 h-36 rounded-full bg-purple-500/10 blur-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow" />
            )}

            <div className="text-xs font-mono text-gray-400 uppercase tracking-widest">
              {pomodoroState.mode} session clock
            </div>

            <div className="text-5xl font-extrabold tracking-tight text-white font-mono glow-text-purple">
              {formatTime(pomodoroState.timeLeft)}
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={togglePomodoro}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg text-xs font-mono font-bold text-white flex items-center gap-1.5"
              >
                {pomodoroState.isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {pomodoroState.isRunning ? "PAUSE" : "START"}
              </button>

              <button
                onClick={resetPomodoro}
                className="p-2.5 bg-white/5 border border-white/5 rounded-lg hover:bg-white/10"
              >
                <RotateCcw className="w-4 h-4 text-gray-300" />
              </button>
            </div>
          </div>

          {/* Deep focus module */}
          <div className="glass-panel p-6 border-white/5 space-y-4">
            <h3 className="text-xs font-mono uppercase text-gray-300 tracking-wider">
              Deep Work Session
            </h3>
            <p className="text-xs text-gray-400 leading-normal">
              Silence all incoming notifications, system logs, and non-critical reminders to enter flow state.
            </p>
            <button
              onClick={() => {
                setDeepFocus(!deepFocus);
                addAiLog(`Deep Focus Mode: ${!deepFocus ? "Activated" : "Deactivated"}.`);
              }}
              className={`w-full py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all border ${
                deepFocus
                  ? "bg-purple-900/30 border-purple-500 text-purple-300 shadow-[0_0_15px_rgba(139,92,246,0.25)]"
                  : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
              }`}
            >
              {deepFocus ? "DEEP FOCUS ACTIVE" : "ACTIVATE FLOW MODE"}
            </button>
          </div>
        </div>

        {/* MIDDLE & RIGHT: Calendar Time Blocks */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 border-white/5 space-y-4">
            <h3 className="text-sm font-mono uppercase text-gray-300 tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-cyan-400" /> Planned Time Blocks
            </h3>

            <div className="space-y-3.5">
              {calendarEvents.map((evt) => {
                const isDeep = evt.type === "Deep Work";
                const isMeeting = evt.type === "Meeting";

                return (
                  <div
                    key={evt.id}
                    className={`p-4 rounded-xl border flex justify-between items-center transition-all ${
                      isDeep ? "bg-purple-950/20 border-purple-500/30 shadow-[0_0_12px_rgba(139,92,246,0.05)]" :
                      isMeeting ? "bg-amber-950/10 border-amber-500/20" :
                      "bg-white/5 border-white/5"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          isDeep ? "bg-purple-500" : isMeeting ? "bg-amber-400" : "bg-cyan-400"
                        }`} />
                        <span className="text-xs font-mono uppercase text-gray-500 font-bold">
                          {evt.type}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{evt.title}</h4>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-mono text-cyan-300 font-bold">
                        {evt.start} - {evt.end}
                      </div>
                      <div className="text-[10px] text-gray-500 font-mono">
                        GMT+3 LOCAL
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
