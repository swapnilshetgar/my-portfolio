'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useOSStore } from '../../store/useOSStore';
import { useTerminal, TerminalLine } from '../../hooks/useTerminal';
import { getSshHeader } from '../../lib/commands';

export const Terminal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const currentDir = useOSStore((state) => state.currentDir);
  const openWindow = useOSStore((state) => state.openWindow);
  const soundEnabled = useOSStore((state) => state.soundEnabled);
  const setPhase = useOSStore((state) => state.setPhase);
  const resetOS = useOSStore((state) => state.resetOS);
  const setMatrixActive = useOSStore((state) => state.setMatrixActive);

  // Deletion state animations
  const [purgeActive, setPurgeActive] = useState(false);
  const [purgeLogs, setPurgeLogs] = useState<string[]>([]);
  const [purgeProgress, setPurgeProgress] = useState(0);

  // Play keyboard typing tick click
  const playTypeSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.type = 'triangle';
      // High pitch tick
      oscillator.frequency.setValueAtTime(1200 + Math.random() * 400, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.003, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.04);
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.05);
    } catch (e) {}
  };

  const handleAction = (action: { type: string; value?: string }) => {
    switch (action.type) {
      case 'clear':
        clearLogs();
        break;
      case 'open':
        if (action.value) openWindow(action.value);
        break;
      case 'theme':
        // Theme updated in store, visual cues handled globally
        break;
      case 'matrix':
        setMatrixActive(action.value === 'on');
        break;
      case 'reboot':
        resetOS();
        break;
      case 'shutdown':
        setPhase('shutdown');
        break;
      case 'download_resume':
        // Trigger download programmatically
        try {
          const docNode = { name: 'resume.txt', content: 'Swapnil Resume File' };
          const blob = new Blob([docNode.content], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'Swapnil_Resume.txt';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        } catch (e) {}
        break;
      case 'sudo_rm':
        triggerPurgeSequence();
        break;
      default:
        break;
    }
  };

  // Setup initial log
  const initialLines: TerminalLine[] = [
    { text: getSshHeader(), type: 'header', dir: '/home/visitor' }
  ];

  const {
    input,
    suggestion,
    lines,
    handleInputChange,
    handleKeyDown,
    clearLogs,
    setLines,
    executeInput
  } = useTerminal(initialLines, handleAction);

  // Scroll to bottom on updates
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines, purgeLogs]);

  // Focus input on console body click
  const focusTerminal = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    focusTerminal();
  }, []);

  // Sudo rm -rf / Easter Egg Animation
  const triggerPurgeSequence = () => {
    setPurgeActive(true);
    setPurgeProgress(0);
    setPurgeLogs(['[ OK ] Initiating Superuser Kernel Override...', 'Checking folder partitions...']);

    let step = 0;
    const items = [
      'Deleting /etc/resolv.conf...',
      'Deleting /home/visitor/Desktop/...',
      'Deleting /home/visitor/Projects/...',
      'Deleting /home/visitor/Resume/resume.pdf...',
      'Deleting /var/log/syslog...',
      'Format Partition ext4 on /dev/sda1...',
      'Uncoupling cloud targets (aws, azure, gcp)...',
      'Purging Kubernetes namespaces...'
    ];

    const interval = setInterval(() => {
      if (step < items.length) {
        setPurgeLogs(prev => [...prev, `[ OK ] ${items[step]}`]);
        setPurgeProgress(Math.floor(((step + 1) / items.length) * 100));
        step++;
      } else {
        clearInterval(interval);
        setPurgeLogs(prev => [...prev, 'System Deleted.', 'Just kidding! 😉 System restored. Nice try.', 'Restoring directories... Done.']);
        setTimeout(() => {
          setPurgeActive(false);
          setLines([{ text: 'System restored. Prompt active.', type: 'output', dir: '/home/visitor' }]);
        }, 3500);
      }
    }, 450);
  };

  // Convert ANSI escapes to HTML
  const ansiToHtml = (text: string): React.ReactNode => {
    const segments = text.split(/\u001b\[/);
    if (segments.length === 1) return text;
    
    return (
      <>
        {segments[0]}
        {segments.slice(1).map((seg, i) => {
          const match = seg.match(/^([0-9;]+)m([\s\S]*)/);
          if (!match) return '\u001b[' + seg;
          
          const code = match[1];
          const content = match[2];
          
          let classes = '';
          if (code === '0') {
            classes = '';
          } else if (code === '1;32' || code === '32') {
            classes = 'text-green-400 font-bold';
          } else if (code === '1;34' || code === '34') {
            classes = 'text-blue-400 font-bold';
          } else if (code === '1;36' || code === '36') {
            classes = 'text-cyan-400 font-bold';
          } else if (code === '1;31' || code === '31') {
            classes = 'text-red-400 font-bold';
          } else if (code === '1;33' || code === '33') {
            classes = 'text-yellow-400 font-bold';
          } else if (code === '1;35' || code === '35') {
            classes = 'text-purple-400 font-bold';
          } else if (code === '4;34') {
            classes = 'text-blue-400 underline';
          } else if (code === '30' || code === '1;30') {
            classes = 'text-zinc-500';
          }
          
          return (
            <span key={i} className={classes}>
              {content}
            </span>
          );
        })}
      </>
    );
  };

  const getDisplayDir = (path: string) => {
    if (path === '/home/visitor') return '~';
    if (path.startsWith('/home/visitor/')) {
      return '~/' + path.replace('/home/visitor/', '');
    }
    return path;
  };

  return (
    <div 
      onClick={focusTerminal}
      className="w-full h-full bg-black/90 font-mono text-[11px] md:text-[13px] leading-relaxed p-4 overflow-y-auto flex flex-col justify-start select-text cursor-text"
      ref={containerRef}
    >
      {/* Purge Deletion Overlay */}
      {purgeActive ? (
        <div className="w-full space-y-4 text-red-500 font-mono select-none">
          <div className="space-y-1.5">
            {purgeLogs.map((log, index) => (
              <div key={index}>{log}</div>
            ))}
          </div>
          
          {/* Deletion progress bar */}
          <div className="max-w-md border border-red-500 p-1 bg-black">
            <div 
              className="h-4 bg-red-600 transition-all duration-300"
              style={{ width: `${purgeProgress}%` }}
            />
          </div>
          <div className="text-xs text-red-500">Purging cluster volumes: {purgeProgress}%</div>
        </div>
      ) : (
        <>
          {/* Render historical logs */}
          <div className="space-y-1.5">
            {lines.map((line, idx) => {
              if (line.type === 'input') {
                return (
                  <div key={idx} className="flex items-center gap-1.5 select-none">
                    <span className="text-[#00ff00]">visitor@swapnil-dev</span>
                    <span className="text-zinc-500">:</span>
                    <span className="text-blue-400">{getDisplayDir(line.dir)}</span>
                    <span className="text-white">$</span>
                    <span className="text-white select-text">{line.text}</span>
                  </div>
                );
              }
              return (
                <div key={idx} className="whitespace-pre-wrap select-text">
                  {ansiToHtml(line.text)}
                </div>
              );
            })}
          </div>

          {/* Current typing prompt */}
          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            <span className="text-[#00ff00] select-none">visitor@swapnil-dev</span>
            <span className="text-zinc-500 select-none">:</span>
            <span className="text-blue-400 select-none">{getDisplayDir(currentDir)}</span>
            <span className="text-white select-none">$</span>

            {/* Input wrap */}
            <div className="relative flex-1 min-w-[200px]">
              {/* Autocomplete suggestion (ghost text) */}
              {suggestion && (
                <span className="absolute left-0 top-0 text-zinc-600 select-none pointer-events-none whitespace-pre">
                  {input + suggestion}
                </span>
              )}

              {/* Real Input */}
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => {
                  handleInputChange(e.target.value);
                  playTypeSound();
                }}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent text-white outline-none border-none p-0 m-0 caret-white selection:bg-accent focus:ring-0 whitespace-pre"
                autoFocus
                autoComplete="off"
                autoCapitalize="off"
                spellCheck="false"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
