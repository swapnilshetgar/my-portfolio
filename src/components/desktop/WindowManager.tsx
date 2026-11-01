'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useOSStore, WindowState } from '../../store/useOSStore';
import { X, Minus, Square } from 'lucide-react';

// Subcomponents (we will create these next)
import { AboutWindow } from '../windows/AboutWindow';
import { ProjectsWindow } from '../windows/ProjectsWindow';
import { SkillsWindow } from '../windows/SkillsWindow';
import { ExperienceWindow } from '../windows/ExperienceWindow';
import { EducationWindow } from '../windows/EducationWindow';
import { CertificationsWindow } from '../windows/CertificationsWindow';
import { ResumeWindow } from '../windows/ResumeWindow';
import { ContactWindow } from '../windows/ContactWindow';
import { SystemMonitorWindow } from '../windows/SystemMonitorWindow';
import { FileExplorerWindow } from '../windows/FileExplorerWindow';
import { Terminal } from '../terminal/Terminal';

interface WindowShellProps {
  wState: WindowState;
}

const WindowShell: React.FC<WindowShellProps> = ({ wState }) => {
  const { id, title, isMaximized, isMinimized, zIndex } = wState;
  const closeWindow = useOSStore((state) => state.closeWindow);
  const minimizeWindow = useOSStore((state) => state.minimizeWindow);
  const toggleMaximizeWindow = useOSStore((state) => state.toggleMaximizeWindow);
  const focusWindow = useOSStore((state) => state.focusWindow);

  // Position & size in local state for smooth rendering (no store latency)
  const [position, setPosition] = useState(wState.position);
  const [size, setSize] = useState(wState.size);
  
  const windowRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startX: number; startY: number; startLeft: number; startTop: number } | null>(null);
  const resizeRef = useRef<{ startX: number; startY: number; startWidth: number; startHeight: number } | null>(null);

  // Focus on mouse down
  const handleMouseDown = () => {
    focusWindow(id);
  };

  // Dragging Handler
  const handleDragStart = (e: React.MouseEvent) => {
    if (isMaximized) return;
    e.preventDefault();
    focusWindow(id);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startLeft: position.x,
      startTop: position.y
    };
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
  };

  const handleDragMove = (e: MouseEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    
    // Bounds check
    let newX = dragRef.current.startLeft + dx;
    let newY = dragRef.current.startTop + dy;
    
    // Keep header visible on screen
    if (newY < 0) newY = 0;
    
    setPosition({ x: newX, y: newY });
  };

  const handleDragEnd = () => {
    dragRef.current = null;
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
  };

  // Resizing Handler
  const handleResizeStart = (e: React.MouseEvent) => {
    if (isMaximized) return;
    e.preventDefault();
    e.stopPropagation();
    focusWindow(id);
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: size.width,
      startHeight: size.height
    };
    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
  };

  const handleResizeMove = (e: MouseEvent) => {
    if (!resizeRef.current) return;
    const dx = e.clientX - resizeRef.current.startX;
    const dy = e.clientY - resizeRef.current.startY;
    
    const minWidth = 350;
    const minHeight = 250;
    
    const newWidth = Math.max(minWidth, resizeRef.current.startWidth + dx);
    const newHeight = Math.max(minHeight, resizeRef.current.startHeight + dy);
    
    setSize({ width: newWidth, height: newHeight });
  };

  const handleResizeEnd = () => {
    resizeRef.current = null;
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
  };

  // Render correct app client
  const renderClient = () => {
    switch (id) {
      case 'terminal':
        return <Terminal />;
      case 'about':
        return <AboutWindow />;
      case 'projects':
        return <ProjectsWindow />;
      case 'skills':
        return <SkillsWindow />;
      case 'experience':
        return <ExperienceWindow />;
      case 'education':
        return <EducationWindow />;
      case 'certifications':
        return <CertificationsWindow />;
      case 'resume':
        return <ResumeWindow />;
      case 'contact':
        return <ContactWindow />;
      case 'monitoring':
        return <SystemMonitorWindow />;
      case 'files':
        return <FileExplorerWindow />;
      default:
        return <div className="p-4">App Client not found</div>;
    }
  };

  if (isMinimized) return null;

  const shellStyle: React.CSSProperties = isMaximized 
    ? {
        position: 'absolute',
        top: '32px', // Below topbar
        left: '0px',
        width: '100%',
        height: 'calc(100% - 92px)', // Accounting for topbar & dock space
        zIndex: zIndex
      }
    : {
        position: 'absolute',
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex: zIndex
      };

  return (
    <div 
      ref={windowRef}
      style={shellStyle}
      onMouseDown={handleMouseDown}
      className={`window-glass rounded-xl flex flex-col overflow-hidden bg-window-bg border border-border-color shadow-2xl transition-all duration-75`}
    >
      {/* Title Bar (macOS style layout) */}
      <div 
        onMouseDown={handleDragStart}
        onDoubleClick={() => toggleMaximizeWindow(id)}
        className="h-9 px-3 bg-black/40 border-b border-border-color/30 flex items-center justify-between cursor-move select-none"
      >
        {/* Buttons on left */}
        <div className="flex items-center gap-1.5 flex-1">
          <button 
            onClick={() => closeWindow(id)}
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-all flex items-center justify-center group/btn text-transparent hover:text-black cursor-pointer"
          >
            <X size={8} className="font-extrabold" />
          </button>
          <button 
            onClick={() => minimizeWindow(id)}
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-all flex items-center justify-center group/btn text-transparent hover:text-black cursor-pointer"
          >
            <Minus size={8} className="font-extrabold" />
          </button>
          <button 
            onClick={() => toggleMaximizeWindow(id)}
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-all flex items-center justify-center group/btn text-transparent hover:text-black cursor-pointer"
          >
            <Square size={6} className="font-extrabold" />
          </button>
        </div>

        {/* Center Title */}
        <div className="text-xs font-semibold text-zinc-300 font-sans tracking-wide">
          {title}
        </div>

        {/* Filler right side */}
        <div className="flex-1"></div>
      </div>

      {/* Window Body Client */}
      <div className="flex-1 overflow-auto bg-black/60 relative text-zinc-100 flex flex-col font-sans">
        {renderClient()}
      </div>

      {/* Resize Handle (bottom-right corner) */}
      {!isMaximized && (
        <div 
          onMouseDown={handleResizeStart}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-50 flex items-end justify-end p-0.5"
        >
          <svg width="8" height="8" viewBox="0 0 8 8" className="text-zinc-600 opacity-60">
            <line x1="6" y1="0" x2="0" y2="6" stroke="currentColor" strokeWidth="1" />
            <line x1="6" y1="3" x2="3" y2="6" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
      )}
    </div>
  );
};

export const WindowManager: React.FC = () => {
  const windows = useOSStore((state) => state.windows);

  return (
    <div className="absolute inset-0 top-8 bottom-16 pointer-events-none z-10 overflow-hidden">
      {windows.map((w) => {
        if (!w.isOpen) return null;
        return (
          <div key={w.id} className="pointer-events-auto">
            <WindowShell wState={w} />
          </div>
        );
      })}
    </div>
  );
};
