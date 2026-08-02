"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Types & Interfaces
export interface Task {
  id: string;
  projectId: string;
  title: string;
  context: string;
  whyImportant: string;
  energyCost: "Low" | "Medium" | "High";
  duration: string; // e.g., "2 hours"
  priority: "Critical" | "High Impact" | "Maintenance" | "Ignore";
  deadline: string;
  dependencies: string[]; // Task IDs
  completed: boolean;
  aiBreakdown?: string[];
  recommendedSchedules?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  goal: string;
  vision: string;
  roadmap: { phase: string; date: string; desc: string }[];
  timeline: string;
  milestones: { name: string; date: string; status: "Completed" | "Pending" }[];
  budget: { allocated: number; spent: number };
  team: { name: string; role: string; avatar: string }[];
  resources: string[];
}

export interface KnowledgeNode {
  id: string;
  title: string;
  type: "document" | "idea" | "pdf" | "audio" | "code" | "link";
  content: string;
  connections: string[]; // Connected Node IDs
  tags: string[];
  summary?: string;
}

export interface MemoryLog {
  id: string;
  topic: string;
  solution: string;
  errorMade: string;
  lessonLearned: string;
  timestamp: string;
}

export interface Habit {
  id: string;
  name: string;
  category: "Health" | "Learning" | "Productivity";
  streak: number;
  history: { [date: string]: boolean }; // date -> completed state
}

export interface FinancialTransaction {
  id: string;
  type: "Income" | "Expense";
  category: string;
  amount: number;
  date: string;
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger: string;
  action: string;
  active: boolean;
}

export interface AIAgent {
  id: string;
  name: string;
  role: string;
  description: string;
  avatar: string;
  active: boolean;
  systemPrompt: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string; // "14:00"
  end: string;
  type: "Deep Work" | "Meeting" | "Focus Block" | "Personal";
}

export type OSTheme = "dark" | "light";
export type OSAccentColor = "purple" | "cyan" | "orange" | "green" | "pink";

// Global OS State
interface OSState {
  currentScreen: number; // 1 to 20
  setCurrentScreen: (screen: number) => void;
  theme: OSTheme;
  setTheme: (theme: OSTheme) => void;
  accentColor: OSAccentColor;
  setAccentColor: (color: OSAccentColor) => void;
  userStats: {
    energy: number; // 0 - 100
    concentration: number; // 0 - 100
    mood: string; // "Focused" | "Creative" | "Exhausted" etc.
  };
  setUserStats: React.Dispatch<React.SetStateAction<{ energy: number; concentration: number; mood: string }>>;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  knowledgeBase: KnowledgeNode[];
  setKnowledgeBase: React.Dispatch<React.SetStateAction<KnowledgeNode[]>>;
  memoryCenter: MemoryLog[];
  setMemoryCenter: React.Dispatch<React.SetStateAction<MemoryLog[]>>;
  habits: Habit[];
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
  finances: FinancialTransaction[];
  setFinances: React.Dispatch<React.SetStateAction<FinancialTransaction[]>>;
  automations: AutomationRule[];
  setAutomations: React.Dispatch<React.SetStateAction<AutomationRule[]>>;
  agents: AIAgent[];
  setAgents: React.Dispatch<React.SetStateAction<AIAgent[]>>;
  calendarEvents: CalendarEvent[];
  setCalendarEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
  pomodoroState: {
    timeLeft: number;
    isRunning: boolean;
    mode: "Work" | "Break";
  };
  setPomodoroState: React.Dispatch<React.SetStateAction<{ timeLeft: number; isRunning: boolean; mode: "Work" | "Break" }>>;
  aiLog: string[];
  addAiLog: (msg: string) => void;
}

const OSStateContext = createContext<OSState | undefined>(undefined);

