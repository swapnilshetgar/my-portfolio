'use client';

import React, { useState, useEffect } from 'react';
import { useOSStore, ThemeType } from '../../store/useOSStore';
import { themes } from '../../lib/themes';
import { 
  Wifi, 
  Battery, 
  Volume2, 
  VolumeX, 
  MonitorPlay, 
  MonitorOff, 
  Power, 
  Settings, 
  Layers, 
  TrendingUp 
} from 'lucide-react';

export const TopBar: React.FC = () => {
  const [timeStr, setTimeStr] = useState('');
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  
  const theme = useOSStore((state) => state.theme);
  const setTheme = useOSStore((state) => state.setTheme);
  const setPhase = useOSStore((state) => state.setPhase);
  const resetOS = useOSStore((state) => state.resetOS);
  const crtOverlay = useOSStore((state) => state.crtOverlay);
  const toggleCRT = useOSStore((state) => state.toggleCRT);
  const soundEnabled = useOSStore((state) => state.soundEnabled);
  const toggleSound = useOSStore((state) => state.toggleSound);
  const openWindow = useOSStore((state) => state.openWindow);
  
  // Real-time metrics from store
  const cpuUsage = useOSStore((state) => state.cpuUsage);
  const ramUsage = useOSStore((state) => state.ramUsage);
  const netUp = useOSStore((state) => state.networkUp);
  const netDown = useOSStore((state) => state.networkDown);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      };
      setTimeStr(now.toLocaleString('en-US', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    setPhase('login');
  };

  const handleThemeChange = (selectedTheme: ThemeType) => {
    setTheme(selectedTheme);
    setShowThemeMenu(false);
  };

  return (
    <div className="w-full h-8 px-3 bg-black/85 text-zinc-300 text-xs flex items-center justify-between border-b border-white/5 select-none z-[9999] shadow-md font-sans">
      {/* Left Area: GNOME logo + Activities */}
      <div className="flex items-center gap-3">
        <div 
          onClick={() => openWindow('terminal')}
          className="flex items-center gap-1.5 hover:text-white transition-all cursor-pointer font-bold font-mono tracking-wider text-[11px]"
        >
          <span className="w-3.5 h-3.5 rounded bg-accent flex items-center justify-center text-white text-[9px]">🐧</span>
          <span>swapnil-dev</span>
        </div>
        <span className="text-zinc-700 select-none">|</span>
        <button 
          onClick={() => openWindow('monitoring')}
          className="hover:text-white transition-all cursor-pointer font-semibold text-[11px]"
        >
          Activities
        </button>
      </div>

      {/* Center Area: Date/Time */}
      <div className="font-semibold text-center tracking-wide text-zinc-100 hover:text-white transition-all cursor-pointer">
        {timeStr}
      </div>

      {/* Right Area: NOC Widget Stats & Icons */}
      <div className="flex items-center gap-3">
        {/* Network widget */}
        <div className="hidden md:flex items-center gap-2 text-[10px] text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/5 font-mono">
          <span className="text-zinc-600">UP:</span> <span className="text-[#00ff00]">{netUp}</span>
          <span className="text-zinc-600">DL:</span> <span className="text-[#33ccff]">{netDown}</span>
        </div>

        {/* CPU/RAM widgets */}
        <div className="hidden lg:flex items-center gap-2 text-[10px] text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/5 font-mono">
          <span className="text-zinc-600">CPU:</span> 
          <span className={cpuUsage > 80 ? "text-red-500 font-bold" : "text-zinc-300"}>{cpuUsage}%</span>
          <span className="text-zinc-600">RAM:</span> 
          <span>{ramUsage}%</span>
        </div>

        <span className="hidden md:inline text-zinc-700 select-none">|</span>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* CRT Overlay Toggle */}
          <button 
            onClick={toggleCRT}
            title="Toggle CRT Screen Curve & Scanlines"
            className={`p-1 rounded hover:bg-white/10 transition-all cursor-pointer ${crtOverlay ? 'text-accent' : 'text-zinc-500'}`}
          >
            {crtOverlay ? <MonitorPlay size={13} /> : <MonitorOff size={13} />}
          </button>

          {/* Sound toggle */}
          <button 
            onClick={toggleSound}
            title="Toggle System Beeps"
            className={`p-1 rounded hover:bg-white/10 transition-all cursor-pointer ${soundEnabled ? 'text-accent' : 'text-zinc-500'}`}
          >
            {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
          </button>

          {/* Theme Dropdown Switcher */}
          <div className="relative">
            <button 
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              title="Change OS Desktop Theme"
              className={`p-1 rounded hover:bg-white/10 transition-all cursor-pointer ${showThemeMenu ? 'bg-white/10 text-accent' : 'text-zinc-400'}`}
            >
              <Layers size={13} />
            </button>
            {showThemeMenu && (
              <div className="absolute right-0 mt-1 w-52 bg-zinc-950/95 border border-white/10 rounded-lg shadow-2xl overflow-hidden py-1 z-[99999] backdrop-blur-xl">
                <div className="px-2.5 py-1 text-[10px] text-zinc-500 border-b border-white/5 uppercase tracking-widest font-semibold select-none">
                  Switch Distro Theme
                </div>
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleThemeChange(t.id)}
                    className={`w-full px-3 py-1.5 text-left text-[11px] font-sans flex items-center justify-between hover:bg-white/5 transition-all cursor-pointer ${theme === t.id ? 'text-accent font-bold' : 'text-zinc-300'}`}
                  >
                    <span>{t.name}</span>
                    <span 
                      className="w-2.5 h-2.5 rounded-full inline-block" 
                      style={{ backgroundColor: t.accentColor }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="text-zinc-700 select-none">|</span>

          {/* WiFi & Battery Mock */}
          <div className="flex items-center gap-1.5 text-zinc-400">
            <Wifi size={13} className="text-[#00ff00]/80" />
            <Battery size={14} className="text-zinc-300" />
          </div>

          <span className="text-zinc-700 select-none">|</span>

          {/* Power Button */}
          <button 
            onClick={handleLogout}
            title="Lock screen / Log out"
            className="p-1 rounded hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all cursor-pointer"
          >
            <Power size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
