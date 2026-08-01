"use client";

import React, { useState } from "react";
import { useOSState } from "@/context/AppContext";
import { Shield, Key, Database, RefreshCw, Check, Heart } from "lucide-react";

export default function SettingsScreen() {
  const { addAiLog } = useOSState();

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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-white glow-text-purple">
          SYSTEM SETTINGS
        </h2>
        <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">
          Local-First Encryption, API Keys & Sandbox Workspace Configuration
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT & MIDDLE: Settings configuration cards */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 border-white/5 space-y-5">
            <h3 className="text-sm font-mono uppercase text-gray-300 tracking-wider flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-purple-400" /> Cryptographic Integrity Settings
            </h3>

            <div className="space-y-4">
              {/* Encryption input */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-400 font-mono uppercase">Zero-Knowledge Private Key Hash</label>
                <div className="relative">
                  <Key className="w-4 h-4 text-purple-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={encryptionKey}
                    onChange={(e) => setEncryptionKey(e.target.value)}
                    className="w-full glass-input pl-10 bg-white/5 border-white/5 text-xs"
                  />
                </div>
              </div>

              {/* Offline local-first toggle */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Local-First Sandbox Mode</div>
                  <div className="text-[10px] text-gray-500 font-mono">NEURAL DATA NEVER LEAVES DEVICE PATH</div>
                </div>
                <button
                  onClick={() => {
                    setOfflineMode(!offlineMode);
                    addAiLog(`System Settings: Local-first offline mode toggled to ${!offlineMode}.`);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                    offlineMode
                      ? "bg-purple-950/20 border border-purple-500/40 text-purple-300"
                      : "bg-white/5 border border-white/5 text-gray-500"
                  }`}
                >
                  {offlineMode ? "SECURE LOCAL" : "CLOUD ACCELERATION"}
                </button>
              </div>
            </div>
          </div>

          {/* Backup settings */}
          <div className="glass-panel p-6 border-white/5 space-y-4">
            <h3 className="text-sm font-mono uppercase text-gray-300 tracking-wider flex items-center gap-1.5">
              <Database className="w-4 h-4 text-cyan-400" /> Decrypted System Backup Database
            </h3>

            <div className="space-y-3 text-xs font-mono">
              <div>
                <span className="text-gray-500">BACKUP REGISTRY:</span> <span className="text-white font-semibold">{backupLogs}</span>
              </div>
              <button
                onClick={() => {
                  addAiLog("System Settings: Commencing emergency manual backup download.");
                }}
                className="px-4 py-2 bg-white/5 border border-white/5 hover:bg-white/10 text-[11px] rounded-lg text-cyan-300 font-bold"
              >
                DOWNLOAD EMERGENCY ZERO-KNOWLEDGE BACKUP ZIP
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Save action */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel-purple p-6 space-y-4 text-center">
            <h3 className="text-xs font-mono uppercase text-purple-400 tracking-wider">
              Save Registry States
            </h3>
            <p className="text-xs text-gray-400 leading-normal">
              Commit active projects, tasks breakdown metrics, and custom automation rules permanently to secure client storage.
            </p>

            <button
              onClick={handleSaveSettings}
              disabled={saving}
              className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg text-xs font-mono font-bold uppercase text-white shadow-[0_0_12px_rgba(139,92,246,0.3)] flex items-center justify-center gap-1.5"
            >
              {saving ? (
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
              ) : showCheck ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : null}
              {saving ? "SAVING CONFIG..." : showCheck ? "CONFIG VERIFIED!" : "WRITE TO REGISTRY"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
