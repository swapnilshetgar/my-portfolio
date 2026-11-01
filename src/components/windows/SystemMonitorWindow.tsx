'use client';

import React, { useState, useEffect } from 'react';
import { useOSStore } from '../../store/useOSStore';
import { Cpu, Terminal, Network, ShieldCheck } from 'lucide-react';

interface Process {
  pid: number;
  user: string;
  cpu: number;
  mem: number;
  command: string;
}

interface Pod {
  name: string;
  ready: string;
  status: string;
  restarts: number;
  age: string;
}

export const SystemMonitorWindow: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sys' | 'k8s' | 'net'>('sys');
  const [procList, setProcList] = useState<Process[]>([]);
  
  const cpuUsage = useOSStore((state) => state.cpuUsage);
  const ramUsage = useOSStore((state) => state.ramUsage);
  const netUp = useOSStore((state) => state.networkUp);
  const netDown = useOSStore((state) => state.networkDown);

  // Generate process list
  useEffect(() => {
    const list: Process[] = [
      { pid: 1, user: 'root', cpu: 0.1, mem: 0.5, command: '/sbin/init splash' },
      { pid: 12, user: 'root', cpu: 0.0, mem: 0.0, command: '[kthreadd]' },
      { pid: 42, user: 'visitor', cpu: 2.1, mem: 14.5, command: 'node /app/next-dev-server' },
      { pid: 104, user: 'root', cpu: 1.5, mem: 8.2, command: '/usr/bin/dockerd --config-file=/etc' },
      { pid: 211, user: 'root', cpu: 0.5, mem: 4.8, command: '/usr/bin/kubelet --config=/var/lib' },
      { pid: 492, user: 'prometheus', cpu: 1.0, mem: 12.0, command: '/usr/bin/prometheus --config' },
      { pid: 820, user: 'grafana', cpu: 0.8, mem: 6.2, command: '/usr/sbin/grafana-server' },
      { pid: 1045, user: 'visitor', cpu: 0.0, mem: 1.2, command: '/bin/bash' },
      { pid: 2410, user: 'visitor', cpu: 5.5, mem: 3.5, command: 'htop' }
    ];
    setProcList(list);
  }, []);

  // Fluctuating process CPU loads slightly
  useEffect(() => {
    const timer = setInterval(() => {
      setProcList((prev) => 
        prev.map(p => {
          if (p.pid === 42 || p.pid === 2410 || p.pid === 104) {
            const drift = (Math.random() - 0.5) * 1.5;
            const final = Math.max(0.1, p.cpu + drift);
            return { ...p, cpu: parseFloat(final.toFixed(1)) };
          }
          return p;
        })
      );
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const pods: Pod[] = [
    { name: 'kubernetes-cluster-operator-7f8bf', ready: '1/1', status: 'Running', restarts: 0, age: '32d' },
    { name: 'terraform-engine-state-lock-8cf2a', ready: '1/1', status: 'Running', restarts: 0, age: '32d' },
    { name: 'prometheus-node-exporter-2d8ab', ready: '1/1', status: 'Running', restarts: 0, age: '32d' },
    { name: 'grafana-dashboard-render-9df1a', ready: '1/1', status: 'Running', restarts: 0, age: '32d' },
    { name: 'nginx-ingress-gateway-prod-a84ef', ready: '1/1', status: 'Running', restarts: 0, age: '32d' },
    { name: 'docker-registry-mirror-7b56a', ready: '1/1', status: 'Running', restarts: 0, age: '32d' }
  ];

  return (
    <div className="w-full h-full flex flex-col overflow-hidden select-none font-mono">
      {/* Top Monitor Navigation */}
      <div className="h-11 px-3 bg-black/40 border-b border-white/10 flex items-center gap-1.5 flex-shrink-0">
        <button 
          onClick={() => setActiveTab('sys')}
          className={`h-7 px-3 rounded text-xs flex items-center gap-1.5 cursor-pointer transition-all ${activeTab === 'sys' ? 'bg-accent/20 border border-accent/40 text-white font-bold' : 'border border-transparent text-zinc-400 hover:text-zinc-200'}`}
        >
          <Cpu size={14} />
          <span>System Resources</span>
        </button>
        <button 
          onClick={() => setActiveTab('k8s')}
          className={`h-7 px-3 rounded text-xs flex items-center gap-1.5 cursor-pointer transition-all ${activeTab === 'k8s' ? 'bg-accent/20 border border-accent/40 text-white font-bold' : 'border border-transparent text-zinc-400 hover:text-zinc-200'}`}
        >
          <Terminal size={14} />
          <span>Kubernetes Pods</span>
        </button>
        <button 
          onClick={() => setActiveTab('net')}
          className={`h-7 px-3 rounded text-xs flex items-center gap-1.5 cursor-pointer transition-all ${activeTab === 'net' ? 'bg-accent/20 border border-accent/40 text-white font-bold' : 'border border-transparent text-zinc-400 hover:text-zinc-200'}`}
        >
          <Network size={14} />
          <span>Network Topology</span>
        </button>
      </div>

      {/* Main Tab Area */}
      <div className="flex-1 p-5 overflow-y-auto">
        {activeTab === 'sys' && (
          <div className="space-y-6">
            
            {/* Progress Bars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* CPU Meter */}
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>[CPU UTILIZATION]</span>
                  <span className="text-accent">{cpuUsage}%</span>
                </div>
                <div className="w-full h-4 bg-zinc-900 border border-white/5 rounded overflow-hidden flex">
                  <div 
                    className="h-full bg-accent transition-all duration-300"
                    style={{ width: `${cpuUsage}%` }}
                  />
                </div>
                <div className="text-[10px] text-zinc-500">Octa-Core virtual host executor</div>
              </div>

              {/* RAM Meter */}
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span>[MEMORY RESIDENT]</span>
                  <span className="text-[#33ccff]">{ramUsage}%</span>
                </div>
                <div className="w-full h-4 bg-zinc-900 border border-white/5 rounded overflow-hidden">
                  <div 
                    className="h-full bg-[#33ccff] transition-all duration-300"
                    style={{ width: `${ramUsage}%` }}
                  />
                </div>
                <div className="text-[10px] text-zinc-500">3.6 GB utilized of 8 GB memory pool</div>
              </div>
            </div>

            {/* Simulated Process htop listing */}
            <div className="border border-white/10 rounded-xl overflow-hidden shadow-lg bg-black/40">
              <div className="bg-zinc-900 px-4 py-2 text-[10px] text-zinc-500 font-bold border-b border-white/10 uppercase tracking-widest">
                Active PID Host Processes
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 bg-zinc-950 text-zinc-400 text-[10px] font-bold">
                      <th className="p-2.5">PID</th>
                      <th className="p-2.5">USER</th>
                      <th className="p-2.5">CPU%</th>
                      <th className="p-2.5">MEM%</th>
                      <th className="p-2.5">COMMAND</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-zinc-300">
                    {procList.map((p) => (
                      <tr key={p.pid} className="hover:bg-white/5 font-mono">
                        <td className="p-2.5 text-zinc-500">{p.pid}</td>
                        <td className="p-2.5">{p.user}</td>
                        <td className="p-2.5 text-accent">{p.cpu}%</td>
                        <td className="p-2.5 text-[#33ccff]">{p.mem}%</td>
                        <td className="p-2.5 text-zinc-400 break-all select-all font-mono">{p.command}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Kubernetes Pods Tab */}
        {activeTab === 'k8s' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
              <span className="font-bold text-white uppercase">[K8S DEFAULT NAMESPACE PODS]</span>
              <span className="text-[10px] bg-green-500/10 border border-green-500/20 text-[#00ff00] font-semibold px-2 py-0.5 rounded">
                Active Cluster Connection
              </span>
            </div>
            
            <div className="border border-white/10 rounded-xl overflow-hidden shadow-lg bg-black/40">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 bg-zinc-950 text-zinc-400 text-[10px] font-bold">
                      <th className="p-2.5">NAME</th>
                      <th className="p-2.5">READY</th>
                      <th className="p-2.5">STATUS</th>
                      <th className="p-2.5">RESTARTS</th>
                      <th className="p-2.5">AGE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-zinc-300">
                    {pods.map((p) => (
                      <tr key={p.name} className="hover:bg-white/5">
                        <td className="p-2.5 text-zinc-200">{p.name}</td>
                        <td className="p-2.5">{p.ready}</td>
                        <td className="p-2.5">
                          <span className="text-[#00ff00] font-semibold bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/15">
                            {p.status}
                          </span>
                        </td>
                        <td className="p-2.5">{p.restarts}</td>
                        <td className="p-2.5 text-zinc-500">{p.age}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Network Topology Tab */}
        {activeTab === 'net' && (
          <div className="space-y-6">
            
            {/* Rates widget */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-[10px] text-zinc-500 block uppercase font-bold">Network TX Egress</span>
                <span className="text-xl font-bold font-mono text-[#00ff00] mt-1 block">{netUp}</span>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-[10px] text-zinc-500 block uppercase font-bold">Network RX Ingress</span>
                <span className="text-xl font-bold font-mono text-[#33ccff] mt-1 block">{netDown}</span>
              </div>
            </div>

            {/* Network Hardened Ping latencies */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-3">
              <span className="text-xs font-bold text-white block uppercase">[PING TIMEOUT CHANNELS]</span>
              
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 bg-zinc-950/40 border border-white/5 rounded">
                  <span className="text-zinc-400">AWS Transit Gateway (us-east-1)</span>
                  <span className="text-[#00ff00] font-bold">18.4 ms &bull; OK</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-zinc-950/40 border border-white/5 rounded">
                  <span className="text-zinc-400">Azure Virtual Gateway (westeurope)</span>
                  <span className="text-[#00ff00] font-bold">29.1 ms &bull; OK</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-zinc-950/40 border border-white/5 rounded">
                  <span className="text-zinc-400">Cloudflare WAF Ingress</span>
                  <span className="text-[#00ff00] font-bold">4.2 ms &bull; OK</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-zinc-950/40 border border-white/5 rounded">
                  <span className="text-zinc-400">Private Database Isolated Subnet</span>
                  <span className="text-zinc-500 font-bold">Blocked &bull; Zero Trust</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
