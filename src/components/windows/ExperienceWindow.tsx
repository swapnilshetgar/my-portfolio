'use client';

import React from 'react';
import { Calendar, Briefcase, ChevronRight } from 'lucide-react';

interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  duration: string;
  bullets: string[];
  skillsUsed: string[];
}

export const ExperienceWindow: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      role: 'Cloud Infrastructure Engineer',
      company: 'Global Tech Solutions',
      location: 'Mumbai, India',
      duration: 'June 2024 - Present',
      bullets: [
        'Designed and provisioned modular AWS and Azure architectures using Terraform, reducing infra drift anomalies by 90%.',
        'Implemented centralized monitoring stacks (Prometheus/Grafana) across 80+ VM instances, cutting MTTD by 40%.',
        'Optimized resource limits and ingress configuration on Kubernetes clusters, saving 18% in monthly cloud spend.',
        'Authored robust GitHub Actions CI/CD workflows, slashing staging-to-prod deployment durations in half.'
      ],
      skillsUsed: ['Terraform', 'AWS', 'Azure', 'Kubernetes', 'Prometheus', 'Grafana', 'GitHub Actions']
    },
    {
      role: 'Associate Site Reliability Engineer (Internship)',
      company: 'CloudScale Systems',
      location: 'Pune, India',
      duration: 'Jan 2023 - Dec 2023',
      bullets: [
        'Automated database snapshot backups and script compression algorithms targeting S3 vaults.',
        'Wrote custom shell monitoring scripts to alert on root partition sizes and memory spike leaks.',
        'Configured firewall ports, Security Groups, and WireGuard tunnels to harden server network surfaces.'
      ],
      skillsUsed: ['Linux Admin', 'Bash Scripting', 'AWS S3', 'nftables', 'WireGuard VPN']
    }
  ];

  return (
    <div className="w-full h-full p-6 overflow-y-auto select-none space-y-6">
      <div className="border-b border-white/10 pb-3">
        <h2 className="text-lg font-extrabold text-white">Professional Experience</h2>
        <p className="text-xs text-zinc-400 mt-0.5">Chronology of DevOps and SRE positions.</p>
      </div>

      {/* Vertical Timeline container */}
      <div className="relative border-l-2 border-white/10 ml-3 pl-6 space-y-8">
        {experiences.map((exp, index) => (
          <div key={index} className="relative">
            {/* Timeline Dot */}
            <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-accent border-2 border-black flex items-center justify-center shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </span>

            {/* Position Block */}
            <div className="space-y-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-1.5">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Briefcase size={14} className="text-accent" />
                    {exp.role}
                  </h3>
                  <p className="text-xs text-zinc-400 font-semibold">{exp.company} — <span className="font-normal text-zinc-500">{exp.location}</span></p>
                </div>
                <div className="text-[10px] text-zinc-400 font-bold font-mono bg-white/5 border border-white/5 px-2 py-0.5 rounded flex items-center gap-1 self-start md:self-center">
                  <Calendar size={11} className="text-accent" />
                  {exp.duration}
                </div>
              </div>

              {/* Bullets */}
              <ul className="space-y-1.5 text-xs text-zinc-300 font-sans list-none pl-1">
                {exp.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <ChevronRight size={12} className="text-accent mt-0.5 flex-shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {exp.skillsUsed.map((skill) => (
                  <span 
                    key={skill}
                    className="text-[9px] font-bold font-mono px-2 py-0.5 bg-zinc-900 border border-white/5 text-accent rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
