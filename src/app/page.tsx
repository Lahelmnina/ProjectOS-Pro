"use client";

import React, { useState } from "react";
import { useOSState } from "@/context/AppContext";

// Screen Components
import SplashScreen from "@/components/screens/SplashScreen";
import AuthScreen from "@/components/screens/AuthScreen";
import OnboardingScreen from "@/components/screens/OnboardingScreen";
import CommandCenterScreen from "@/components/screens/CommandCenterScreen";
import ProjectsDashboardScreen from "@/components/screens/ProjectsDashboardScreen";
import ProjectDetailScreen from "@/components/screens/ProjectDetailScreen";
import TaskManagerScreen from "@/components/screens/TaskManagerScreen";
import CalendarScreen from "@/components/screens/CalendarScreen";
import AIPmScreen from "@/components/screens/AIPmScreen";
import KnowledgeBaseScreen from "@/components/screens/KnowledgeBaseScreen";
import GraphViewScreen from "@/components/screens/GraphViewScreen";
import MemoryCenterScreen from "@/components/screens/MemoryCenterScreen";
import GoalsScreen from "@/components/screens/GoalsScreen";
import HabitsScreen from "@/components/screens/HabitsScreen";
import FinanceScreen from "@/components/screens/FinanceScreen";
import AnalyticsScreen from "@/components/screens/AnalyticsScreen";
import AutomationBuilderScreen from "@/components/screens/AutomationBuilderScreen";
import AgentMarketplaceScreen from "@/components/screens/AgentMarketplaceScreen";
import SettingsScreen from "@/components/screens/SettingsScreen";
import ProfileScreen from "@/components/screens/ProfileScreen";

// Icons for navigation list
import {
  Sparkles,
  Lock,
  UserCheck,
  LayoutDashboard,
  Layers,
  FileText,
  ListTodo,
  Calendar,
  Bot,
  BookOpen,
  Share2,
  Brain,
  Target,
  Zap,
  DollarSign,
  LineChart,
  Repeat,
  ShoppingBag,
  Settings,
  User,
  Activity,
  Terminal,
  Search,
  Sliders,
  ChevronRight
} from "lucide-react";

