'use client';

import React, { useState, FormEvent } from 'react';
import { Mail, Phone, Github, Linkedin, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { useOSStore } from '../../store/useOSStore';

export const ContactWindow: React.FC = () => {
  const soundEnabled = useOSStore((state) => state.soundEnabled);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSending(true);

    // Audio sound
    if (soundEnabled) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5 note
        gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.1);
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.12);
      } catch (err) {}
    }

    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      
      // Reset after success screen
      setTimeout(() => {
        setName('');
        setEmail('');
        setMessage('');
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row p-6 gap-6 overflow-y-auto select-none">
      
      {/* Left Column: Direct Info */}
      <div className="w-full md:w-2/5 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6 gap-6">
        <div className="space-y-4">
          <h2 className="text-lg font-extrabold text-white">Contact Interface</h2>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            Have an open DevOps role, an SRE project, or simply want to chat systems architecture? Drop a message directly through the panel or reach out via external channels.
          </p>
        </div>

        {/* Channels */}
        <div className="space-y-3.5 text-xs text-zinc-300">
          <div className="flex items-center gap-3 bg-white/5 border border-white/5 p-3 rounded-lg hover:border-accent/25 transition-all">
            <Mail size={16} className="text-accent flex-shrink-0" />
            <div>
              <span className="text-[10px] text-zinc-500 block">Email Endpoint</span>
              <span className="font-mono">swapnil@example.com</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 border border-white/5 p-3 rounded-lg hover:border-accent/25 transition-all">
            <Phone size={16} className="text-accent flex-shrink-0" />
            <div>
              <span className="text-[10px] text-zinc-500 block">Phone Endpoint</span>
              <span className="font-mono">+91 9999999999</span>
            </div>
          </div>
        </div>

        {/* Socials buttons */}
        <div className="flex gap-2">
          <button 
            onClick={() => window.open('https://github.com/swapnil', '_blank')}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-zinc-900 border border-white/10 hover:bg-zinc-800 rounded-lg text-xs text-zinc-200 hover:text-white transition-all cursor-pointer font-bold"
          >
            <Github size={14} />
            <span>GitHub</span>
          </button>
          <button 
            onClick={() => window.open('https://linkedin.com/in/swapnil', '_blank')}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-zinc-900 border border-white/10 hover:bg-zinc-800 rounded-lg text-xs text-zinc-200 hover:text-white transition-all cursor-pointer font-bold"
          >
            <Linkedin size={14} />
            <span>LinkedIn</span>
          </button>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="flex-1 flex flex-col justify-center">
        {isSuccess ? (
          <div className="w-full flex flex-col items-center justify-center text-center p-6 space-y-3 bg-green-950/10 border border-green-900/35 rounded-xl animate-fade-in">
            <CheckCircle2 size={36} className="text-[#00ff00]" />
            <h3 className="text-sm font-bold text-white">Message Dispatched!</h3>
            <p className="text-xs text-zinc-400 font-sans">
              Handshake established successfully. I will get back to you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Sender Name</label>
              <input 
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSending}
                placeholder="e.g. John Doe"
                className="w-full h-10 px-3 bg-white/5 border border-white/10 focus:border-accent/40 rounded-lg text-xs text-white placeholder-zinc-500 outline-none transition-all"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Sender Email Address</label>
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSending}
                placeholder="e.g. john@company.com"
                className="w-full h-10 px-3 bg-white/5 border border-white/10 focus:border-accent/40 rounded-lg text-xs text-white placeholder-zinc-500 outline-none transition-all"
              />
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Payload / Message Content</label>
              <textarea 
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isSending}
                placeholder="Type your message here..."
                className="w-full p-3 bg-white/5 border border-white/10 focus:border-accent/40 rounded-lg text-xs text-white placeholder-zinc-500 outline-none transition-all resize-none"
              />
            </div>

            {/* Submit */}
            <button 
              type="submit"
              disabled={isSending || !name || !email || !message}
              className="w-full h-10 bg-accent hover:bg-accent-hover disabled:bg-zinc-800 text-white rounded-lg flex items-center justify-center gap-2 text-xs transition-all font-bold cursor-pointer"
            >
              {isSending ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Dispatching packets...</span>
                </>
              ) : (
                <>
                  <Send size={14} />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
