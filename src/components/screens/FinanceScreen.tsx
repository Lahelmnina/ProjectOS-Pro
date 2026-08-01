"use client";

import React, { useState } from "react";
import { useOSState, FinancialTransaction } from "@/context/AppContext";
import { Landmark, Plus, Trash2, ArrowUpRight, ArrowDownRight, Bot, Sparkles } from "lucide-react";

export default function FinanceScreen() {
  const { finances, setFinances, addAiLog } = useOSState();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("SaaS Services");
  const [type, setType] = useState<"Income" | "Expense">("Expense");

  const totalIncome = finances.filter((f) => f.type === "Income").reduce((sum, f) => sum + f.amount, 0);
  const totalExpense = finances.filter((f) => f.type === "Expense").reduce((sum, f) => sum + f.amount, 0);
  const netBalance = totalIncome - totalExpense;

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return;

    const newTx: FinancialTransaction = {
      id: `fin-${Date.now()}`,
      type,
      category,
      amount: val,
      date: new Date().toISOString().split("T")[0],
    };

    setFinances((prev) => [newTx, ...prev]);
    setAmount("");
    addAiLog(`Finance Monitor: Logged ${type} transaction: "${category}" ($${val}).`);
  };

  const handleDelete = (txId: string) => {
    setFinances((prev) => prev.filter((f) => f.id !== txId));
    addAiLog(`Finance Monitor: Deleted transaction ID ${txId}.`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-white glow-text-purple">
          CAPITAL MONITOR
        </h2>
        <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">
          Financial Runway, Cash-flow Allocator & Run-rate Auditor
        </p>
      </div>

      {/* Balance stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-5 border-white/5 flex justify-between items-center">
          <div>
            <div className="text-[10px] text-gray-500 font-mono uppercase">RUNWAY BALANCE</div>
            <div className="text-2xl font-extrabold text-white glow-text-purple">${netBalance}</div>
          </div>
          <div className="p-3 rounded-full bg-purple-950/20 border border-purple-500/20">
            <Landmark className="w-5 h-5 text-purple-400" />
          </div>
        </div>

        <div className="glass-panel p-5 border-white/5 flex justify-between items-center">
          <div>
            <div className="text-[10px] text-gray-500 font-mono uppercase">TOTAL INFLOW</div>
            <div className="text-2xl font-extrabold text-green-400 flex items-center gap-1">
              <ArrowUpRight className="w-5 h-5" /> ${totalIncome}
            </div>
          </div>
        </div>

        <div className="glass-panel p-5 border-white/5 flex justify-between items-center">
          <div>
            <div className="text-[10px] text-gray-500 font-mono uppercase">TOTAL OUTFLOW</div>
            <div className="text-2xl font-extrabold text-red-400 flex items-center gap-1">
              <ArrowDownRight className="w-5 h-5" /> ${totalExpense}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: Add transaction */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-6 border-white/5 space-y-4">
            <h3 className="text-xs font-mono uppercase text-gray-300 tracking-wider">
              Log Transaction
            </h3>

            <form onSubmit={handleAddTransaction} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 font-mono uppercase">Transaction Type</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setType("Income")}
                    className={`py-2 rounded-lg border text-center transition-all ${
                      type === "Income" ? "bg-green-950/20 border-green-500 text-green-400" : "bg-white/5 border-white/5 text-gray-500"
                    }`}
                  >
                    INCOME
                  </button>
                  <button
                    type="button"
                    onClick={() => setType("Expense")}
                    className={`py-2 rounded-lg border text-center transition-all ${
                      type === "Expense" ? "bg-red-950/20 border-red-500 text-red-400" : "bg-white/5 border-white/5 text-gray-500"
                    }`}
                  >
                    EXPENSE
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 font-mono uppercase">Amount (USD)</label>
                <input
                  type="number"
                  placeholder="e.g. 500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full glass-input bg-white/5 border-white/5 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 font-mono uppercase">Category</label>
                <input
                  type="text"
                  placeholder="e.g. Cloud API Clusters"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full glass-input bg-white/5 border-white/5 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg text-xs font-mono font-bold uppercase text-white shadow-[0_0_12px_rgba(139,92,246,0.3)]"
              >
                Insert Ledger Block
              </button>
            </form>
          </div>
        </div>

        {/* MIDDLE & RIGHT COLUMN: Transaction table & AI suggestions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 border-white/5 space-y-4">
            <h3 className="text-sm font-mono uppercase text-gray-300 tracking-wider">
              Capital Ledger Records
            </h3>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs">
              {finances.map((f) => (
                <div key={f.id} className="p-3 rounded-lg bg-black/40 border border-white/5 flex justify-between items-center">
                  <div className="space-y-1">
                    <div className="font-bold text-white flex items-center gap-2">
                      {f.category}
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono uppercase ${
                        f.type === "Income" ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"
                      }`}>
                        {f.type}
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-500 font-mono">{f.date}</div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`font-mono font-bold ${f.type === "Income" ? "text-green-400" : "text-red-400"}`}>
                      {f.type === "Income" ? "+" : "-"}${f.amount}
                    </span>
                    <button onClick={() => handleDelete(f.id)} className="text-gray-500 hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI run-rate auditor advice */}
          <div className="glass-panel-purple p-6 space-y-3">
            <h4 className="text-xs font-mono uppercase text-purple-400 tracking-wider flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-purple-400" /> Finance Audit Intelligence
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed font-mono">
              "Based on your $3,100 Cloud GPU expense, I recommend shutting down unquantized simulation clusters during focus break blocks. That alone yields a 15% runway extension, saving approximately $465 monthly."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
