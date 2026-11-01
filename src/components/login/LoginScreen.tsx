'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { useOSStore } from '../../store/useOSStore';
import { User, Key, ArrowRight, Loader2 } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const setPhase = useOSStore((state) => state.setPhase);
  const soundEnabled = useOSStore((state) => state.soundEnabled);
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    // Update local clock and date
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
      
      const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: 'numeric' };
      setDateStr(now.toLocaleDateString('en-US', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);

    // Audio click
    if (soundEnabled) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.08);
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
      } catch (err) {}
    }

    setTimeout(() => {
      setIsAuthenticating(false);
      setPhase('desktop');
    }, 1200);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-6 bg-[#180512] overflow-hidden select-none">
      
      {/* Background Graphic: abstract cloud grid lines */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#fff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <circle cx="30%" cy="40%" r="150" fill="none" stroke="#e95420" strokeWidth="2" className="animate-pulse" />
          <circle cx="70%" cy="60%" r="220" fill="none" stroke="#e95420" strokeWidth="1" />
          <line x1="30%" y1="40%" x2="70%" y2="60%" stroke="#e95420" strokeWidth="1.5" strokeDasharray="5,5" />
        </svg>
      </div>

      {/* Blurred overlay */}
      <div className="absolute inset-0 bg-[#300a24]/60 backdrop-blur-md z-0" />

      {/* 1. Large Header Clock */}
      <div className="z-10 mt-12 text-center text-white">
        <h1 className="text-6xl md:text-7xl font-sans font-extralight tracking-tight select-none drop-shadow-md">
          {timeStr}
        </h1>
        <p className="text-sm md:text-base font-sans font-medium text-zinc-300 mt-2 select-none uppercase tracking-widest">
          {dateStr}
        </p>
      </div>

      {/* 2. Authentication Card */}
      <div className="z-10 w-full max-w-sm bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-lg shadow-2xl flex flex-col items-center text-center">
        {/* Avatar Container */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#e95420] to-[#fabd2f] p-0.5 shadow-lg flex items-center justify-center mb-4">
          <div className="w-full h-full bg-zinc-900 rounded-full flex items-center justify-center text-white">
            <User size={38} className="text-zinc-400" />
          </div>
        </div>

        <h2 className="text-white font-sans font-medium text-lg">Guest Session</h2>
        <p className="text-zinc-500 text-xs mb-6">swapnil-dev</p>

        {/* Input Form */}
        <form onSubmit={handleLogin} className="w-full space-y-3">
          {/* Pre-filled username */}
          <div className="relative w-full">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input 
              type="text" 
              value="visitor" 
              disabled 
              className="w-full h-11 pl-11 pr-4 bg-white/5 border border-white/10 rounded-xl text-zinc-400 text-sm font-mono cursor-not-allowed outline-none select-none"
            />
          </div>

          {/* Password Input */}
          <div className="relative w-full">
            <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isAuthenticating}
              autoFocus
              className="w-full h-11 pl-11 pr-12 bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/10 focus:border-[#e95420]/50 rounded-xl text-white text-sm font-mono outline-none transition-all placeholder-zinc-500"
            />
            <button 
              type="submit"
              disabled={isAuthenticating}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-[#e95420] hover:bg-[#fc7646] disabled:bg-zinc-800 text-white rounded-lg flex items-center justify-center transition-all cursor-pointer"
            >
              {isAuthenticating ? (
                <Loader2 size={14} className="animate-spin text-zinc-400" />
              ) : (
                <ArrowRight size={14} />
              )}
            </button>
          </div>
        </form>

        <p className="text-zinc-500 text-[10px] mt-4 select-none">
          Hint: Any password works — you are a guest here.
        </p>
      </div>

      {/* 3. Footer OS Tag */}
      <div className="z-10 text-[10px] md:text-xs text-zinc-500 select-none">
        Portfolio OS v1.0.0
      </div>
    </div>
  );
};
