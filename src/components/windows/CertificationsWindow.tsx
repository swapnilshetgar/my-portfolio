'use client';

import React from 'react';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';

interface Certification {
  title: string;
  issuer: string;
  date: string;
  idCode: string;
  link: string;
  badgeBg: string;
  badgeText: string;
  abbr: string;
}

export const CertificationsWindow: React.FC = () => {
  const certs: Certification[] = [
    {
      title: 'Certified Kubernetes Administrator (CKA)',
      issuer: 'The Linux Foundation',
      date: 'Dec 2025',
      idCode: 'CKA-8842-1204',
      link: 'https://verify.linuxfoundation.org',
      badgeBg: 'bg-blue-500/10',
      badgeText: 'text-blue-400',
      abbr: 'CKA'
    },
    {
      title: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services (AWS)',
      date: 'Aug 2024',
      idCode: 'AWS-ASA-9942-EXAMPLE',
      link: 'https://aws.amazon.com/verification',
      badgeBg: 'bg-orange-500/10',
      badgeText: 'text-orange-400',
      abbr: 'AWS'
    },
    {
      title: 'HashiCorp Certified: Terraform Associate',
      issuer: 'HashiCorp',
      date: 'Feb 2025',
      idCode: 'HC-TFA-0123-EXAMPLE',
      link: 'https://credly.com/verify-terraform',
      badgeBg: 'bg-purple-500/10',
      badgeText: 'text-purple-400',
      abbr: 'HASH'
    }
  ];

  return (
    <div className="w-full h-full p-6 overflow-y-auto select-none space-y-6">
      <div className="border-b border-white/10 pb-3">
        <h2 className="text-lg font-extrabold text-white font-sans">Active Certifications</h2>
        <p className="text-xs text-zinc-400 mt-0.5">Verified engineering and infrastructure credentials.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certs.map((c) => (
          <div 
            key={c.title}
            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-accent/30 transition-all flex items-start gap-4 shadow-md"
          >
            {/* Abbreviation Badge */}
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-mono font-black text-xs border border-white/5 flex-shrink-0 ${c.badgeBg} ${c.badgeText}`}>
              {c.abbr}
            </div>

            {/* Credential Data */}
            <div className="flex-1 space-y-1.5 min-w-0">
              <h3 className="text-xs font-bold text-white leading-snug truncate">{c.title}</h3>
              <p className="text-[10px] text-zinc-400 font-semibold">{c.issuer}</p>
              
              <div className="flex items-center justify-between text-[9px] text-zinc-500 pt-1">
                <span>Issued: {c.date}</span>
                <span className="font-mono">ID: {c.idCode}</span>
              </div>
              
              <hr className="border-white/5 my-1" />
              
              <a 
                href={c.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[10px] text-accent font-bold hover:underline"
              >
                <ShieldCheck size={11} />
                <span>Verify Credential</span>
                <ExternalLink size={10} className="ml-0.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
