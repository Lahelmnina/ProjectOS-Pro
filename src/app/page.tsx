"use client";

import React, { useState, useEffect, useRef } from "react";
import { useOSState } from "@/context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

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
  ChevronRight,
  Sun,
  Moon,
  Palette
} from "lucide-react";

export default function Page() {
  const {
    currentScreen,
    setCurrentScreen,
    theme,
    setTheme,
    accentColor,
    setAccentColor,
    userStats,
    aiLog
  } = useOSState();

  // Onboarding simulation flows
  const [onboardingDone, setOnboardingDone] = useState(false);

  // Command Search Bar state (Spotlight search style)
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

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
    { number: 11, label: "Semantic Graph View", icon: Share2, category: "Information Core" },
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

  // Accent color choices
  const accentColors: { name: typeof accentColor; class: string }[] = [
    { name: "purple", class: "bg-purple-500" },
    { name: "cyan", class: "bg-cyan-500" },
    { name: "orange", class: "bg-orange-500" },
    { name: "green", class: "bg-green-500" },
    { name: "pink", class: "bg-pink-500" }
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

  // Global key listener for Ctrl+K / Cmd+K and Command Console Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
        setActiveIndex(0);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Update command index if filtered items list changes
  useEffect(() => {
    setActiveIndex(0);
  }, [searchQuery]);

  // Command console keyboard handling
  const handleCommandConsoleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % Math.max(1, filteredNavItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filteredNavItems.length) % Math.max(1, filteredNavItems.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredNavItems[activeIndex]) {
        setCurrentScreen(filteredNavItems[activeIndex].number);
        setSearchOpen(false);
        setSearchQuery("");
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setSearchOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen transition-colors duration-500 overflow-hidden relative font-sans">

      {/* Absolute Ambient Background Lights matching premium reference screens */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[rgba(var(--accent-rgb),0.12)] blur-[130px] -top-20 -left-20 pointer-events-none transition-all duration-700" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[rgba(var(--accent-rgb),0.07)] blur-[120px] bottom-10 right-10 pointer-events-none transition-all duration-700" />

      {/* CORE OPERATING SYSTEM INTERFACE PANEL */}
      <div className="flex w-full h-screen overflow-hidden">

        {/* LEFT WORKSPACE SIDEBAR PANEL: Premium Dark Glass */}
        <aside className="w-80 h-full border-r border-black/10 dark:border-white/5 bg-white/40 dark:bg-black/60 backdrop-blur-2xl flex flex-col justify-between p-5 z-20 flex-shrink-0 overflow-y-auto transition-all">
          <div className="space-y-6">

            {/* Logo Brand Title */}
            <div
              className="flex items-center gap-3 pb-4 border-b border-black/5 dark:border-white/5 cursor-pointer group"
              onClick={() => setCurrentScreen(4)}
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 flex items-center justify-center font-extrabold text-white shadow-[0_0_15px_rgba(var(--accent-rgb),0.4)]"
              >
                OS
              </motion.div>
              <div>
                <h1 className="text-sm font-extrabold tracking-widest text-black dark:text-white leading-none">
                  PROJECT<span className="accent-text font-black">OS</span> PRO
                </h1>
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block mt-1">
                  Cognitive operating brain
                </span>
              </div>
            </div>

            {/* Quick Spotlight Search bar trigger */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => {
                setSearchOpen(true);
                setActiveIndex(0);
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/5 dark:border-white/5 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 font-mono"
            >
              <span className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 accent-text" />
                <span>Search OS Modules</span>
              </span>
              <span className="px-1.5 py-0.5 bg-black/10 dark:bg-white/10 rounded-md text-[9px] font-bold">⌘K</span>
            </motion.button>

            {/* Navigation Lists categorized */}
            <div className="space-y-5">
              {categories.map((category) => {
                const itemsInCat = navItems.filter((i) => i.category === category);
                return (
                  <div key={category} className="space-y-1.5">
                    <h2 className="text-[9px] font-mono font-extrabold uppercase text-gray-400 dark:text-gray-500 tracking-widest pl-1">
                      {category}
                    </h2>
                    <div className="space-y-0.5">
                      {itemsInCat.map((item) => {
                        const Icon = item.icon;
                        const isCurrent = currentScreen === item.number;

                        return (
                          <motion.button
                            key={item.number}
                            whileHover={{ x: 2 }}
                            onClick={() => setCurrentScreen(item.number)}
                            className={`w-full py-2 px-2.5 rounded-xl text-left text-xs font-medium flex items-center justify-between border transition-all ${
                              isCurrent
                                ? "bg-white/60 dark:bg-purple-950/25 border-purple-500/20 text-black dark:text-white shadow-[0_4px_12px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                                : "bg-transparent border-transparent text-gray-600 dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <Icon className={`w-4 h-4 transition-colors ${isCurrent ? "accent-text" : "text-gray-400 dark:text-gray-500"}`} />
                              <span>{item.label}</span>
                            </span>
                            <span className="text-[9px] font-mono text-gray-400 dark:text-gray-600 font-semibold">
                              {item.number}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer User Profile & System Theme / Accent Controls */}
          <div className="pt-4 border-t border-black/5 dark:border-white/5 space-y-4">

            {/* Theme & Accent Pickers */}
            <div className="flex items-center justify-between px-1">
              {/* Theme switch */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-gray-500 hover:text-black dark:hover:text-white transition-all"
                  title="Toggle Light/Dark Theme"
                >
                  {theme === "dark" ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                </button>
                <span className="text-[10px] font-mono uppercase text-gray-400 tracking-wider">
                  {theme} mode
                </span>
              </div>

              {/* Accent choices */}
              <div className="flex items-center gap-1">
                {accentColors.map((acc) => (
                  <button
                    key={acc.name}
                    onClick={() => setAccentColor(acc.name)}
                    className={`w-3 h-3 rounded-full ${acc.class} transition-transform ${
                      accentColor === acc.name ? "scale-125 ring-2 ring-black dark:ring-white ring-offset-2 ring-offset-white dark:ring-offset-black" : "opacity-75 hover:opacity-100"
                    }`}
                    title={`Accent: ${acc.name}`}
                  />
                ))}
              </div>
            </div>

            {/* Profile Widget */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-xs font-mono font-bold text-white border border-white/10 shadow-sm">
                  ST
                </div>
                <div>
                  <div className="text-xs font-bold text-black dark:text-white">SaaS Specialist</div>
                  <div className="text-[9px] accent-text font-mono tracking-widest font-bold">FLOW STATE ACTIVE</div>
                </div>
              </div>
              <button
                onClick={() => setCurrentScreen(19)}
                className="p-2 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-xl hover:bg-black/10 dark:hover:bg-white/10"
                title="System Settings"
              >
                <Settings className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </aside>

        {/* RIGHT WORKSPACE CONSOLE PANEL: Main views rendered */}
        <main className="flex-grow h-full overflow-y-auto p-8 relative z-10 bg-transparent">

          {/* Top workspace action bar */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-black/5 dark:border-white/5">
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Activity className="w-4 h-4 text-cyan-500 animate-pulse" /> Focus Index: <span className="text-black dark:text-white font-black">{userStats.concentration}%</span>
              </span>
              <span className="text-gray-400 border-l border-black/10 dark:border-white/5 pl-4">
                Energy: <span className="text-black dark:text-white font-black">{userStats.energy}%</span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-gray-500 dark:text-purple-300">
              <Terminal className="w-4 h-4 accent-text" /> Secure Sandbox Node
            </div>
          </div>

          {/* Render Active screen with rich пружинные transitions */}
          <div className="relative w-full h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreen}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className="w-full h-full"
              >
                {renderActiveWorkspaceScreen()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* MODAL COMMAND PANEL TRIGGERED BY COMMAND BAR / CMD+K KEY */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
            {/* Backdrop click closer */}
            <div className="absolute inset-0" onClick={() => setSearchOpen(false)} />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="w-full max-w-xl glass-panel-accent p-6 border-white/10 shadow-2xl relative space-y-4 z-10"
              onKeyDown={handleCommandConsoleKeyDown}
            >
              <div className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-2">
                <h3 className="text-xs font-mono uppercase accent-text tracking-wider flex items-center gap-2 font-bold">
                  <Search className="w-4 h-4" /> Cognitive Command Console
                </h3>
                <span className="text-[9px] text-gray-400 font-mono">
                  Navigate with ↑↓ • Select with Enter
                </span>
              </div>

              <input
                type="text"
                placeholder="Search screen or system action..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full glass-input bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 text-sm"
                autoFocus
              />

              <div className="max-h-64 overflow-y-auto space-y-1 pr-1 font-mono text-xs scrollbar-thin">
                {filteredNavItems.length === 0 ? (
                  <div className="text-center py-6 text-gray-400">
                    No modules matches your query.
                  </div>
                ) : (
                  filteredNavItems.map((item, idx) => {
                    const Icon = item.icon;
                    const isActive = idx === activeIndex;
                    return (
                      <button
                        key={item.number}
                        onClick={() => {
                          setCurrentScreen(item.number);
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                        onMouseEnter={() => setActiveIndex(idx)}
                        className={`w-full p-3 rounded-xl flex items-center justify-between text-left transition-all ${
                          isActive
                            ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
                            : "text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? "text-white" : "accent-text"}`} />
                          <span className="font-semibold">{item.label}</span>
                        </span>
                        <span className={`text-[9px] ${isActive ? "text-white/80" : "text-gray-400"}`}>
                          Screen {item.number}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
