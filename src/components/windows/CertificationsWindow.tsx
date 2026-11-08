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
    title: 'Oracle SQL Certificate',
    issuer: 'Great Learning Academy',
    date: '2024',
    idCode: 'ORACLE-SQL-2024',
    link: '#',
    badgeBg: 'bg-red-500/10',
    badgeText: 'text-red-400',
    abbr: 'SQL'
  },
  {
    title: 'Linux Certification',
    issuer: 'Naresh IT Hyderabad',
    date: '2024',
    idCode: 'NARESHIT-LINUX-2024',
    link: '#',
    badgeBg: 'bg-green-500/10',
    badgeText: 'text-green-400',
    abbr: 'LNX'
  },
  {
    title: 'AWS Cloud Practitioner Essential',
    issuer: 'Simplilearn SkillUp',
    date: '2026',
    idCode: '9896881_10033174',
    link: 'https://simpli-web.app.link/e/uo4LG52CT7b',
    badgeBg: 'bg-orange-500/10',
    badgeText: 'text-orange-400',
    abbr: 'AWS'
  },
  {
    title: 'SQL (Basic) Certification',
    issuer: 'HackerRank',
    date: '2025',
    idCode: '0D03423D0F85',
    link: 'https://drive.google.com/file/d/1N-s2MTkEBzbQQ6rFL_kuWE-ZxlHXC4SH/view?usp=drive_link',
    badgeBg: 'bg-emerald-500/10',
    badgeText: 'text-emerald-400',
    abbr: 'SQL'
  },
  {
    title: 'SQL (Intermediate) Certification',
    issuer: 'HackerRank',
    date: '2025',
    idCode: 'AE88E8ED19AD',
    link: 'https://drive.google.com/file/d/1keAXzTbAQMlFpK79gWlsbfUx1EUDt2Ju/view?usp=drive_link',
    badgeBg: 'bg-green-500/10',
    badgeText: 'text-green-400',
    abbr: 'SQL'
  },
  {
    title: 'Web Development Internship',
    issuer: 'PHN Technology Pvt. Ltd.',
    date: '2023',
    idCode: 'PHN_20230616360',
    link: 'https://drive.google.com/file/d/1OSCuVH4tu3YpDAxSuWeC9LedCKG7fOWh/view?usp=drive_link',
    badgeBg: 'bg-blue-500/10',
    badgeText: 'text-blue-400',
    abbr: 'WEB'
  },
  {
    title: 'Project Management Fundamentals',
    issuer: 'IBM SkillsBuild',
    date: '2023',
    idCode: 'ILB-DNRVRVRGKDNQPQ9X',
    link: 'https://drive.google.com/file/d/1FSmwCkhf5RXeD0WOTJcopFWKfZ-eLTIS/view?usp=drive_link',
    badgeBg: 'bg-purple-500/10',
    badgeText: 'text-purple-400',
    abbr: 'IBM'
  },
  {
    title: 'MaTPO Aptitude Idol-2023',
    issuer: 'MaTPO / Directorate of Technical Education, Maharashtra',
    date: '2023',
    idCode: 'MaTPO/MAI-2023/8834',
    link: 'https://drive.google.com/file/d/1j8QrAyfXhA6IfWcF79e7ALg2AeFtucgq/view?usp=drive_link',
    badgeBg: 'bg-yellow-500/10',
    badgeText: 'text-yellow-400',
    abbr: 'APT'
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
