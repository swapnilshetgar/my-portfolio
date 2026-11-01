'use client';

import React, { useEffect, useState } from 'react';
import { useOSStore } from '../../store/useOSStore';
import { Terminal, Battery, Wifi, Signal } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const setPhase = useOSStore((state) => state.setPhase);
  const networkUp = useOSStore((state) => state.networkUp);
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    // Update top bar clock
    const updateClock = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Auto advance phase after 4 seconds
    const timer = setTimeout(() => {
      setPhase('boot');
    }, 4500);
    return () => clearTimeout(timer);
  }, [setPhase]);

  const asciiName = `
███████╗██╗    ██╗ █████╗ ██████╗ ███╗   ██╗██╗██╗     
██╔════╝██║    ██║██╔══██╗██╔══██╗████╗  ██║██║██║     
███████╗██║ █╗ ██║███████║██████╔╝██╔██╗ ██║██║██║     
╚════██║██║███╗██║██╔══██║██╔═══╝ ██║╚██╗██║██║██║     
███████║╚███╔███╔╝██║  ██║██║     ██║ ╚████║██║███████╗
╚══════╝ ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝     ╚═╝  ╚═══╝╚═╝╚══════╝
`;

  return (
    <div 
      onClick={() => setPhase('boot')}
      className="relative w-full h-full bg-black text-[#00ff00] font-mono flex flex-col items-center justify-between select-none cursor-pointer overflow-hidden noise-bg"
    >
      {/* Top Bar Illusion */}
      <div className="w-full h-8 px-4 bg-zinc-950/80 border-b border-zinc-800 text-xs flex items-center justify-between select-none z-10">
        <div className="flex items-center gap-2">
          <span>swapnil-dev</span>
          <span className="text-zinc-500 font-sans">|</span>
          <span className="text-[#00ff00]/80">Net: {networkUp}</span>
        </div>
        <div>
          <span>{timeStr}</span>
        </div>
        <div className="flex items-center gap-2">
          <Signal size={12} className="text-[#00ff00]" />
          <Wifi size={12} className="text-[#00ff00]" />
          <Battery size={14} className="text-[#00ff00]" />
          <span className="text-[10px]">100%</span>
        </div>
      </div>

      {/* Main ASCII / Role Container */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 max-w-full text-center">
        {/* Glow effect wrapper */}
        <div className="relative group filter drop-shadow-[0_0_10px_rgba(0,255,0,0.6)] animate-pulse">
          <pre className="text-[8px] md:text-xs leading-none whitespace-pre select-none font-bold">
            {asciiName}
          </pre>
        </div>

        <div className="mt-6 text-sm md:text-lg tracking-wider text-white font-sans font-medium uppercase filter drop-shadow-[0_0_2px_rgba(0,0,0,1)]">
          DevOps | Multi-Cloud | Linux | Network | SRE
        </div>

        <div className="mt-2 text-xs md:text-sm text-zinc-400 font-sans max-w-md filter drop-shadow-[0_0_1px_rgba(0,0,0,0.5)]">
          Building Resilient Multi-Cloud Infrastructure & Automation First Operations
        </div>

        {/* Small Mock Window */}
        <div className="mt-12 w-full max-w-lg border border-zinc-800 bg-zinc-950/80 rounded-lg shadow-2xl text-left overflow-hidden">
          <div className="h-7 px-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
            </div>
            <div className="text-[10px] text-zinc-500 select-none">visitor@swapnil-dev:~</div>
            <div className="w-12"></div>
          </div>
          <div className="p-4 text-[11px] md:text-xs text-[#00ff00]/90 space-y-1 min-h-[90px]">
            <div>Welcome to Swapnil&apos;s interactive infrastructure...</div>
            <div className="text-zinc-500">Establishing handshake connection...</div>
            <div className="flex items-center gap-1 mt-2">
              <span className="text-[#00ff00]/60">visitor@swapnil-dev:~$</span>
              <span className="text-white">Type &apos;help&apos; to start.</span>
              <span className="terminal-cursor"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer hint */}
      <div className="pb-8 text-[10px] md:text-xs text-zinc-500 select-none text-center">
        Click or tap anywhere to speed up boot sequence
      </div>
    </div>
  );
};
