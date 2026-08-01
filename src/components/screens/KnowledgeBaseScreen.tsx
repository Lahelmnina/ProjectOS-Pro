"use client";

import React, { useState } from "react";
import { useOSState, KnowledgeNode } from "@/context/AppContext";
import { BookOpen, Search, Plus, Tag, FileText, Code, Link as LinkIcon, Sparkles } from "lucide-react";

export default function KnowledgeBaseScreen() {
  const { knowledgeBase, setKnowledgeBase, addAiLog } = useOSState();
  const [selectedNodeId, setSelectedNodeId] = useState(knowledgeBase[0]?.id || "");
  const [searchQuery, setSearchQuery] = useState("");

  const activeNode = knowledgeBase.find((n) => n.id === selectedNodeId) || knowledgeBase[0];

  const handleCreateNode = () => {
    const newNode: KnowledgeNode = {
      id: `know-${Date.now()}`,
      title: "New Decrypted Brain Pattern",
      type: "idea",
      content: "# Quantum Decryption & Edge Models\nDocumenting local-first zero-knowledge databases setup.",
      connections: ["proj-2"],
      tags: ["Security", "Local-first"],
      summary: "Newly generated intelligence model regarding zero-knowledge databases.",
    };
    setKnowledgeBase((prev) => [...prev, newNode]);
    setSelectedNodeId(newNode.id);
    addAiLog(`Second Brain: Created intellectual note "${newNode.title}".`);
  };

  const filteredNodes = knowledgeBase.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white glow-text-purple">
            KNOWLEDGE BASE
          </h2>
          <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">
            Personal Second Brain & Semantic Information Nexus
          </p>
        </div>
        <button
          onClick={handleCreateNode}
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-lg text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-1.5 hover:from-purple-500 transition-all shadow-[0_0_12px_rgba(139,92,246,0.3)]"
        >
          <Plus className="w-4 h-4" /> Seed Note
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT COLUMN: Sidebar search & Note list */}
        <div className="lg:col-span-1 space-y-4">
          <div className="glass-panel p-4 border-white/5 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-purple-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search index or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full glass-input pl-9 bg-white/5 border-white/5 text-xs"
              />
            </div>

            <div className="space-y-1.5 max-h-[350px] overflow-y-auto pr-1">
              {filteredNodes.map((node) => {
                const isSelected = node.id === selectedNodeId;
                const isDoc = node.type === "document";
                const isCode = node.type === "code";

                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`w-full p-3 rounded-lg text-left border flex items-start gap-2.5 transition-all ${
                      isSelected
                        ? "bg-purple-950/20 border-purple-500 text-white shadow-[0_0_10px_rgba(139,92,246,0.15)]"
                        : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    {isDoc ? (
                      <FileText className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    ) : isCode ? (
                      <Code className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <BookOpen className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    )}

                    <div className="space-y-1 overflow-hidden">
                      <div className="font-bold text-xs truncate text-gray-200">
                        {node.title}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {node.tags.map((tag, i) => (
                          <span key={i} className="text-[8px] font-mono uppercase bg-black/40 px-1 py-0.5 rounded text-cyan-400">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* MIDDLE & RIGHT: Content editor simulator */}
        <div className="lg:col-span-2 space-y-6">
          {activeNode ? (
            <div className="space-y-6">
              <div className="glass-panel p-6 border-white/5 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-widest">
                      Type: {activeNode.type}
                    </span>
                    <h3 className="text-2xl font-bold text-white">
                      {activeNode.title}
                    </h3>
                  </div>

                  <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-gray-400 uppercase">
                    ID: {activeNode.id}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-xs font-mono text-gray-300 leading-relaxed whitespace-pre-wrap min-h-48">
                  {activeNode.content}
                </div>
              </div>

              {/* AI Auto Summary & connections */}
              <div className="glass-panel-purple p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-mono uppercase text-purple-400 tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" /> AI Summary & Bidirectional Links
                  </h4>
                  <span className="text-[9px] text-gray-500 font-mono">INDEXED IN GRAPH SECURELY</span>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed">
                  {activeNode.summary || "Generating real-time semantic summary. Mapping context paths."}
                </p>

                <div className="space-y-1 pt-2 border-t border-white/5">
                  <div className="text-[10px] text-gray-500 font-mono uppercase">Semantic Connections</div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {activeNode.connections.map((conn, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded bg-purple-950/20 border border-purple-500/20 text-[10px] font-mono text-purple-400">
                        🔗 connected to: {conn}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-12 text-center text-sm text-gray-500 font-mono uppercase">
              Select or seed a brain pattern to display index details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
