import { create } from 'zustand';

export type ThemeType = 'ubuntu' | 'kali' | 'dracula' | 'nord' | 'gruvbox' | 'catppuccin' | 'hacker' | 'light';
export type OSPhase = 'splash' | 'boot' | 'login' | 'desktop' | 'shutdown';

export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  minSize?: { width: number; height: number };
}

interface OSStore {
  theme: ThemeType;
  phase: OSPhase;
  windows: WindowState[];
  currentDir: string;
  terminalHistory: string[];
  cpuUsage: number;
  ramUsage: number;
  networkUp: string;
  networkDown: string;
  soundEnabled: boolean;
  crtOverlay: boolean;
  matrixActive: boolean;
  
  setTheme: (theme: ThemeType) => void;
  setPhase: (phase: OSPhase) => void;
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  setCurrentDir: (dir: string) => void;
  addTerminalHistory: (cmd: string) => void;
  setSystemStats: (stats: { cpu: number; ram: number; netUp: string; netDown: string }) => void;
  toggleSound: () => void;
  toggleCRT: () => void;
  setMatrixActive: (active: boolean) => void;
  resetOS: () => void;
}

const defaultWindows: WindowState[] = [
  { id: 'terminal', title: 'Terminal', isOpen: true, isMinimized: false, isMaximized: false, zIndex: 10, position: { x: 80, y: 80 }, size: { width: 700, height: 450 } },
  { id: 'about', title: 'About Me', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 120, y: 100 }, size: { width: 620, height: 450 } },
  { id: 'projects', title: 'Projects', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 150, y: 120 }, size: { width: 780, height: 500 } },
  { id: 'skills', title: 'Skills Matrix', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 180, y: 140 }, size: { width: 650, height: 480 } },
  { id: 'experience', title: 'Experience Timeline', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 210, y: 160 }, size: { width: 680, height: 450 } },
  { id: 'education', title: 'Education', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 240, y: 180 }, size: { width: 550, height: 380 } },
  { id: 'certifications', title: 'Certifications', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 270, y: 200 }, size: { width: 650, height: 420 } },
  { id: 'resume', title: 'Curriculum Vitae', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 100, y: 50 }, size: { width: 800, height: 600 } },
  { id: 'contact', title: 'Contact Me', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 300, y: 220 }, size: { width: 500, height: 450 } },
  { id: 'monitoring', title: 'SRE Dashboard', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 60, y: 60 }, size: { width: 850, height: 550 } },
  { id: 'files', title: 'File Explorer', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 200, y: 200 }, size: { width: 600, height: 400 } },
];

export const useOSStore = create<OSStore>((set, get) => ({
  theme: 'ubuntu',
  phase: 'splash',
  windows: defaultWindows,
  currentDir: '/home/visitor',
  terminalHistory: [],
  cpuUsage: 24,
  ramUsage: 45,
  networkUp: '0.45 KB/s',
  networkDown: '1.24 KB/s',
  soundEnabled: true,
  crtOverlay: true,
  matrixActive: false,

  setTheme: (theme) => set({ theme }),
  setPhase: (phase) => set({ phase }),
  
  openWindow: (id) => set((state) => {
    const maxZ = Math.max(...state.windows.map(w => w.zIndex), 0);
    return {
      windows: state.windows.map((w) => 
        w.id === id 
          ? { ...w, isOpen: true, isMinimized: false, zIndex: maxZ + 1 }
          : w
      )
    };
  }),

  closeWindow: (id) => set((state) => ({
    windows: state.windows.map((w) => 
      w.id === id ? { ...w, isOpen: false } : w
    )
  })),

  minimizeWindow: (id) => set((state) => ({
    windows: state.windows.map((w) => 
      w.id === id ? { ...w, isMinimized: true } : w
    )
  })),

  toggleMaximizeWindow: (id) => set((state) => ({
    windows: state.windows.map((w) => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    )
  })),

  focusWindow: (id) => set((state) => {
    const maxZ = Math.max(...state.windows.map(w => w.zIndex), 0);
    const win = state.windows.find(w => w.id === id);
    if (win && win.zIndex === maxZ && !win.isMinimized) {
      return {};
    }
    return {
      windows: state.windows.map((w) => 
        w.id === id 
          ? { ...w, isMinimized: false, zIndex: maxZ + 1 }
          : w
      )
    };
  }),

  setCurrentDir: (currentDir) => set({ currentDir }),
  
  addTerminalHistory: (cmd) => set((state) => ({
    terminalHistory: [...state.terminalHistory, cmd]
  })),

  setSystemStats: (stats) => set({
    cpuUsage: stats.cpu,
    ramUsage: stats.ram,
    networkUp: stats.netUp,
    networkDown: stats.netDown,
  }),

  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  toggleCRT: () => set((state) => ({ crtOverlay: !state.crtOverlay })),
  setMatrixActive: (matrixActive) => set({ matrixActive }),

  resetOS: () => set({
    phase: 'boot',
    windows: defaultWindows.map(w => ({ ...w, isOpen: w.id === 'terminal' })),
    currentDir: '/home/visitor',
    matrixActive: false,
  })
}));
