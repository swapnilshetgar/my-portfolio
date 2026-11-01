'use client';

import React, { useState } from 'react';
import { ExternalLink, Github, Terminal, Shield, RefreshCw, BarChart2 } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  shortDesc: string;
  tech: string[];
  overview: string;
  features: string[];
  challenge: string;
  solution: string;
  github: string;
  icon: React.ReactNode;
  diagram: React.ReactNode;
}

export const ProjectsWindow: React.FC = () => {
  const [activeProj, setActiveProj] = useState<string>('proj1');

  const projects: Project[] = [
    {
      id: 'proj1',
      name: 'Multi-Cloud Infra Provisioning',
      shortDesc: 'Terraform blueprints for highly available cross-cloud clusters in AWS & Azure.',
      tech: ['AWS', 'Azure', 'Terraform', 'GitHub Actions', 'VPC Peering'],
      icon: <Terminal className="text-[#e95420]" size={16} />,
      overview: 'Engineered a highly available cross-cloud network infrastructure utilizing Terraform modular packages. It deploys autoscaling EC2 web fleets and SQL databases in AWS, while pairing VM host fallbacks in Azure VNets, linked via redundant IPSec VPN tunnels.',
      features: [
        'DynamoDB backend locks preventing state race conditions.',
        'GitHub Actions pipelines running validation checkers and auto plan reviews.',
        'Strict CIDR segment sheets preventing overlapping IP ranges.'
      ],
      challenge: 'Handling network CIDR overlaps and routing packets correctly between AWS Transit Gateways and Azure Virtual Network Gateways.',
      solution: 'Configured a central route registrar script in Terraform that dynamically computes non-overlapping subnets and injects security rules to allow only administrative packets to pass.',
      github: 'https://github.com/swapnil/multicloud-terraform-blueprints',
      diagram: (
        <svg className="w-full h-32 text-zinc-500" viewBox="0 0 400 120" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* AWS Box */}
          <rect x="20" y="20" width="100" height="80" rx="6" stroke="#e95420" fill="rgba(233,84,32,0.05)" />
          <text x="35" y="42" fill="#e95420" fontSize="10" fontWeight="bold">AWS Cloud</text>
          <rect x="35" y="55" width="30" height="20" rx="3" stroke="#fff" />
          <text x="42" y="68" fill="#fff" fontSize="8">EC2</text>
          <rect x="75" y="55" width="30" height="20" rx="3" stroke="#fff" />
          <text x="82" y="68" fill="#fff" fontSize="8">RDS</text>

          {/* Connection */}
          <path d="M 120 60 L 280 60" stroke="#fabd2f" strokeWidth="1.5" strokeDasharray="4,4" />
          <rect x="155" y="48" width="90" height="24" rx="4" stroke="#fabd2f" fill="#18181b" />
          <text x="162" y="63" fill="#fabd2f" fontSize="8" fontWeight="bold">IPSec VPN Peer</text>

          {/* Azure Box */}
          <rect x="280" y="20" width="100" height="80" rx="6" stroke="#33ccff" fill="rgba(51,204,255,0.05)" />
          <text x="295" y="42" fill="#33ccff" fontSize="10" fontWeight="bold">Azure Cloud</text>
          <rect x="295" y="55" width="30" height="20" rx="3" stroke="#fff" />
          <text x="302" y="68" fill="#fff" fontSize="8">VMs</text>
          <rect x="335" y="55" width="30" height="20" rx="3" stroke="#fff" />
          <text x="342" y="68" fill="#fff" fontSize="8">VNet</text>
        </svg>
      )
    },
    {
      id: 'proj2',
      name: 'Centralized Observability Stack',
      shortDesc: 'Prometheus metric collection and Grafana panels tracking cluster SLAs.',
      tech: ['Prometheus', 'Grafana', 'Alertmanager', 'Splunk', 'Kubernetes'],
      icon: <BarChart2 className="text-[#ff79c6]" size={16} />,
      overview: 'Implemented an end-to-end telemetry system mapping microservices on a Kubernetes cluster. The stack aggregates system stats, ingress rates, and node resources, providing real-time dashboards to track service-level objectives (SLOs).',
      features: [
        'Node-exporters running on all nodes feeding system metrics hourly.',
        'Dashboard panels tracking database query latency and API response errors.',
        'Alertmanager notifications sent directly to PagerDuty and Slack channels.'
      ],
      challenge: 'High metric cardinality bloating memory limits and degrading Prometheus querying speeds.',
      solution: 'Configured scraping filters to discard non-critical labels, increased memory storage limits, and deployed Thanos for archiving metrics older than 14 days.',
      github: 'https://github.com/swapnil/k8s-prometheus-grafana',
      diagram: (
        <svg className="w-full h-32 text-zinc-500" viewBox="0 0 400 120" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* Nodes */}
          <rect x="20" y="15" width="80" height="30" rx="4" stroke="#fff" />
          <text x="32" y="34" fill="#fff" fontSize="8">K8s Pods</text>
          <rect x="20" y="65" width="80" height="30" rx="4" stroke="#fff" />
          <text x="32" y="84" fill="#fff" fontSize="8">Host Nodes</text>

          {/* Arrow */}
          <path d="M 100 30 L 170 45" stroke="#fff" markerEnd="url(#arrow)" />
          <path d="M 100 80 L 170 55" stroke="#fff" markerEnd="url(#arrow)" />

          {/* Prometheus */}
          <rect x="170" y="35" width="90" height="40" rx="5" stroke="#e95420" fill="rgba(233,84,32,0.05)" />
          <text x="180" y="58" fill="#e95420" fontSize="10" fontWeight="bold">Prometheus</text>

          {/* Arrow */}
          <path d="M 260 55 L 310 55" stroke="#fff" />

          {/* Grafana */}
          <rect x="310" y="35" width="70" height="40" rx="5" stroke="#fabd2f" fill="rgba(250,189,47,0.05)" />
          <text x="325" y="58" fill="#fabd2f" fontSize="10" fontWeight="bold">Grafana</text>
        </svg>
      )
    },
    {
      id: 'proj3',
      name: 'Automated DR & Backup System',
      shortDesc: 'Automated crontab scripts running encrypted backups to S3 vaults.',
      tech: ['Linux bash', 'cron', 'GZIP', 'AWS S3', 'GPG Encryption'],
      icon: <RefreshCw className="text-[#fabd2f]" size={16} />,
      overview: 'Authored a suite of secure bash backup scripts that run as scheduled root cron tasks. The scripts compile configurations, SQL dumps, and active logs, compressing and encrypting them client-side before sync to AWS Glacier.',
      features: [
        'AES-256 client-side encryption using GPG keys.',
        'Glacier lifecycle rules setting transitions to cold storage.',
        'Weekly automated restoration check routines compiling health reports.'
      ],
      challenge: 'Network bandwidth choking during peak hours due to large database dump transfers.',
      solution: 'Configured token-bucket speed throttles in script execution, limiting upload rates to 20 Mbps during peak periods.',
      github: 'https://github.com/swapnil/secure-bash-backup-engine',
      diagram: (
        <svg className="w-full h-32 text-zinc-500" viewBox="0 0 400 120" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* Linux VM */}
          <rect x="25" y="25" width="90" height="70" rx="5" stroke="#fff" />
          <text x="42" y="45" fill="#fff" fontSize="9" fontWeight="bold">Linux Server</text>
          <text x="35" y="65" fill="#aaa" fontSize="8">cron -&gt; backup.sh</text>
          <text x="35" y="80" fill="#a9b1d6" fontSize="7">GZIP &amp; GPG</text>

          {/* Upload */}
          <path d="M 115 60 L 275 60" stroke="#00ff00" strokeWidth="1.5" strokeDasharray="3,3" />
          <text x="145" y="52" fill="#00ff00" fontSize="7">Encrypted Upload</text>

          {/* AWS S3 */}
          <rect x="275" y="25" width="90" height="70" rx="5" stroke="#e95420" fill="rgba(233,84,32,0.05)" />
          <text x="292" y="45" fill="#e95420" fontSize="9" fontWeight="bold">AWS S3 Vault</text>
          <text x="290" y="65" fill="#aaa" fontSize="8">Glacier Cold</text>
          <text x="290" y="80" fill="#aaa" fontSize="7">Lifecycle: 90d</text>
        </svg>
      )
    },
    {
      id: 'proj4',
      name: 'Network Hardening & Zero-Trust',
      shortDesc: 'WireGuard bastion hosting and nftables configuration dropping public packets.',
      tech: ['WireGuard', 'nftables', 'IAM policy', 'AWS SG', 'Cloudflare WAF'],
      icon: <Shield className="text-[#33ccff]" size={16} />,
      overview: 'Re-architected cloud infrastructure network layout to minimize exposure threat surfaces. Restructured routing gates, created isolated database subnets, and established encrypted WireGuard peer portals for all server administration.',
      features: [
        'nftables firewalls set to drop all incoming packets by default.',
        'AWS security group updates automated via GitHub Terraform pipelines.',
        'Bastion proxies limiting administrative access to authorized key tunnels.'
      ],
      challenge: 'Securely exposing web hook APIs to external callers without exposing database subnets.',
      solution: 'Configured API gateways protected by Cloudflare WAF, filtering queries and limiting incoming IPs to Cloudflare subnet ranges.',
      github: 'https://github.com/swapnil/zero-trust-network-hardening',
      diagram: (
        <svg className="w-full h-32 text-zinc-500" viewBox="0 0 400 120" fill="none" stroke="currentColor" strokeWidth="1.5">
          {/* Public */}
          <rect x="15" y="35" width="70" height="50" rx="4" stroke="#ff79c6" fill="rgba(255,121,198,0.05)" />
          <text x="25" y="55" fill="#ff79c6" fontSize="8" fontWeight="bold">Public Traffic</text>
          <text x="25" y="70" fill="#aaa" fontSize="7">Blocked by default</text>

          {/* VPN tunnel */}
          <path d="M 85 60 L 165 60" stroke="#33ccff" strokeWidth="2" />
          <text x="100" y="52" fill="#33ccff" fontSize="7">WireGuard VPN</text>

          {/* Bastion Host */}
          <rect x="165" y="35" width="80" height="50" rx="4" stroke="#fff" />
          <text x="175" y="55" fill="#fff" fontSize="8" fontWeight="bold">Bastion Proxy</text>
          <text x="175" y="70" fill="#00ff00" fontSize="7">Auth Approved</text>

          {/* Secure Network */}
          <path d="M 245 60 L 305 60" stroke="#00ff00" />
          
          {/* DB Subnet */}
          <rect x="305" y="35" width="80" height="50" rx="4" stroke="#00ff00" fill="rgba(0,255,0,0.05)" />
          <text x="315" y="55" fill="#00ff00" fontSize="8" fontWeight="bold">DB Subnet</text>
          <text x="315" y="70" fill="#aaa" fontSize="7">Strictly Isolated</text>
        </svg>
      )
    }
  ];

  const current = projects.find(p => p.id === activeProj) || projects[0];

  return (
    <div className="w-full h-full flex flex-col md:flex-row overflow-hidden select-none">
      
      {/* Left List Pane */}
      <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-white/10 flex flex-col flex-shrink-0 bg-black/30 overflow-y-auto">
        <div className="p-3.5 text-[11px] text-zinc-500 font-semibold uppercase tracking-wider border-b border-white/10 select-none">
          Project Repository
        </div>
        <div className="flex-1 p-2 space-y-1">
          {projects.map((p) => {
            const isActive = p.id === activeProj;
            return (
              <button
                key={p.id}
                onClick={() => setActiveProj(p.id)}
                className={`w-full p-3 rounded-lg text-left transition-all border flex items-start gap-2.5 cursor-pointer ${isActive ? 'bg-accent/15 border-accent text-white shadow-md' : 'bg-transparent border-transparent hover:bg-white/5 text-zinc-400 hover:text-zinc-200'}`}
              >
                <span className="mt-0.5">{p.icon}</span>
                <div>
                  <h4 className="text-xs font-bold leading-snug">{p.name}</h4>
                  <p className="text-[10px] text-zinc-500 mt-1 line-clamp-2 leading-relaxed">
                    {p.shortDesc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Details Pane */}
      <div className="flex-1 flex flex-col overflow-y-auto p-6 bg-black/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-4 mb-4 gap-4">
          <div>
            <h2 className="text-lg font-extrabold text-white">{current.name}</h2>
            <p className="text-[10px] text-zinc-400 mt-0.5">Automated deployment state active</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => window.open(current.github, '_blank')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-zinc-200 hover:text-white transition-all cursor-pointer font-semibold"
            >
              <Github size={13} />
              <span>Source Code</span>
            </button>
          </div>
        </div>

        {/* Overview */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">Architecture Overview</h3>
            <p className="text-xs md:text-sm text-zinc-300 leading-relaxed bg-white/5 border border-white/5 p-3.5 rounded-lg font-sans">
              {current.overview}
            </p>
          </div>

          {/* Tech stack badging */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Technologies Deployed</h3>
            <div className="flex flex-wrap gap-1.5">
              {current.tech.map((t) => (
                <span 
                  key={t}
                  className="text-[10px] font-bold font-mono px-2 py-0.5 bg-zinc-900 border border-white/10 text-accent rounded"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Diagram */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Logical Topology Diagram</h3>
            <div className="w-full bg-zinc-950/70 border border-white/10 rounded-xl p-3.5 flex items-center justify-center">
              {current.diagram}
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Key Engineering Features</h3>
            <ul className="list-disc pl-5 text-xs text-zinc-300 space-y-1.5 font-sans">
              {current.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="p-3.5 rounded-lg bg-red-950/15 border border-red-900/35 text-xs">
              <span className="font-bold text-red-400 block mb-1">Primary Challenge Faced</span>
              <p className="text-zinc-300 leading-relaxed">{current.challenge}</p>
            </div>
            <div className="p-3.5 rounded-lg bg-green-950/15 border border-green-900/35 text-xs">
              <span className="font-bold text-green-400 block mb-1">Engineered Solution</span>
              <p className="text-zinc-300 leading-relaxed">{current.solution}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
