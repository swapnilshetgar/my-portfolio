'use client';

import React from 'react';
import { useOSStore } from '../../store/useOSStore';
import { 
  Terminal as TerminalIcon, 
  Folder, 
  Settings as SettingsIcon, 
  LineChart, 
  Code, 
  Globe, 
  Github, 
  Linkedin, 
  Cloud,
  Box
} from 'lucide-react';

interface DockItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  action: () => void;
  tooltip: string;
}

export const Dock: React.FC = () => {
  const openWindow = useOSStore((state) => state.openWindow);
  const focusWindow = useOSStore((state) => state.focusWindow);
  const activeWindows = useOSStore((state) => state.windows);

  const handleOpenApp = (id: string) => {
    openWindow(id);
    focusWindow(id);
  };

  const dockApps: DockItem[] = [
    {
      id: 'terminal',
      name: 'Terminal',
      icon: <TerminalIcon size={24} className="text-[#00ff00]" />,
      action: () => handleOpenApp('terminal'),
      tooltip: 'OS Terminal (bash)'
    },
    {
      id: 'files',
      name: 'Files',
      icon: <Folder size={24} className="text-[#fabd2f]" />,
      action: () => handleOpenApp('files'),
      tooltip: 'File Explorer (ls/cd)'
    },
    {
      id: 'monitoring',
      name: 'SRE Monitor',
      icon: <LineChart size={24} className="text-[#ff79c6]" />,
      action: () => handleOpenApp('monitoring'),
      tooltip: 'SRE Dashboard & Grafana'
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: <Code size={24} className="text-[#33ccff]" />,
      action: () => handleOpenApp('projects'),
      tooltip: 'Project Deployments'
    },
    {
      id: 'skills',
      name: 'Skills',
      icon: <Box size={24} className="text-[#cba6f7]" />,
      action: () => handleOpenApp('skills'),
      tooltip: 'Technical Core Stack'
    },
    {
      id: 'cloud',
      name: 'Cloud Console',
      icon: <Cloud size={24} className="text-[#88c0d0]" />,
      action: () => handleOpenApp('monitoring'), // Cloud targets are monitored in dashboard
      tooltip: 'AWS/Azure/GCP Monitor'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: <Github size={24} className="text-zinc-200" />,
      action: () => window.open('https://github.com/swapnil', '_blank'),
      tooltip: 'Owner GitHub Profile'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: <Linkedin size={24} className="text-[#0a66c2]" />,
      action: () => window.open('https://linkedin.com/in/swapnil', '_blank'),
      tooltip: 'Owner LinkedIn Profile'
    },
  ];

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[9990] flex items-center justify-center pointer-events-none w-full px-4">
      {/* Outer Dock Wrapper */}
      <div className="flex items-end gap-3 px-4 py-2.5 rounded-2xl bg-black/45 border border-white/10 shadow-2xl backdrop-blur-xl pointer-events-auto transition-all max-w-full overflow-x-auto">
        {dockApps.map((app) => {
          const isAppOpen = activeWindows.find(w => w.id === app.id)?.isOpen;
          return (
            <div key={app.id} className="relative group flex flex-col items-center">
              {/* Tooltip */}
              <span className="absolute -top-10 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 px-2 py-1 rounded bg-black/90 border border-white/10 text-white text-[10px] whitespace-nowrap shadow-md pointer-events-none">
                {app.tooltip}
              </span>

              {/* App Launch Button */}
              <button
                onClick={app.action}
                className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 text-white active:scale-95 transition-all transform hover:-translate-y-1.5 duration-200 cursor-pointer shadow-lg"
              >
                {app.icon}
              </button>

              {/* Dot indicating open status */}
              {isAppOpen && (
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1 animate-pulse" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
