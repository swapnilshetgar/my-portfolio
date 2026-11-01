import { ThemeType } from '../store/useOSStore';

export interface ThemeConfig {
  id: ThemeType;
  name: string;
  themeClass: string;
  accentColor: string;
  accentText: string;
  terminalBg: string;
  primaryGlow: string;
  neofetchColor: string;
}

export const themes: ThemeConfig[] = [
  {
    id: 'ubuntu',
    name: 'Ubuntu (Orange & Aubergine)',
    themeClass: 'theme-ubuntu',
    accentColor: '#e95420',
    accentText: 'text-[#e95420]',
    terminalBg: 'bg-[#300a24]/90',
    primaryGlow: 'shadow-[0_0_15px_rgba(233,84,32,0.4)]',
    neofetchColor: '\u001b[1;31m', // Red/Orange-ish
  },
  {
    id: 'kali',
    name: 'Kali Linux (Electric Blue)',
    themeClass: 'theme-kali',
    accentColor: '#33ccff',
    accentText: 'text-[#33ccff]',
    terminalBg: 'bg-[#0f0f14]/95',
    primaryGlow: 'shadow-[0_0_15px_rgba(51,204,255,0.4)]',
    neofetchColor: '\u001b[1;36m', // Cyan
  },
  {
    id: 'dracula',
    name: 'Dracula (Neon Pink & Purple)',
    themeClass: 'theme-dracula',
    accentColor: '#ff79c6',
    accentText: 'text-[#ff79c6]',
    terminalBg: 'bg-[#282a36]/95',
    primaryGlow: 'shadow-[0_0_15px_rgba(255,121,198,0.4)]',
    neofetchColor: '\u001b[1;35m', // Magenta
  },
  {
    id: 'nord',
    name: 'Nord (Frost Ice Blue)',
    themeClass: 'theme-nord',
    accentColor: '#88c0d0',
    accentText: 'text-[#88c0d0]',
    terminalBg: 'bg-[#2e3440]/95',
    primaryGlow: 'shadow-[0_0_15px_rgba(136,192,208,0.4)]',
    neofetchColor: '\u001b[1;34m', // Blue
  },
  {
    id: 'gruvbox',
    name: 'Gruvbox (Warm Retro Yellow)',
    themeClass: 'theme-gruvbox',
    accentColor: '#fabd2f',
    accentText: 'text-[#fabd2f]',
    terminalBg: 'bg-[#282828]/95',
    primaryGlow: 'shadow-[0_0_15px_rgba(250,189,47,0.4)]',
    neofetchColor: '\u001b[1;33m', // Yellow
  },
  {
    id: 'catppuccin',
    name: 'Catppuccin (Lavender & Pink)',
    themeClass: 'theme-catppuccin',
    accentColor: '#cba6f7',
    accentText: 'text-[#cba6f7]',
    terminalBg: 'bg-[#1e1e2e]/95',
    primaryGlow: 'shadow-[0_0_15px_rgba(203,166,247,0.4)]',
    neofetchColor: '\u001b[1;34m', // Blue
  },
  {
    id: 'hacker',
    name: 'Hacker (Green Terminal Matrix)',
    themeClass: 'theme-hacker',
    accentColor: '#00ff00',
    accentText: 'text-[#00ff00]',
    terminalBg: 'bg-black/95',
    primaryGlow: 'shadow-[0_0_15px_rgba(0,255,0,0.5)]',
    neofetchColor: '\u001b[1;32m', // Green
  },
  {
    id: 'light',
    name: 'Accessible Light Mode',
    themeClass: 'theme-light',
    accentColor: '#2563eb',
    accentText: 'text-[#2563eb]',
    terminalBg: 'bg-white/95',
    primaryGlow: 'shadow-[0_0_10px_rgba(37,99,235,0.2)]',
    neofetchColor: '\u001b[1;30m', // Dark Gray
  },
];
