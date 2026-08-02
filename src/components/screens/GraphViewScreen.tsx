"use client";

import React, { useState } from "react";
import { useOSState } from "@/context/AppContext";
import { Share2, Compass, Circle, HelpCircle, Activity } from "lucide-react";

export default function GraphViewScreen() {
  const { projects, tasks, knowledgeBase, addAiLog } = useOSState();

  // Selected Node Details
  const [selectedNode, setSelectedNode] = useState<any>({
    id: "g-core",
    label: "ProjectOS Core",
    type: "Core Module",
    desc: "Central operating system coordinating all human and artificial intelligence cycles.",
  });

  // Construct coordinates for nice orbital graph layout
  const nodes = [
    { id: "g-core", label: "ProjectOS Core", type: "Core Module", cx: 250, cy: 220, color: "#8B5CF6", desc: "Central OS coordinating active project modules." },
    { id: "g-p1", label: "DriverPilot AI", type: "Project", cx: 120, cy: 120, color: "#06B6D4", desc: "Autonomous self-driving drone navigator and obstacle controller." },
    { id: "g-p2", label: "Quantum Database Sync", type: "Project", cx: 380, cy: 120, color: "#06B6D4", desc: "Sub-millisecond data sync engine across geographic clusters." },
    { id: "g-t1", label: "YOLO Optimization", type: "Task", cx: 80, cy: 250, color: "#F97316", desc: "Optimize TensorRT inference execution layers down to sub-millisecond intervals." },
    { id: "g-t2", label: "AES encryption", type: "Task", cx: 420, cy: 250, color: "#F97316", desc: "Refactor database logs encryption to zero-knowledge standard." },
    { id: "g-k1", label: "CRDT Research notes", type: "Knowledge", cx: 340, cy: 340, color: "#10B981", desc: "Conflict-free replicated datasets implementation guidelines." },
    { id: "g-k2", label: "LiDAR Flight manuals", type: "Knowledge", cx: 160, cy: 340, color: "#10B981", desc: "LiDAR synchronization architectures and flight log parameters." },
  ];

  const connections = [
    { from: "g-core", to: "g-p1" },
    { from: "g-core", to: "g-p2" },
    { from: "g-p1", to: "g-t1" },
    { from: "g-p2", to: "g-t2" },
    { from: "g-p2", to: "g-k1" },
    { from: "g-p1", to: "g-k2" },
    { from: "g-k1", to: "g-k2" },
  ];

  const handleNodeClick = (node: any) => {
    setSelectedNode(node);
    addAiLog(`Graph View: Selected node "${node.label}" (Type: ${node.type})`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white glow-text-purple">
            SEMANTEC GRAPH VIEW
          </h2>
          <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">
            Obsidian-Inspired Interconnected Digital Brain Map
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono uppercase">
          <Activity className="w-4 h-4 text-purple-400 animate-pulse" /> Live Graph Nodes Connected
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT & MIDDLE: Interactive SVG Canvas Map */}
        <div className="lg:col-span-2 glass-panel p-4 border-white/5 relative overflow-hidden flex flex-col justify-between min-h-[460px]">

          {/* Legend */}
          <div className="flex gap-4 text-[10px] font-mono text-gray-400 border-b border-white/5 pb-3">
            <span className="flex items-center gap-1.5"><Circle className="w-2.5 h-2.5 fill-[#8B5CF6] text-transparent" /> Core</span>
            <span className="flex items-center gap-1.5"><Circle className="w-2.5 h-2.5 fill-[#06B6D4] text-transparent" /> Projects</span>
            <span className="flex items-center gap-1.5"><Circle className="w-2.5 h-2.5 fill-[#F97316] text-transparent" /> Tasks</span>
            <span className="flex items-center gap-1.5"><Circle className="w-2.5 h-2.5 fill-[#10B981] text-transparent" /> Brain Notes</span>
          </div>

          {/* SVG Canvas Container */}
          <div className="flex-grow flex items-center justify-center py-6 relative">
            <svg
              viewBox="0 0 500 400"
              className="w-full max-w-lg h-auto select-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Glow Filter for connections and selected nodes */}
                <filter id="glow-violet" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Render Connection Lines */}
              {connections.map((conn, idx) => {
                const nodeFrom = nodes.find((n) => n.id === conn.from);
                const nodeTo = nodes.find((n) => n.id === conn.to);
                if (!nodeFrom || !nodeTo) return null;

                const isHighlight = selectedNode?.id === conn.from || selectedNode?.id === conn.to;

                return (
                  <line
                    key={idx}
                    x1={nodeFrom.cx}
                    y1={nodeFrom.cy}
                    x2={nodeTo.cx}
                    y2={nodeTo.cy}
                    stroke={isHighlight ? "#a78bfa" : "rgba(255, 255, 255, 0.08)"}
                    strokeWidth={isHighlight ? 2 : 1}
                    className="transition-all duration-300"
                    strokeDasharray={isHighlight ? "4,4" : "none"}
                  />
                );
              })}

              {/* Render Nodes */}
              {nodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;

                return (
                  <g
                    key={node.id}
                    className="cursor-pointer group"
                    onClick={() => handleNodeClick(node)}
                  >
                    {/* Glowing Aura for selected */}
                    {isSelected && (
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r={18}
                        fill={node.color}
                        opacity={0.3}
                        filter="url(#glow-violet)"
                        className="animate-pulse"
                      />
                    )}

                    {/* Main Node circle */}
                    <circle
                      cx={node.cx}
                      cy={node.cy}
                      r={isSelected ? 10 : 7}
                      fill={node.color}
                      className="transition-all duration-300 group-hover:r-11"
                    />

                    {/* Text Label */}
                    <text
                      x={node.cx}
                      y={node.cy - 14}
                      fill={isSelected ? "#ffffff" : "#9ca3af"}
                      fontSize={isSelected ? 9 : 8}
                      fontWeight={isSelected ? "bold" : "normal"}
                      textAnchor="middle"
                      className="font-mono transition-all duration-300 select-none pointer-events-none"
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <p className="text-[10px] text-gray-500 font-mono text-center uppercase">
            Double-click or click individual orbital node dots to expand cognitive metrics
          </p>
        </div>

        {/* RIGHT COLUMN: Node Metadata details panel */}
        <div className="lg:col-span-1 space-y-6">
          {selectedNode ? (
            <div className="glass-panel-purple p-6 space-y-4 animate-slide-down">
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-purple-400 font-bold uppercase tracking-widest">
                  Metadata Hub: {selectedNode.type}
                </span>
                <h3 className="text-lg font-bold text-white glow-text-purple">
                  {selectedNode.label}
                </h3>
              </div>

              <div className="border-t border-b border-white/5 py-4 my-2 text-xs text-gray-300 leading-relaxed font-mono">
                {selectedNode.desc}
              </div>

              <div className="space-y-2 text-xs">
                <div className="text-[10px] text-gray-500 font-mono uppercase">
                  Connected Nodes
                </div>
                <div className="flex flex-col gap-1.5 font-mono text-[10px]">
                  {connections
                    .filter((c) => c.from === selectedNode.id || c.to === selectedNode.id)
                    .map((c, idx) => {
                      const otherId = c.from === selectedNode.id ? c.to : c.from;
                      const otherNode = nodes.find((n) => n.id === otherId);
                      return (
                        <div key={idx} className="p-2 bg-black/40 border border-white/5 rounded text-cyan-300">
                          🔗 {otherNode?.label || otherId} ({otherNode?.type})
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-6 text-center text-xs text-gray-500 font-mono uppercase">
              Click a graph node on the map to audit semantic details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