export default function Page() {
  const { currentScreen, setCurrentScreen, userStats, aiLog } = useOSState();

  // Authentication & Onboarding simulation flows
  const [bootCompleted, setBootCompleted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [onboardingDone, setOnboardingDone] = useState(false);

  // Command Search Bar state (Spotlight search style)
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [chosenProjectId, setChosenProjectId] = useState("proj-1");

  // Navigation Items
  const navItems = [
    { number: 1, label: "Splash Screen", icon: Sparkles, category: "Core Gateway" },
    { number: 2, label: "Authentication", icon: Lock, category: "Core Gateway" },
    { number: 3, label: "Onboarding AI Setup", icon: UserCheck, category: "Core Gateway" },
    { number: 4, label: "Command Center", icon: LayoutDashboard, category: "Primary Workspace" },
    { number: 5, label: "Projects Dashboard", icon: Layers, category: "Primary Workspace" },
    { number: 6, label: "Project Detail", icon: FileText, category: "Primary Workspace" },
    { number: 7, label: "Task Manager", icon: ListTodo, category: "Primary Workspace" },
    { number: 8, label: "Smart Calendar", icon: Calendar, category: "Time & Rhythm" },
    { number: 9, label: "AI PM Agent Check-In", icon: Bot, category: "Artificial Intelligence" },
    { number: 10, label: "Knowledge Base", icon: BookOpen, category: "Information Core" },
    { number: 11, label: "Semantec Graph View", icon: Share2, category: "Information Core" },
    { number: 12, label: "Memory Center", icon: Brain, category: "Information Core" },
    { number: 13, label: "Goals Architecture", icon: Target, category: "Quantified Life" },
    { number: 14, label: "Habits Matrix", icon: Zap, category: "Quantified Life" },
    { number: 15, label: "Capital Monitor", icon: DollarSign, category: "Quantified Life" },
    { number: 16, label: "Neural Analytics", icon: LineChart, category: "Quantified Life" },
    { number: 17, label: "Automation Flows", icon: Repeat, category: "Artificial Intelligence" },
    { number: 18, label: "Agent Marketplace", icon: ShoppingBag, category: "Artificial Intelligence" },
    { number: 19, label: "System Settings", icon: Settings, category: "Core Gateway" },
    { number: 20, label: "Neuro Profile", icon: User, category: "Core Gateway" },
  ];

  // Screen selection routing handler
  const handleSelectProjectFromDashboard = (projId: string) => {
    setChosenProjectId(projId);
    setCurrentScreen(6); // Switch to Project Detail (Screen 6)
  };

  const renderActiveWorkspaceScreen = () => {
    switch (currentScreen) {
      case 1:
        return <SplashScreen onComplete={() => setCurrentScreen(2)} />;
      case 2:
        return <AuthScreen onSuccess={() => setCurrentScreen(3)} />;
      case 3:
        return <OnboardingScreen onComplete={() => {
          setOnboardingDone(true);
          setCurrentScreen(4); // Enter Command Center
        }} />;
      case 4:
        return <CommandCenterScreen />;
      case 5:
        return <ProjectsDashboardScreen onSelectProject={handleSelectProjectFromDashboard} />;
      case 6:
        return <ProjectDetailScreen projectId={chosenProjectId} onBack={() => setCurrentScreen(5)} />;
      case 7:
        return <TaskManagerScreen />;
      case 8:
        return <CalendarScreen />;
      case 9:
        return <AIPmScreen />;
      case 10:
        return <KnowledgeBaseScreen />;
      case 11:
        return <GraphViewScreen />;
      case 12:
        return <MemoryCenterScreen />;
      case 13:
        return <GoalsScreen />;
      case 14:
        return <HabitsScreen />;
      case 15:
        return <FinanceScreen />;
      case 16:
        return <AnalyticsScreen />;
      case 17:
        return <AutomationBuilderScreen />;
      case 18:
        return <AgentMarketplaceScreen />;
      case 19:
        return <SettingsScreen />;
      case 20:
        return <ProfileScreen />;
      default:
        return <CommandCenterScreen />;
    }
  };

  // Helper groupings for visual sidebar separation
  const categories = ["Core Gateway", "Primary Workspace", "Time & Rhythm", "Artificial Intelligence", "Information Core", "Quantified Life"];

  // Command search bar filters
  const filteredNavItems = navItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#030303] text-gray-100 overflow-hidden relative">
      {/* Absolute Ambient Background Lights matching premium reference screens */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-purple-900/10 blur-[130px] -top-20 -left-20 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-900/5 blur-[120px] bottom-10 right-10 pointer-events-none" />

      {/* RENDER DYNAMIC INITIAL SEQUENCES BEFORE WORKSPACE LOADING (IF SELECTED AS DEFAULT NAVIGATION) */}
      {currentScreen === 1 && <SplashScreen onComplete={() => setCurrentScreen(2)} />}
      {currentScreen === 2 && <AuthScreen onSuccess={() => setCurrentScreen(3)} />}
      {currentScreen === 3 && (
        <OnboardingScreen onComplete={() => {
          setOnboardingDone(true);
          setCurrentScreen(4);
        }} />
      )}

      {/* CORE OPERATING SYSTEM INTERFACE PANEL */}
      <div className="flex w-full h-screen overflow-hidden">

        {/* LEFT WORKSPACE SIDEBAR PANEL: Premium Dark Glass */}
        <aside className="w-80 h-full border-r border-white/5 bg-black/60 backdrop-blur-2xl flex flex-col justify-between p-5 z-20 flex-shrink-0 overflow-y-auto">
          <div className="space-y-6">

            {/* Logo Brand Title */}
            <div className="flex items-center gap-2.5 pb-4 border-b border-white/5 cursor-pointer" onClick={() => setCurrentScreen(4)}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center font-bold text-white shadow-[0_0_12px_rgba(139,92,246,0.35)]">
                PM
              </div>
              <div>
                <h1 className="text-sm font-extrabold tracking-widest text-white leading-none">
                  PROJECT<span className="text-purple-400">OS</span> PRO
                </h1>
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block mt-0.5">
                  Cognitive operating brain
                </span>
              </div>
            </div>

            {/* Quick Spotlight Search bar trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-between text-xs text-gray-400 font-mono"
            >
              <span className="flex items-center gap-1.5"><Search className="w-3.5 h-3.5 text-purple-400" /> Search OS Modules</span>
              <span className="px-1.5 py-0.5 bg-white/10 rounded text-[9px] font-bold">⌘K</span>
            </button>

            {/* Navigation Lists categorized */}
            <div className="space-y-5">
              {categories.map((category) => {
                const itemsInCat = navItems.filter((i) => i.category === category);
                return (
                  <div key={category} className="space-y-1.5">
                    <h2 className="text-[9px] font-mono font-extrabold uppercase text-gray-500 tracking-widest pl-1">
                      {category}
                    </h2>
                    <div className="space-y-0.5">
                      {itemsInCat.map((item) => {
                        const Icon = item.icon;
                        const isCurrent = currentScreen === item.number;

                        return (
                          <button
                            key={item.number}
                            onClick={() => setCurrentScreen(item.number)}
                            className={`w-full py-2 px-2.5 rounded-lg text-left text-xs font-medium flex items-center justify-between border transition-all ${
                              isCurrent
                                ? "bg-purple-950/20 border-purple-500/20 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                                : "bg-transparent border-transparent text-gray-400 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <Icon className={`w-4 h-4 ${isCurrent ? "text-purple-400" : "text-gray-400"}`} />
                              <span>{item.label}</span>
                            </span>
                            <span className="text-[9px] font-mono text-gray-600 font-bold">
                              {item.number}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer User Profile Widget */}
          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-900 flex items-center justify-center text-xs font-mono font-bold text-white border border-purple-500/30">
                ST
              </div>
              <div>
                <div className="text-xs font-bold text-white">SaaS Specialist</div>
                <div className="text-[10px] text-purple-400 font-mono">FLOW STATE ACTIVE</div>
              </div>
            </div>
            <button
              onClick={() => setCurrentScreen(19)}
              className="p-1.5 bg-white/5 border border-white/5 rounded hover:bg-white/10"
              title="System Settings"
            >
              <Settings className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </aside>

        {/* RIGHT WORKSPACE CONSOLE PANEL: Main views rendered */}
        <main className="flex-grow h-full overflow-y-auto p-8 relative z-10">

          {/* Top workspace action bar */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Activity className="w-4 h-4 text-cyan-400 animate-pulse" /> Focus Index: <span className="text-white font-bold">{userStats.concentration}%</span>
              </span>
              <span className="text-gray-500 border-l border-white/5 pl-4">
                Energy: <span className="text-white font-bold">{userStats.energy}%</span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-purple-300">
              <Terminal className="w-4 h-4 text-purple-400" /> Secure Sandbox Node
            </div>
          </div>

          {/* Render Active screen */}
          {renderActiveWorkspaceScreen()}
        </main>
      </div>

      {/* MODAL COMMAND PANEL TRIGGERED BY COMMAND BAR / CMD+K KEY */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-lg glass-panel-purple p-6 border-white/10 shadow-2xl relative space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <h3 className="text-xs font-mono uppercase text-purple-400 tracking-wider flex items-center gap-1.5">
                <Search className="w-4 h-4" /> Cognitive Command Console
              </h3>
              <button
                onClick={() => setSearchOpen(false)}
                className="text-[10px] text-gray-500 font-mono hover:text-white uppercase"
              >
                close
              </button>
            </div>

            <input
              type="text"
              placeholder="Search screen or system action..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full glass-input bg-white/5 border-white/5 text-sm"
              autoFocus
            />

            <div className="max-h-48 overflow-y-auto space-y-1 pr-1 font-mono text-xs">
              {filteredNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.number}
                    onClick={() => {
                      setCurrentScreen(item.number);
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="w-full p-2.5 rounded-lg hover:bg-purple-950/25 flex items-center justify-between text-gray-300 hover:text-white text-left"
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-purple-400" />
                      <span>{item.label}</span>
                    </span>
                    <span className="text-[10px] text-gray-500">Screen {item.number}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
