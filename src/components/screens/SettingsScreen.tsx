"use client";

import React, { useState } from "react";
import { useOSState } from "@/context/AppContext";
import { motion } from "framer-motion";
import { Shield, Key, Database, RefreshCw, Check, Heart } from "lucide-react";

export default function SettingsScreen() {
  const { theme, setTheme, accentColor, setAccentColor, addAiLog } = useOSState();

  const [encryptionKey, setEncryptionKey] = useState("PBKDF2-SHA256-NEURAL-VECTOR-0X9F");
  const [offlineMode, setOfflineMode] = useState(true);
  const [backupLogs, setBackupLogs] = useState("Backup auto-scheduled (Daily at 04:00 GMT+3)");
  const [saving, setSaving] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

  const handleSaveSettings = () => {
    setSaving(true);
    addAiLog("System Settings: Rewriting system configuration registry.");
    setTimeout(() => {
      setSaving(false);
      setShowCheck(true);
      addAiLog("System Settings: Configuration backup successfully written.");
      setTimeout(() => setShowCheck(false), 2000);
    }, 1000);
  };

  const accentColors: { name: typeof accentColor; class: string }[] = [
    { name: "purple", class: "bg-purple-500" },
    { name: "cyan", class: "bg-cyan-500" },
    { name: "orange", class: "bg-orange-500" },
    { name: "green", class: "bg-green-500" },
    { name: "pink", class: "bg-pink-500" }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-black tracking-tight text-black dark:text-white glow-text-purple">
          SYSTEM SETTINGS
        </h2>
        <p className="text-[10px] text-gray-400 font-mono uppercase tracking-widest font-bold">
          Local-First Encryption, API Keys & Sandbox Workspace Configuration
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT & MIDDLE: Settings configuration cards */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 space-y-5">
            <h3 className="text-xs font-mono uppercase text-gray-500 dark:text-gray-300 tracking-widest font-bold flex items-center gap-2">
              <Shield className="w-4 h-4 accent-text" /> Cryptographic Integrity Settings
            </h3>

            <div className="space-y-4">
              {/* Encryption input */}
              <div className="space-y-2">
                <label className="text-[10px] text-gray-400 font-mono uppercase tracking-wider font-bold">Zero-Knowledge Private Key Hash</label>
                <div className="relative">
                  <Key className="w-4 h-4 text-purple-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={encryptionKey}
                    onChange={(e) => setEncryptionKey(e.target.value)}
                    className="w-full glass-input pl-11 bg-white/5 border-white/5 text-xs font-semibold"
                  />
                </div>
              </div>

              {/* Theme & Accent Pickers in Settings */}
              <div className="p-4 rounded-2xl bg-black/5 dark:bg-black/40 border border-black/5 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-black dark:text-white">OS Accent Theme Color</div>
                  <div className="text-[9px] text-gray-400 font-mono font-bold uppercase tracking-wider">CHOOSE PREFERENTIAL ACCENT SPECTRUM</div>
                </div>
                <div className="flex items-center gap-2.5">
                  {accentColors.map((acc) => (
                    <motion.button
                      key={acc.name}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setAccentColor(acc.name);
                        addAiLog(`System Settings: Accent color changed to ${acc.name}.`);
                      }}
                      className={`w-6 h-6 rounded-full ${acc.class} transition-transform ${
                        accentColor === acc.name ? "scale-110 ring-2 ring-black dark:ring-white ring-offset-2 ring-offset-white dark:ring-offset-black" : "opacity-85"
                      }`}
                      title={`Accent: ${acc.name}`}
                    />
                  ))}
                </div>
              </div>

              {/* Theme Light/Dark Mode Switcher */}
              <div className="p-4 rounded-2xl bg-black/5 dark:bg-black/40 border border-black/5 dark:border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-black dark:text-white">Active Display Interface</div>
                  <div className="text-[9px] text-gray-400 font-mono font-bold uppercase tracking-wider">TOGGLE LIGHT OR DARK VISUAL GRID</div>
                </div>
                <button
                  onClick={() => {
                    setTheme(theme === "dark" ? "light" : "dark");
                    addAiLog(`System Settings: Display theme updated to ${theme === "dark" ? "light" : "dark"}.`);
                  }}
                  className="px-3 py-2 bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-300 rounded-xl text-xs font-mono font-bold uppercase tracking-wider"
                >
                  {theme} mode
                </button>
              </div>

              {/* Offline local-first toggle */}
              <div className="p-4 rounded-2xl bg-black/5 dark:bg-black/40 border border-black/5 dark:border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-black dark:text-white">Local-First Sandbox Mode</div>
                  <div className="text-[9px] text-gray-400 font-mono font-bold uppercase tracking-wider">NEURAL DATA NEVER LEAVES DEVICE PATH</div>
                </div>
                <button
                  onClick={() => {
                    setOfflineMode(!offlineMode);
                    addAiLog(`System Settings: Local-first offline mode toggled to ${!offlineMode}.`);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                    offlineMode
                      ? "bg-purple-950/10 dark:bg-purple-950/25 border border-purple-500/40 text-purple-600 dark:text-purple-300"
                      : "bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-gray-400"
                  }`}
                >
                  {offlineMode ? "SECURE LOCAL" : "CLOUD ACCELERATION"}
                </button>
              </div>
            </div>
          </div>

          {/* Backup settings */}
          <div className="glass-panel p-6 space-y-4">
            <h3 className="text-xs font-mono uppercase text-gray-500 dark:text-gray-300 tracking-widest font-bold flex items-center gap-1.5">
              <Database className="w-4 h-4 text-cyan-500" /> Decrypted System Backup Database
            </h3>

            <div className="space-y-4 text-xs font-mono">
              <div className="font-semibold text-black dark:text-gray-300">
                <span className="text-gray-400 uppercase text-[10px] tracking-wider block mb-1">BACKUP REGISTRY:</span>
                {backupLogs}
              </div>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => {
                  addAiLog("System Settings: Commencing emergency manual backup download.");
                }}
                className="px-4 py-2.5 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[10px] rounded-xl text-cyan-600 dark:text-cyan-300 font-bold uppercase tracking-wider"
              >
                DOWNLOAD EMERGENCY ZERO-KNOWLEDGE BACKUP ZIP
              </motion.button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Save action */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel-accent p-6 space-y-4 text-center">
            <h3 className="text-xs font-mono uppercase accent-text tracking-widest font-bold">
              Save Registry States
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
              Commit active projects, tasks breakdown metrics, and custom automation rules permanently to secure client storage.
            </p>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSaveSettings}
              disabled={saving}
              className="w-full py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 rounded-xl text-xs font-mono font-bold uppercase text-white shadow-md shadow-purple-600/20 flex items-center justify-center gap-1.5"
            >
              {saving ? (
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
              ) : showCheck ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : null}
              {saving ? "SAVING CONFIG..." : showCheck ? "CONFIG VERIFIED!" : "WRITE TO REGISTRY"}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
