'use client';

import React from 'react';
import { Download, FileText } from 'lucide-react';

export const ResumeWindow: React.FC = () => {
  
  const handleDownload = () => {
    // Generate a simple text representation of the resume for download
    const resumeText = `SWAPNIL
DevOps & Site Reliability Engineer
Mumbai, India | swapnil@example.com | +91 9999999999
GitHub: https://github.com/swapnil | LinkedIn: https://linkedin.com/in/swapnil

=== PROFESSIONAL SUMMARY ===
Results-driven Cloud Infrastructure & Site Reliability Engineer specializing in Linux internals, Multi-Cloud automation, Infrastructure as Code, Kubernetes orchestration, and observability stacks.

=== TECHNICAL SKILLS ===
- Operating Systems: Linux (RHEL, Ubuntu), Windows Server
- Cloud Platforms: AWS, Azure, GCP
- Infrastructure as Code: Terraform, Ansible
- Containers & Orchestration: Docker, Kubernetes, Helm
- Observability: Prometheus, Grafana, Splunk, ELK
- Networking: TCP/IP, DNS, VPN (WireGuard), Firewalls
- CI/CD: GitHub Actions, Jenkins

=== WORK EXPERIENCE ===
1. Cloud Infrastructure Engineer | Global Tech Solutions (June 2024 - Present)
   - Provisioned multi-region AWS/Azure infrastructure with Terraform modules.
   - Reduced MTTD by 40% using Prometheus & Grafana alerting dashboards.
   - Managed Kubernetes limits to save 18% in monthly cloud spend.
   
2. Associate SRE (Internship) | CloudScale Systems (Jan 2023 - Dec 2023)
   - Automated S3 database snapshots and cron compression scripts.
   - Troubleshot server performance issues on Linux VM clusters.
   - Hardened subnet boundaries and firewall configurations.

=== EDUCATION ===
- Bachelor of Engineering in Computer Science | CGPA: 8.5/10 (2019 - 2023)

=== CERTIFICATIONS ===
- Certified Kubernetes Administrator (CKA)
- AWS Certified Solutions Architect - Associate
- HashiCorp Certified Terraform Associate
`;

    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Swapnil_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden select-none bg-zinc-900">
      {/* Top action bar */}
      <div className="h-12 px-4 bg-zinc-950 border-b border-white/5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-accent" />
          <span className="text-xs text-zinc-300 font-semibold font-mono">Swapnil_Resume.txt</span>
        </div>
        <button 
          onClick={handleDownload}
          className="flex items-center gap-1.5 px-3 py-1 bg-accent hover:bg-accent-hover text-white rounded text-xs transition-all cursor-pointer font-bold"
        >
          <Download size={13} />
          <span>Download file</span>
        </button>
      </div>

      {/* Sheet viewport container */}
      <div className="flex-1 overflow-y-auto p-6 flex justify-center bg-zinc-900/60">
        {/* Paper Sheet */}
        <div className="w-full max-w-2xl bg-white text-zinc-800 p-8 shadow-2xl rounded border border-zinc-200 min-h-[800px] flex flex-col font-sans select-text select-all">
          
          {/* Header */}
          <div className="text-center border-b-2 border-zinc-900 pb-4">
            <h1 className="text-3xl font-black tracking-tight text-zinc-900">SWAPNIL</h1>
            <p className="text-sm font-bold text-accent tracking-wider uppercase mt-1">DevOps & Site Reliability Engineer</p>
            <p className="text-xs text-zinc-500 mt-2 font-mono">
              Mumbai, India &bull; swapnil@example.com &bull; +91 9999999999
            </p>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">
              github.com/swapnil &bull; linkedin.com/in/swapnil
            </p>
          </div>

          {/* Section: Summary */}
          <div className="mt-6">
            <h2 className="text-xs font-black uppercase tracking-widest text-zinc-900 border-b border-zinc-300 pb-1 mb-2 font-mono">Professional Summary</h2>
            <p className="text-xs text-zinc-700 leading-relaxed font-sans">
              Results-driven Cloud Infrastructure & Site Reliability Engineer specializing in Linux systems admin, Multi-Cloud automation, Infrastructure as Code, Kubernetes orchestration, and observability stacks. Passionate about automating repetitive workflows, reducing toil, and configuring zero-trust boundaries.
            </p>
          </div>

          {/* Section: Experience */}
          <div className="mt-6">
            <h2 className="text-xs font-black uppercase tracking-widest text-zinc-900 border-b border-zinc-300 pb-1 mb-2.5 font-mono">Professional Experience</h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-zinc-900">
                  <span>Cloud Infrastructure Engineer</span>
                  <span>June 2024 - Present</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-zinc-500 font-medium italic">
                  <span>Global Tech Solutions</span>
                  <span>Mumbai, India</span>
                </div>
                <ul className="list-disc pl-4 mt-1.5 text-[11px] text-zinc-700 space-y-1">
                  <li>Provisioned modular AWS/Azure environments using Terraform, eliminating architectural drift.</li>
                  <li>Deployed Prometheus & Grafana stacks, reducing incident detection time (MTTD) by 40%.</li>
                  <li>Managed Kubernetes clusters, optimizing limits to reduce monthly cloud spend by 18%.</li>
                  <li>Configured CI/CD pipelines in GitHub Actions, slashing deploy times by 50%.</li>
                </ul>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-bold text-zinc-900">
                  <span>Associate SRE (Internship)</span>
                  <span>Jan 2023 - Dec 2023</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-zinc-500 font-medium italic">
                  <span>CloudScale Systems</span>
                  <span>Pune, India</span>
                </div>
                <ul className="list-disc pl-4 mt-1.5 text-[11px] text-zinc-700 space-y-1">
                  <li>Automated S3 database snapshot backups and script compression algorithms.</li>
                  <li>Troubleshot server resource bottlenecks and high-memory load spikes on Linux host clusters.</li>
                  <li>Hardened network boundary permissions using nftables and security group structures.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section: Technical Stack */}
          <div className="mt-6">
            <h2 className="text-xs font-black uppercase tracking-widest text-zinc-900 border-b border-zinc-300 pb-1 mb-2 font-mono">Technical Expertise</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-[11px] text-zinc-700">
              <div><strong>Operating Systems:</strong> Linux (RHEL, Ubuntu), Windows Server</div>
              <div><strong>Containers:</strong> Docker, Kubernetes, Helm</div>
              <div><strong>Cloud Platforms:</strong> AWS, Azure, GCP</div>
              <div><strong>IaC & Scripting:</strong> Terraform, Ansible, Bash, Python</div>
              <div><strong>Observability:</strong> Prometheus, Grafana, Splunk, ELK</div>
              <div><strong>Networking:</strong> TCP/IP, DNS, VPN (WireGuard), Firewalls</div>
            </div>
          </div>

          {/* Section: Education */}
          <div className="mt-6">
            <h2 className="text-xs font-black uppercase tracking-widest text-zinc-900 border-b border-zinc-300 pb-1 mb-2 font-mono">Education</h2>
            <div className="flex items-center justify-between text-xs font-bold text-zinc-900">
              <span>Bachelor of Engineering in Computer Science</span>
              <span>2019 - 2023</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-zinc-500">
              <span>Mumbai University</span>
              <span>CGPA: 8.5/10.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
