'use client';

import React from 'react';
import { Cpu, Cloud, Layers, ShieldAlert, MonitorCheck, Database } from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: { name: string; level: number }[];
}

export const SkillsWindow: React.FC = () => {
  const skillSets: SkillCategory[] = [
    {
      title: 'Infrastructure & IaC',
      icon: <Layers size={18} className="text-[#ff79c6]" />,
      skills: [
        { name: 'Terraform (IaC)', level: 92 },
        { name: 'Ansible Playbooks', level: 85 },
        { name: 'CloudFormation', level: 75 },
        { name: 'Bash & Python Scripting', level: 88 }
      ]
    },
    {
      title: 'Cloud Platforms',
      icon: <Cloud size={18} className="text-[#33ccff]" />,
      skills: [
        { name: 'Amazon Web Services (AWS)', level: 90 },
        { name: 'Microsoft Azure Cloud', level: 80 },
        { name: 'Google Cloud Platform (GCP)', level: 70 }
      ]
    },
    {
      title: 'Operating Systems',
      icon: <Cpu size={18} className="text-[#fabd2f]" />,
      skills: [
        { name: 'Linux System Admin (RHEL/Ubuntu)', level: 95 },
        { name: 'Linux Kernel & Boot Internals', level: 85 },
        { name: 'Windows Server Management', level: 75 }
      ]
    },
    {
      title: 'Containers & Orchestration',
      icon: <Layers size={18} className="text-[#cba6f7]" />,
      skills: [
        { name: 'Kubernetes Cluster Admin', level: 88 },
        { name: 'Docker Containers & Compose', level: 92 },
        { name: 'Helm Chart Deployment', level: 80 }
      ]
    },
    {
      title: 'Observability & Monitoring',
      icon: <MonitorCheck size={18} className="text-[#00ff00]" />,
      skills: [
        { name: 'Prometheus Metric Ingestion', level: 88 },
        { name: 'Grafana Custom Dashboards', level: 90 },
        { name: 'Splunk & ELK Log Aggregation', level: 80 }
      ]
    },
    {
      title: 'Networking & Security',
      icon: <ShieldAlert size={18} className="text-[#e95420]" />,
      skills: [
        { name: 'TCP/IP, DNS, & VPN (WireGuard)', level: 90 },
        { name: 'nftables/iptables Firewalls', level: 85 },
        { name: 'Cloud IAM Policy Design', level: 88 }
      ]
    }
  ];

  return (
    <div className="w-full h-full p-6 overflow-y-auto space-y-6 select-none">
      <div className="border-b border-white/10 pb-3">
        <h2 className="text-lg font-extrabold text-white">Technical Core Stack</h2>
        <p className="text-xs text-zinc-400 mt-0.5">Categorized systems capabilities and relative competency levels.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {skillSets.map((cat) => (
          <div 
            key={cat.title} 
            className="p-4 rounded-xl bg-white/5 border border-white/10 shadow-lg hover:border-accent/35 transition-all"
          >
            <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
              {cat.icon}
              <h3 className="text-sm font-bold text-white tracking-wide">{cat.title}</h3>
            </div>
            
            <div className="space-y-3.5">
              {cat.skills.map((skill) => (
                <div key={skill.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-zinc-200">{skill.name}</span>
                    <span className="text-zinc-400 text-[10px] font-mono">{skill.level}%</span>
                  </div>
                  
                  {/* Progress Bar Container */}
                  <div className="w-full h-2 bg-zinc-900 border border-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Databases and Version Control badges */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <Database size={20} className="text-[#33ccff]" />
          <div>
            <h4 className="text-xs font-bold text-white">Other Core Tools & Databases</h4>
            <p className="text-[10px] text-zinc-500">Databases, VCS, and professional workflows.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 justify-center">
          {['PostgreSQL', 'MySQL', 'Oracle SQL', 'Git', 'GitHub', 'GitLab CI', 'Jira', 'ServiceNow', 'ITIL basics'].map((badge) => (
            <span 
              key={badge} 
              className="text-[10px] font-bold font-mono px-2.5 py-0.5 bg-zinc-900 border border-white/10 text-zinc-300 rounded-full"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
