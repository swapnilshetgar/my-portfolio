'use client';

import React from 'react';
import { Mail, Phone, MapPin, Laptop, Briefcase, Award } from 'lucide-react';

export const AboutWindow: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col md:flex-row p-6 gap-6 overflow-y-auto">
      {/* Left Sidebar: Avatar & Basic Metadata */}
      <div className="w-full md:w-1/3 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6 flex-shrink-0">
        
        {/* SVG Developer Avatar */}
        <div className="w-32 h-32 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center p-3 relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
          <svg className="w-24 h-24 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
            <path d="M6 8l3 3-3 3" />
            <line x1="10" y1="14" x2="15" y2="14" />
          </svg>
        </div>

        <h3 className="text-lg font-bold mt-4 text-white">Swapnil</h3>
        <p className="text-xs text-zinc-400">DevOps & SRE Specialist</p>
        <span className="mt-2 text-[10px] bg-accent/20 text-accent font-semibold px-2 py-0.5 rounded border border-accent/20">
          swapnil-dev
        </span>

        {/* Metadatas */}
        <div className="w-full mt-6 space-y-2.5 text-left text-xs text-zinc-300">
          <div className="flex items-center gap-2.5">
            <MapPin size={14} className="text-accent" />
            <span>Mumbai, India</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Mail size={14} className="text-accent" />
            <span>swapnil@example.com</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Phone size={14} className="text-accent" />
            <span>+91 9999999999</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Laptop size={14} className="text-accent" />
            <span>Linux & Multi-Cloud</span>
          </div>
        </div>
      </div>

      {/* Right Column: Bio details */}
      <div className="flex-1 space-y-5">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Briefcase size={18} className="text-accent" />
            Profile Summary
          </h2>
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed mt-2.5">
            I am a results-driven Cloud Infrastructure & Site Reliability Engineer with a solid foundation in Linux internals, virtualization, and multi-cloud architectures. I specialize in automating everything, optimizing containerized deployments, and managing Infrastructure as Code (IaC) to minimize architectural drift and manual toil.
          </p>
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed mt-2">
            My experience spans architecting highly available services on AWS, Azure, and GCP, developing robust CI/CD deployment gates, and writing automated shell and Python scripts. With a strong grasp of networking protocols, load balancers, and monitoring tools, I ensure production systems remain reliable, observable, and secure.
          </p>
        </div>

        <hr className="border-white/10" />

        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Award size={18} className="text-accent" />
            Core Philosophy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs">
              <span className="font-bold text-white block mb-1">Automation First</span>
              If a task needs to be performed more than twice, write a script or a Terraform module to run it. Reduce toil proactively.
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs">
              <span className="font-bold text-white block mb-1">Observability & SLOs</span>
              A system is only as good as its monitors. Rely heavily on metrics, alerts, and dashboards to resolve incidents before they reach users.
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs">
              <span className="font-bold text-white block mb-1">Zero-Trust Security</span>
              Restrict ports, segment subnets, and configure tight IAM rules. Treat inner boundaries just as strictly as outer networks.
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs">
              <span className="font-bold text-white block mb-1">GitOps Single Source</span>
              All infrastructure, policy configurations, and orchestration states belong in Git version control as the single source of truth.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
