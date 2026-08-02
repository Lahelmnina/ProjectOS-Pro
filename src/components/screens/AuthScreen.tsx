"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, User, Eye, EyeOff, Fingerprint, ShieldAlert, Cpu } from "lucide-react";

interface AuthScreenProps {
  onSuccess: () => void;
}

export default function AuthScreen({ onSuccess }: AuthScreenProps) {
  const [userName, setUserName] = useState("SaaS Specialist");
  const [passkey, setPasskey] = useState("12345678");
  const [showPass, setShowPass] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState("IDLE");

  const triggerBiometricScan = () => {
    setScanning(true);
    setScanStatus("SCANNING NEURAL MATRIX...");
    setTimeout(() => {
      setScanStatus("DECRYPTING PERSONAL KEY...");
      setTimeout(() => {
        setScanStatus("ACCESS GRANTED");
        setTimeout(() => {
          onSuccess();
        }, 400);
      }, 800);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-[#030303] flex items-center justify-center p-6 z-40">
      {/* Background neon flares */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[rgba(var(--accent-rgb),0.06)] blur-[150px] -top-10 -right-10" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-900/5 blur-[120px] -bottom-10 -left-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 18 }}
        className="w-full max-w-md glass-panel p-8 relative space-y-6 border-white/10 shadow-2xl"
      >
        <div className="text-center">
          <div className="inline-flex p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 mb-4">
            <Cpu className="w-8 h-8 accent-text animate-pulse" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white font-sans">
            AUTHORIZED GATEWAY
          </h2>
          <p className="text-[10px] text-gray-400 mt-1.5 font-mono uppercase tracking-[0.2em]">
            ProjectOS Encrypted Workspace
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] text-gray-400 uppercase tracking-wider font-mono font-bold">User Signature</label>
            <div className="relative">
              <User className="w-4 h-4 text-purple-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full glass-input pl-11 bg-white/5 border-white/5 text-sm font-semibold"
                placeholder="Enter workspace name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] text-gray-400 uppercase tracking-wider font-mono font-bold">Local Decryption Key</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-cyan-400 absolute left-3.5 top-3.5" />
              <input
                type={showPass ? "text" : "password"}
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                className="w-full glass-input pl-11 pr-10 bg-white/5 border-white/5 text-sm font-mono tracking-widest"
                placeholder="Enter your key"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-3.5 text-gray-400 hover:text-white transition-colors"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Biometric simulation widget */}
        <div className="border border-black/10 dark:border-white/5 rounded-2xl bg-black/40 p-5 text-center space-y-3.5 relative overflow-hidden">
          {scanning && <div className="absolute inset-0 biometric-scanner-line" />}

          <div className="flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={triggerBiometricScan}
              disabled={scanning}
              className={`p-4 rounded-full border transition-all duration-300 ${
                scanning
                  ? "bg-purple-900/20 border-purple-500 shadow-[0_0_25px_rgba(var(--accent-rgb),0.5)]"
                  : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]"
              }`}
            >
              <Fingerprint className={`w-10 h-10 ${scanning ? "accent-text animate-pulse" : "text-gray-300"}`} />
            </motion.button>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs font-mono font-extrabold tracking-widest text-cyan-400 uppercase animate-pulse">
              {scanStatus}
            </p>
            <p className="text-[9px] text-gray-500 font-mono uppercase tracking-wider leading-relaxed">
              Touch biometric scanner or press dial to sync neural decrypt key
            </p>
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={onSuccess}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-extrabold text-xs tracking-widest uppercase hover:opacity-95 transition-all shadow-[0_4px_20px_rgba(var(--accent-rgb),0.35)]"
        >
          Initialize Sandbox Bypass
        </motion.button>

        {/* Encryption alert */}
        <div className="flex items-center gap-2 justify-center text-[9px] text-gray-500 font-mono uppercase tracking-wider font-bold">
          <ShieldAlert className="w-4 h-4 text-orange-400" />
          <span>Zero-knowledge client encryption certified</span>
        </div>
      </motion.div>
    </div>
  );
}