export function OSStateProvider({ children }: { children: React.ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState(1); // Default to splash
  const [theme, setTheme] = useState<OSTheme>("dark");
  const [accentColor, setAccentColor] = useState<OSAccentColor>("purple");

  const [userStats, setUserStats] = useState({
    energy: 85,
    concentration: 92,
    mood: "Supercharged",
  });

  const [projects, setProjects] = useState<Project[]>([
    {
      id: "proj-1",
      title: "DriverPilot AI",
      description: "Autonomous self-driving drone navigator and object-avoidance engine.",
      goal: "Achieve Level 4 autonomy on edge-compute hardware.",
      vision: "Empower individual delivery operators with reliable flight models.",
      roadmap: [
        { phase: "Phase 1: Simulation", date: "Sept 1", desc: "Validate basic flight simulation logs" },
        { phase: "Phase 2: Sensor Fusion", date: "Oct 15", desc: "Implement LiDAR + Camera sensor array sync" },
        { phase: "Phase 3: Real Flight test", date: "Dec 10", desc: "Deploy physically on drone prototype X" },
      ],
      timeline: "Q3 - Q4 2026",
      milestones: [
        { name: "3D Spatial Mapping Sync", date: "Aug 15", status: "Completed" },
        { name: "SaaS Fleet API Integration", date: "Sep 20", status: "Pending" },
        { name: "Collision Avoidance V2", date: "Oct 05", status: "Pending" },
      ],
      budget: { allocated: 45000, spent: 18000 },
      team: [
        { name: "Alex Carter", role: "AI Systems Specialist", avatar: "AC" },
        { name: "Elena Rostova", role: "Hardware Architect", avatar: "ER" },
      ],
      resources: ["LiDAR SDK Documentation", "PyTorch Edge Core compiler", "3D Simulation Sandbox v4"],
    },
    {
      id: "proj-2",
      title: "Quantum Database Sync",
      description: "Sub-millisecond data replication across geographically dispersed multicloud servers.",
      goal: "Reduce synchronization latency by 85% with secure local-first architecture.",
      vision: "Complete privacy and immediate data access worldwide.",
      roadmap: [
        { phase: "Phase 1: DB Core protocol", date: "Aug 30", desc: "Design atomic replication nodes" },
        { phase: "Phase 2: Cloud clusters test", date: "Oct 01", desc: "Validate live geo-sync latency" },
      ],
      timeline: "Q3 2026",
      milestones: [
        { name: "Write Conflict Resolution Algorithm", date: "Aug 10", status: "Completed" },
        { name: "Security Encryption Layer", date: "Sep 15", status: "Pending" },
      ],
      budget: { allocated: 30000, spent: 12000 },
      team: [
        { name: "Dr. Kenji Sato", role: "Database Scientist", avatar: "KS" },
      ],
      resources: ["CRDT Research papers", "PostgreSQL WAL Stream protocol", "Rust Network runtime"],
    }
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "task-1",
      projectId: "proj-1",
      title: "Optimize YOLO TensorRT execution layers",
      context: "Currently high flight control compute is capping video feedback FPS down to 18.",
      whyImportant: "Low FPS degrades physical response loop times during agile turns.",
      energyCost: "High",
      duration: "4 hours",
      priority: "Critical",
      deadline: "Aug 05, 2026",
      dependencies: [],
      completed: false,
      aiBreakdown: [
        "Isolate custom bounding box layers",
        "Quantize weights into FP16 precision format",
        "Set up streaming CUDA buffers for asynchronous inference",
      ],
      recommendedSchedules: ["Morning focus block (09:00 - 13:00)"],
    },
    {
      id: "task-2",
      projectId: "proj-1",
      title: "Draft Cloud Fleet status API",
      context: "Fleets need to register health telemetry metrics every 250ms.",
      whyImportant: "Essential to prevent loss of drone location records when wireless cuts off.",
      energyCost: "Medium",
      duration: "2 hours",
      priority: "High Impact",
      deadline: "Aug 12, 2026",
      dependencies: ["task-1"],
      completed: false,
    },
    {
      id: "task-3",
      projectId: "proj-2",
      title: "Refactor AES-256-GCM local DB encryption",
      context: "Secure the core database logs against potential server extraction.",
      whyImportant: "Ensures complete cybersecurity readiness and zero leakage of local-first assets.",
      energyCost: "High",
      duration: "3 hours",
      priority: "High Impact",
      deadline: "Aug 08, 2026",
      dependencies: [],
      completed: false,
    },
    {
      id: "task-4",
      projectId: "proj-2",
      title: "Verify replication benchmark",
      context: "Run baseline multithreaded simulations to capture peak connection spikes.",
      whyImportant: "Ensures the database is highly robust and prepared for high concurrent client counts.",
      energyCost: "Low",
      duration: "1 hour",
      priority: "Maintenance",
      deadline: "Aug 15, 2026",
      dependencies: ["task-3"],
      completed: true,
    }
  ]);

  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeNode[]>([
    {
      id: "know-1",
      title: "Autonomous Drone Flight Systems Architectures",
      type: "document",
      content: "# Spatial Flight Dynamics\nHigh-density telemetry nodes are crucial. Here we document LiDAR synchronization logs and edge model quantization guidelines.",
      connections: ["proj-1", "know-2"],
      tags: ["AI", "Aviation", "LiDAR"],
      summary: "Comprehensive spatial flight dynamics summary using LiDAR arrays.",
    },
    {
      id: "know-2",
      title: "CRDTs & Geo-Distributed Databases",
      type: "code",
      content: "export function mergeStates(local, remote) {\n  // Atomic logical state resolution algorithm\n  return { ...local, ...remote };\n}",
      connections: ["proj-2", "know-1"],
      tags: ["DB", "Database", "Replication", "Sync"],
      summary: "State-based Conflict-free Replicated Data Type engine implementations.",
    },
  ]);

  const [memoryCenter, setMemoryCenter] = useState<MemoryLog[]>([
    {
      id: "mem-1",
      topic: "Failed Edge Device FP32 Flight Inference",
      solution: "Convert the weights to dynamic FP16/INT8 quantizations to reduce physical heating and improve inference frequency.",
      errorMade: "Running unquantized large language models and vision grids directly on physical edge compute.",
      lessonLearned: "Always benchmark neural networks in FP16 precision prior to flight deployments.",
      timestamp: "July 24, 2026",
    },
    {
      id: "mem-2",
      topic: "DB Geo-Split Synchronization Outage",
      solution: "Implemented Vector Clocks and Conflict-Free Replicated Data Types (CRDTs).",
      errorMade: "Relying on standard sequential timestamp clocks for geo-separated DB nodes.",
      lessonLearned: "Physical clock offsets are inevitable; utilize vector-based sequence keys.",
      timestamp: "June 18, 2026",
    }
  ]);

  const [habits, setHabits] = useState<Habit[]>([
    { id: "hab-1", name: "Deep Focus (4 hours)", category: "Productivity", streak: 12, history: { "2026-07-31": true, "2026-07-30": true, "2026-07-29": true } },
    { id: "hab-2", name: "Cardio Training (30 mins)", category: "Health", streak: 4, history: { "2026-07-31": false, "2026-07-30": true, "2026-07-29": true } },
    { id: "hab-3", name: "Read Technical Papers", category: "Learning", streak: 8, history: { "2026-07-31": true, "2026-07-30": true, "2026-07-29": false } },
  ]);

  const [finances, setFinances] = useState<FinancialTransaction[]>([
    { id: "fin-1", type: "Income", category: "SaaS License Sales", amount: 12500, date: "2026-07-28" },
    { id: "fin-2", type: "Expense", category: "Cloud GPU Clusters", amount: 3100, date: "2026-07-29" },
    { id: "fin-3", type: "Expense", category: "Cyber Security Pentest Audit", amount: 2000, date: "2026-07-30" },
  ]);

  const [automations, setAutomations] = useState<AutomationRule[]>([
    { id: "auto-1", name: "Critical Overdue Auto-Reschedule", trigger: "When Task Deadline is Overdue", action: "AI analyzes complexity, extends deadline by 48h, and highlights focus block", active: true },
    { id: "auto-2", name: "Idle Project Inactivity Alarm", trigger: "No updates for 5 continuous days", action: "Trigger PM Agent to generate action plan report and schedule database sprint", active: true },
  ]);

  const [agents, setAgents] = useState<AIAgent[]>([
    { id: "ag-1", name: "Project Manager Agent", role: "Productivity Coordinator", description: "Monitors deadlines, analyzes velocity bottlenecks, and drafts dynamic rescue sprints.", avatar: "🤖", active: true, systemPrompt: "Coordinate agile sprints and identify blockers." },
    { id: "ag-2", name: "Research Agent", role: "Knowledge Gatherer", description: "Scrapes technical publications, formats bidirectional second-brain papers.", avatar: "📚", active: true, systemPrompt: "Retrieve and synthesize academic journals." },
    { id: "ag-3", name: "Coding Agent", role: "Software Architect", description: "Generates optimal code files, resolves complex logical bugs, and optimizes performance.", avatar: "💻", active: false, systemPrompt: "Draft hyper-optimized code blocks." },
    { id: "ag-4", name: "Finance Agent", role: "Fiscal Strategist", description: "Tracks expenses, analyzes run rate runway, and forecasts SaaS ROI optimization.", avatar: "💸", active: false, systemPrompt: "Perform high-fidelity financial audits." },
    { id: "ag-5", name: "Life Coach Agent", role: "Habits Counselor", description: "Aligns your actions to core vision, checks energy logs and prompts mental focus.", avatar: "🧘", active: true, systemPrompt: "Foster deep focus and habit development." },
    { id: "ag-6", name: "Security Agent", role: "Cryptographic Sentry", description: "Performs real-time local state integrity logs, checks vulnerabilities and updates keys.", avatar: "🛡️", active: true, systemPrompt: "Mitigate threats and audit logic loops." },
  ]);

  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([
    { id: "cal-1", title: "Drone GPU Flight Tensor Layer optimization", start: "09:00", end: "13:00", type: "Deep Work" },
    { id: "cal-2", title: "Fleet Telemetry API sprint mapping", start: "14:30", end: "16:00", type: "Focus Block" },
    { id: "cal-3", title: "AI PM Agent check-in and task delegation", start: "16:30", end: "17:00", type: "Meeting" },
  ]);

  const [pomodoroState, setPomodoroState] = useState<{ timeLeft: number; isRunning: boolean; mode: "Work" | "Break" }>({
    timeLeft: 1500, // 25 mins
    isRunning: false,
    mode: "Work",
  });

  const [aiLog, setAiLog] = useState<string[]>([
    "ProjectOS Pro fully loaded. Neural-mesh encryption verified.",
    "System diagnostics: Energy levels 85%, focus capacity at peak performance.",
    "AI Warning: DriverPilot AI has been inactive for 5 days. Suggesting 'Database Sprint' setup.",
  ]);

  const addAiLog = (msg: string) => {
    setAiLog((prev) => [msg, ...prev]);
  };

  // Pomodoro countdown simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (pomodoroState.isRunning && pomodoroState.timeLeft > 0) {
      timer = setInterval(() => {
        setPomodoroState((prev) => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    } else if (pomodoroState.isRunning && pomodoroState.timeLeft === 0) {
      setPomodoroState((prev) => {
        const nextMode = prev.mode === "Work" ? "Break" : "Work";
        addAiLog(`Pomodoro interval complete! Switching to ${nextMode} mode.`);
        return {
          isRunning: false,
          mode: nextMode,
          timeLeft: nextMode === "Work" ? 1500 : 300,
        };
      });
    }
    return () => clearInterval(timer);
  }, [pomodoroState.isRunning, pomodoroState.timeLeft]);

  // Effect to apply theme and accent color to document element body class list for tailwind and custom css handling
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("theme-dark", "theme-light");
    root.classList.add(`theme-${theme}`);

    // Set dataset attribute for custom CSS selector mapping
    root.setAttribute("data-theme", theme);
    root.setAttribute("data-accent", accentColor);
  }, [theme, accentColor]);

  return (
    <OSStateContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        theme,
        setTheme,
        accentColor,
        setAccentColor,
        userStats,
        setUserStats,
        projects,
        setProjects,
        tasks,
        setTasks,
        knowledgeBase,
        setKnowledgeBase,
        memoryCenter,
        setMemoryCenter,
        habits,
        setHabits,
        finances,
        setFinances,
        automations,
        setAutomations,
        agents,
        setAgents,
        calendarEvents,
        setCalendarEvents,
        pomodoroState,
        setPomodoroState,
        aiLog,
        addAiLog,
      }}
    >
      {children}
    </OSStateContext.Provider>
  );
}

export function useOSState() {
  const context = useContext(OSStateContext);
  if (!context) {
    throw new Error("useOSState must be used within an OSStateProvider");
  }
  return context;
}
