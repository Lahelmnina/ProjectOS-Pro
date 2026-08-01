"use client";

import React, { useState } from "react";
import { useOSState, AutomationRule } from "@/context/AppContext";
import { Zap, Play, Plus, Trash2, CheckCircle2, Bot, HelpCircle } from "lucide-react";

export default function AutomationBuilderScreen() {
  const { automations, setAutomations, addAiLog } = useOSState();
  const [trigger, setTrigger] = useState("When Task Deadline is Overdue");
  const [action, setAction] = useState("AI auto-schedules & updates priority rating");
  const [ruleName, setRuleName] = useState("Critical Task Rescue Loop");

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ruleName.trim()) return;

    const newRule: AutomationRule = {
      id: `auto-${Date.now()}`,
      name: ruleName,
      trigger,
      action,
      active: true,
    };

    setAutomations((prev) => [...prev, newRule]);
    setRuleName("");
    addAiLog(`Automation Engine: Registered new rule "${newRule.name}".`);
  };

  const toggleRuleActive = (ruleId: string) => {
    setAutomations((prev) =>
      prev.map((r) => {
        if (r.id === ruleId) {
          const nextState = !r.active;
          addAiLog(`Automation Engine: Toggled rule "${r.name}" active to ${nextState}.`);
          return { ...r, active: nextState };
        }
        return r;
      })
    );
  };

  const deleteRule = (ruleId: string) => {
    setAutomations((prev) => prev.filter((r) => r.id !== ruleId));
    addAiLog(`Automation Engine: Deleted automation rule ID ${ruleId}.`);
  };

  const simulateRuleTrigger = (ruleName: string) => {
    addAiLog(`Automation Engine: Simulated execution of "${ruleName}". Action completed.`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-white glow-text-purple">
          AUTOMATION FLOWS
        </h2>
        <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">
          Reactive Task Triggers, Autonomous Decision Rules & Zapier-style Loops
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT COLUMN: Create Rule Form */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-6 border-white/5 space-y-4">
            <h3 className="text-xs font-mono uppercase text-gray-300 tracking-wider">
              Create Custom Automation
            </h3>

            <form onSubmit={handleCreateRule} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 font-mono uppercase">Rule Label</label>
                <input
                  type="text"
                  placeholder="e.g. Sync Flight Logs on add"
                  value={ruleName}
                  onChange={(e) => setRuleName(e.target.value)}
                  className="w-full glass-input bg-white/5 border-white/5 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 font-mono uppercase">When Trigger Occurs</label>
                <select
                  value={trigger}
                  onChange={(e) => setTrigger(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-lg p-2 text-xs text-white outline-none"
                >
                  <option value="When Task Deadline is Overdue">When Task Deadline is Overdue</option>
                  <option value="When Project Activity stops for 5 days">When Project Activity stops for 5 days</option>
                  <option value="When new Idea is saved in second brain">When new Idea is saved in second brain</option>
                  <option value="When secure file is uploaded">When secure file is uploaded</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 font-mono uppercase">Then Execute Action</label>
                <select
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-lg p-2 text-xs text-white outline-none"
                >
                  <option value="AI auto-schedules & updates priority rating">AI auto-schedules & updates priority rating</option>
                  <option value="Trigger PM Agent to compile sprint report">Trigger PM Agent to compile sprint report</option>
                  <option value="Auto link with nearest Project node in Graph">Auto link with nearest Project node in Graph</option>
                  <option value="Run security scan and rotate keys">Run security scan and rotate keys</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg text-xs font-mono font-bold uppercase text-white shadow-[0_0_12px_rgba(139,92,246,0.3)]"
              >
                Assemble Rule Block
              </button>
            </form>
          </div>
        </div>

        {/* MIDDLE & RIGHT COLUMN: Active Rules & Simulate execute */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 border-white/5 space-y-4">
            <h3 className="text-sm font-mono uppercase text-gray-300 tracking-wider">
              Active Automation Rule Registry
            </h3>

            <div className="space-y-3.5">
              {automations.map((rule) => {
                return (
                  <div key={rule.id} className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${rule.active ? "bg-purple-500 animate-pulse" : "bg-gray-600"}`} />
                        <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">{rule.name}</h4>
                      </div>

                      <div className="text-[11px] space-y-1 text-gray-400">
                        <div>
                          <span className="text-purple-400 font-bold">IF:</span> {rule.trigger}
                        </div>
                        <div>
                          <span className="text-cyan-400 font-bold">THEN:</span> {rule.action}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 justify-end flex-shrink-0">
                      {/* Active toggle */}
                      <button
                        onClick={() => toggleRuleActive(rule.id)}
                        className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold ${
                          rule.active ? "bg-green-500/10 border border-green-500/20 text-green-400" : "bg-white/5 text-gray-500"
                        }`}
                      >
                        {rule.active ? "ACTIVE" : "PAUSED"}
                      </button>

                      {/* Run trial */}
                      <button
                        onClick={() => simulateRuleTrigger(rule.name)}
                        className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 text-gray-300"
                        title="Simulate rule execution"
                      >
                        <Play className="w-3.5 h-3.5 text-cyan-400" />
                      </button>

                      {/* Delete */}
                      <button onClick={() => deleteRule(rule.id)} className="text-gray-500 hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
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
