'use client';

import React, { useRef } from 'react';

interface DesktopIconProps {
  name: string;
  icon: React.ReactNode;
  onOpen: () => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ name, icon, onOpen }) => {
  const lastClickRef = useRef<number>(0);

  const handleTouchOrClick = (e: React.MouseEvent | React.TouchEvent) => {
    const now = Date.now();
    const delay = now - lastClickRef.current;
    
    // Check if it's a double-click/tap (within 350ms)
    if (delay < 350) {
      onOpen();
    }
    lastClickRef.current = now;
  };

  return (
    <div 
      onDoubleClick={onOpen}
      onClick={handleTouchOrClick}
      className="w-20 h-20 flex flex-col items-center justify-center rounded-lg border border-transparent hover:border-white/5 hover:bg-white/5 cursor-pointer select-none transition-all group p-1 text-center"
    >
      {/* Icon Frame */}
      <div className="w-10 h-10 flex items-center justify-center text-white/80 group-hover:text-white transition-all transform group-hover:scale-105 filter drop-shadow-md">
        {icon}
      </div>

      {/* Icon Name Text */}
      <span className="text-[10px] md:text-[11px] text-zinc-100 font-sans tracking-wide mt-1.5 line-clamp-2 leading-tight filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] px-1">
        {name}
      </span>
    </div>
  );
};
