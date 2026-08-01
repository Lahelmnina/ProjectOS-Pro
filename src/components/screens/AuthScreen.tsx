"use client";

import React, { useState } from "react";
import { Lock, User, Eye, Fingerprint, ShieldAlert, Cpu } from "lucide-react";

interface AuthScreenProps {
  onSuccess: () => void;
}

export default function AuthScreen({ onSuccess }: AuthScreenProps) {
  const [userName, setUserName] = useState("SaaS Specialist");
  const [passkey, setPasskey] = useState("••••••••••••");
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
        }, 500);
      }, 1000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-[#030303] flex items-center justify-center p-6 z-40">
      {/* Background neon flares */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-violet-800/5 blur-[150px] -top-10 -right-10" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-900/5 blur-[120px] -bottom-10 -left-10" />

      <div className="w-full max-w-md glass-panel p-8 relative space-y-6 border-white/10 shadow-2xl">
        <div className="text-center">
          <div className="inline-flex p-3 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4 animate-pulse">
            <Cpu className="w-8 h-8 text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white font-sans">
            AUTHORIZED GATEWAY
          </h2>
          <p className="text-xs text-gray-400 mt-1 font-mono uppercase tracking-widest">
            ProjectOS Encrypted Workspace
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs text-gray-400 uppercase tracking-wider font-mono">User Signature</label>
            <div className="relative">
              <User className="w-4 h-4 text-purple-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full glass-input pl-10 bg-white/5 border-white/5 text-sm"
                placeholder="Enter workspace name"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-gray-400 uppercase tracking-wider font-mono">Local Decryption Key</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-cyan-400 absolute left-3 top-3.5" />
              <input
                type="password"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                className="w-full glass-input pl-10 bg-white/5 border-white/5 text-sm"
                placeholder="Enter your key"
              />
              <Eye className="w-4 h-4 text-gray-500 absolute right-3 top-3.5 cursor-pointer hover:text-white" />
            </div>
          </div>
        </div>

        {/* Biometric simulation widget */}
        <div className="border border-white/5 rounded-xl bg-black/40 p-4 text-center space-y-3 relative overflow-hidden">
          {scanning && <div className="absolute inset-0 biometric-scanner-line" />}

          <div className="flex items-center justify-center">
            <button
              onClick={triggerBiometricScan}
              disabled={scanning}
              className={`p-4 rounded-full border transition-all duration-300 ${
                scanning
                  ? "bg-purple-900/20 border-purple-500 shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                  : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]"
              }`}
            >
              <Fingerprint className={`w-10 h-10 ${scanning ? "text-purple-400 animate-pulse" : "text-gray-300"}`} />
            </button>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
              {scanStatus}
            </p>
            <p className="text-[10px] text-gray-500 font-mono">
              TOUCH FINGERPRINT DIAL OR PRESS SCAN TO ACCESS COGNITIVE LAYER
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onSuccess}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-sm tracking-widest uppercase hover:from-purple-500 hover:to-cyan-400 transition-all shadow-[0_0_20px_rgba(139,92,246,0.35)]"
        >
          Initialize Sandbox Bypass
        </button>

        {/* Encryption alert */}
        <div className="flex items-center gap-2 justify-center text-[10px] text-gray-400 font-mono">
          <ShieldAlert className="w-3.5 h-3.5 text-orange-400" />
          <span>ZERO-KNOWLEDGE PRIVATE STORAGE VERIFIED</span>
        </div>
      </div>
    </div>
  );
}
