'use client';

import React from 'react';
import { Award, GraduationCap, Calendar, CheckSquare } from 'lucide-react';

export const EducationWindow: React.FC = () => {
  return (
    <div className="w-full h-full p-6 overflow-y-auto select-none space-y-6">
      <div className="border-b border-white/10 pb-3">
        <h2 className="text-lg font-extrabold text-white font-sans">Academic Qualifications</h2>
        <p className="text-xs text-zinc-400 mt-0.5">Formal higher education details.</p>
      </div>

      <div className="p-5 rounded-xl bg-white/5 border border-white/10 relative overflow-hidden group">
        <div className="absolute right-4 top-4 opacity-5 text-white pointer-events-none group-hover:scale-110 transition-all duration-300">
          <GraduationCap size={120} />
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
            <GraduationCap size={22} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">Bachelor of Engineering in Computer Science</h3>
            <p className="text-xs text-zinc-400 mt-0.5">Mumbai University</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/5 pt-4 text-xs">
          <div>
            <span className="text-zinc-500 block uppercase tracking-wider text-[9px] font-semibold">Timeline</span>
            <span className="text-zinc-200 font-bold font-mono mt-0.5 flex items-center gap-1.5">
              <Calendar size={13} className="text-accent" />
              2019 - 2023
            </span>
          </div>
          <div>
            <span className="text-zinc-500 block uppercase tracking-wider text-[9px] font-semibold">Cumulative GPA</span>
            <span className="text-zinc-200 font-bold font-mono mt-0.5 flex items-center gap-1.5">
              <Award size={13} className="text-accent" />
              8.5 / 10.0
            </span>
          </div>
        </div>

        {/* Core subjects */}
        <div className="mt-5 border-t border-white/5 pt-4">
          <span className="text-zinc-500 block uppercase tracking-wider text-[9px] font-semibold mb-2">Core Electives</span>
          <div className="flex flex-wrap gap-1.5">
            {[
              'Computer Networks',
              'Operating Systems & Shells',
              'Database Management Systems',
              'Distributed Architectures',
              'Cloud Technologies'
            ].map((subject) => (
              <span 
                key={subject}
                className="text-[10px] font-bold font-sans px-2.5 py-0.5 bg-zinc-900 border border-white/5 text-zinc-300 rounded-full"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
