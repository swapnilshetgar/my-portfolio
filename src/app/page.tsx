'use client';

import React, { useEffect } from 'react';
import { useOSStore } from '../store/useOSStore';
import { SplashScreen } from '../components/boot/SplashScreen';
import { BootLogger } from '../components/boot/BootLogger';
import { LoginScreen } from '../components/login/LoginScreen';
import { Desktop } from '../components/desktop/Desktop';
import { MatrixRain } from '../components/desktop/MatrixRain';
import { themes } from '../lib/themes';

export default function Home() {
  const phase = useOSStore((state) => state.phase);
  const setPhase = useOSStore((state) => state.setPhase);
  const theme = useOSStore((state) => state.theme);
  const resetOS = useOSStore((state) => state.resetOS);
  const crtOverlay = useOSStore((state) => state.crtOverlay);
  const matrixActive = useOSStore((state) => state.matrixActive);

  // Render OS states
  const renderPhase = () => {
    switch (phase) {
      case 'splash':
        return <SplashScreen />;
      case 'boot':
        return <BootLogger />;
      case 'login':
        return <LoginScreen />;
      case 'desktop':
        return <Desktop />;
      case 'shutdown':
        return (
          <div 
            onClick={resetOS}
            className="w-full h-full bg-black text-[#00ff00] font-mono flex flex-col items-center justify-center cursor-pointer select-none text-center p-6 space-y-4 noise-bg"
          >
            <div className="animate-pulse text-sm md:text-base">
              *** POWER DOWN: SYSTEM SHUTDOWN COMPLETED ***
            </div>
            <div className="text-zinc-500 text-xs md:text-sm">
              Press any key or click anywhere to reboot environment.
            </div>
          </div>
        );
      default:
        return <SplashScreen />;
    }
  };

  // Keyboard wake up from shutdown
  useEffect(() => {
    const handleKeyDown = () => {
      if (phase === 'shutdown') {
        resetOS();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, resetOS]);

  // Find active theme config class name
  const themeConfig = themes.find((t) => t.id === theme) || themes[0];

  return (
    <main 
      className={`relative w-full h-full overflow-hidden select-none ${themeConfig.themeClass} ${crtOverlay ? 'crt-overlay crt-flicker' : ''}`}
    >
      {/* Matrix rain full-screen easter egg */}
      {matrixActive && <MatrixRain />}
      
      {/* Active Phase display */}
      <div className="w-full h-full relative">
        {renderPhase()}
      </div>
    </main>
  );
}
