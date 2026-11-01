'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useOSStore } from '../../store/useOSStore';

interface LogLine {
  text: string;
  status: 'PENDING' | 'OK' | 'INFO';
}

const BOOT_LOG_TEMPLATES: { text: string; delay: number; hasSpinner?: boolean }[] = [
  { text: 'Loading Linux Kernel 6.8.0-generic...', delay: 200 },
  { text: 'Initializing CPU Hardware...', delay: 150 },
  { text: 'Mounting File Systems (ext4)...', delay: 100 },
  { text: 'Starting System Journal Daemon...', delay: 50 },
  { text: 'Starting Network Manager...', delay: 300 },
  { text: 'Bringing up interface eth0... IP 10.0.0.42/24 acquired', delay: 250 },
  { text: 'Starting SSH Daemon (sshd) on port 22...', delay: 100 },
  { text: 'Starting Docker Container Engine...', delay: 400 },
  { text: 'Starting containerd container runtime...', delay: 150 },
  { text: 'Initializing Kubernetes kubelet node manager...', delay: 350 },
  { text: 'Starting Prometheus Node Exporter...', delay: 100 },
  { text: 'Starting Grafana Server Dashboard daemon...', delay: 200 },
  { text: 'Mounting Cloud Volumes (aws-ebs, gcp-pd)...', delay: 300 },
  { text: 'Establishing IPSec VPN Tunnel to core subnet...', delay: 400 },
  { text: 'Running Terraform State Synchronization...', delay: 450 },
  { text: 'Loading Portfolio virtual filesystem configurations...', delay: 200 },
  { text: 'System Services initialized. Welcome, visitor.', delay: 100 }
];

export const BootLogger: React.FC = () => {
  const setPhase = useOSStore((state) => state.setPhase);
  const soundEnabled = useOSStore((state) => state.soundEnabled);
  const [logs, setLogs] = useState<LogLine[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Play a tiny high-pitched boot beep if sound is enabled
  useEffect(() => {
    if (soundEnabled) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
        gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.15);
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.2);
      } catch (e) {
        // AudioContext not allowed or not supported
      }
    }
  }, [soundEnabled]);

  useEffect(() => {
    let currentIdx = 0;
    let timeoutId: NodeJS.Timeout;

    const printNextLine = () => {
      if (currentIdx >= BOOT_LOG_TEMPLATES.length) {
        // Pause for 1 second, then transition to login
        timeoutId = setTimeout(() => {
          setPhase('login');
        }, 1200);
        return;
      }

      const template = BOOT_LOG_TEMPLATES[currentIdx];
      
      // Add current log as pending
      setLogs((prev) => [...prev, { text: template.text, status: 'PENDING' }]);
      
      // Scroll to bottom
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }

      // Staggered delay for completion marker
      timeoutId = setTimeout(() => {
        setLogs((prev) => {
          const updated = [...prev];
          const item = updated[updated.length - 1];
          if (item) {
            item.status = 'OK';
          }
          return updated;
        });

        currentIdx++;
        // Trigger next line
        timeoutId = setTimeout(printNextLine, 40 + Math.random() * 80);
      }, template.delay);
    };

    printNextLine();

    return () => clearTimeout(timeoutId);
  }, [setPhase]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full bg-black text-zinc-300 font-mono text-xs md:text-sm p-6 overflow-y-auto flex flex-col justify-start select-none noise-bg"
    >
      <div className="max-w-4xl mx-auto space-y-1">
        {logs.map((log, index) => {
          const isPending = log.status === 'PENDING';
          const isOk = log.status === 'OK';
          return (
            <div key={index} className="flex items-start gap-4">
              <span className="w-16 select-none flex-shrink-0">
                {isPending && (
                  <span className="text-yellow-500 font-bold">
                    [ <span className="animate-pulse">....</span> ]
                  </span>
                )}
                {isOk && (
                  <span className="text-green-500 font-bold">[  OK  ]</span>
                )}
              </span>
              <span className={isOk ? "text-zinc-200" : "text-zinc-400"}>
                {log.text}
              </span>
            </div>
          );
        })}
        <div className="h-8"></div>
      </div>
    </div>
  );
};
