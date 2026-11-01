'use client';

import React from 'react';
import { useOSStore } from '../../store/useOSStore';
import { useSystemStats } from '../../hooks/useSystemStats';
import { TopBar } from './TopBar';
import { Dock } from './Dock';
import { DesktopIcon } from './DesktopIcon';
import { WindowManager } from './WindowManager';
import { 
  User, 
  Code, 
  Award, 
  Briefcase, 
  GraduationCap, 
  ShieldCheck, 
  FileText, 
  Mail, 
  LineChart, 
  Folder, 
  Terminal as TermIcon,
  Trash2
} from 'lucide-react';

export const Desktop: React.FC = () => {
  // Activate system metrics simulation
  useSystemStats();

  const openWindow = useOSStore((state) => state.openWindow);
  const focusWindow = useOSStore((state) => state.focusWindow);

  const handleOpenApp = (id: string) => {
    openWindow(id);
    focusWindow(id);
  };

  const desktopIcons = [
    { id: 'about', name: 'About Me', icon: <User size={22} className="text-[#33ccff]" /> },
    { id: 'projects', name: 'Projects', icon: <Code size={22} className="text-[#00ff00]" /> },
    { id: 'skills', name: 'Skills Matrix', icon: <Award size={22} className="text-[#cba6f7]" /> },
    { id: 'experience', name: 'Experience', icon: <Briefcase size={22} className="text-[#fabd2f]" /> },
    { id: 'education', name: 'Education', icon: <GraduationCap size={22} className="text-[#88c0d0]" /> },
    { id: 'certifications', name: 'Certifications', icon: <ShieldCheck size={22} className="text-[#ff79c6]" /> },
    { id: 'resume', name: 'Resume', icon: <FileText size={22} className="text-zinc-300" /> },
    { id: 'terminal', name: 'Terminal', icon: <TermIcon size={22} className="text-[#00ff00]/80" /> },
    { id: 'monitoring', name: 'SRE Dashboard', icon: <LineChart size={22} className="text-accent" /> },
    { id: 'files', name: 'File Explorer', icon: <Folder size={22} className="text-[#fabd2f]/80" /> },
    { id: 'contact', name: 'Contact Me', icon: <Mail size={22} className="text-zinc-200" /> },
  ];

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-bg-color transition-colors duration-500">
      {/* 1. Background Wallpaper Grid & Nodes */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none select-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="desktop-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#fff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#desktop-grid)" />
          {/* Server Nodes Connection */}
          <circle cx="20%" cy="30%" r="5" fill="#e95420" />
          <circle cx="20%" cy="30%" r="20" fill="none" stroke="#e95420" strokeWidth="1" className="animate-pulse" />
          
          <circle cx="50%" cy="20%" r="5" fill="#33ccff" />
          
          <circle cx="80%" cy="40%" r="5" fill="#fabd2f" />
          
          <circle cx="70%" cy="75%" r="5" fill="#cba6f7" />

          <path d="M 20% 30% L 50% 20% L 80% 40% L 70% 75% Z" fill="none" stroke="#fff" strokeWidth="0.8" strokeDasharray="3,6" />
        </svg>
      </div>

      {/* Subtle ambient blur light source */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full filter blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#33ccff]/5 rounded-full filter blur-[100px] pointer-events-none z-0" />

      {/* 2. Top GNOME Status Bar */}
      <TopBar />

      {/* 3. Main Desktop Workspace */}
      <div className="flex-1 relative p-4 flex flex-col justify-start items-start select-none">
        {/* Left Side Grid of Icons */}
        <div className="h-[calc(100%-80px)] flex flex-col flex-wrap gap-2.5 items-start content-start z-10">
          {desktopIcons.map((icon) => (
            <DesktopIcon 
              key={icon.id}
              name={icon.name}
              icon={icon.icon}
              onOpen={() => handleOpenApp(icon.id)}
            />
          ))}

          {/* Hardcoded Trash Icon */}
          <DesktopIcon 
            name="Trash"
            icon={<Trash2 size={22} className="text-zinc-500 group-hover:text-red-400 transition-all" />}
            onOpen={() => alert("Trash is empty.")}
          />
        </div>

        {/* Dynamic Draggable Window workspace */}
        <WindowManager />
      </div>

      {/* 4. Bottom macOS-style dock */}
      <Dock />
    </div>
  );
};
