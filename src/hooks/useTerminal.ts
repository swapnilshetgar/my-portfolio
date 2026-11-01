import { useState, useRef, KeyboardEvent } from 'react';
import { useOSStore } from '../store/useOSStore';
import { executeCommand, getAutocompleteSuggestion } from '../lib/commands';

export interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'header';
  dir: string;
}

export const useTerminal = (
  initialLines: TerminalLine[],
  onActionTrigger: (action: any) => void
) => {
  const [input, setInput] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [lines, setLines] = useState<TerminalLine[]>(initialLines);
  
  const currentDir = useOSStore((state) => state.currentDir);
  const setCurrentDir = useOSStore((state) => state.setCurrentDir);
  const addTerminalHistory = useOSStore((state) => state.addTerminalHistory);
  const terminalHistory = useOSStore((state) => state.terminalHistory);
  const theme = useOSStore((state) => state.theme);
  const setTheme = useOSStore((state) => state.setTheme);

  const handleInputChange = (val: string) => {
    setInput(val);
    const sugg = getAutocompleteSuggestion(val, currentDir);
    setSuggestion(sugg);
  };

  const executeInput = (commandLine: string) => {
    const trimmed = commandLine.trim();
    if (!trimmed) {
      setLines(prev => [...prev, { text: '', type: 'input', dir: currentDir }]);
      return;
    }

    // Add command to output log
    setLines(prev => [...prev, { text: trimmed, type: 'input', dir: currentDir }]);
    addTerminalHistory(trimmed);
    setHistoryIndex(-1);

    // Execute command
    const res = executeCommand(trimmed, currentDir, setCurrentDir, theme, setTheme);
    
    if (res.output) {
      setLines(prev => [...prev, { text: res.output, type: 'output', dir: currentDir }]);
    }
    
    if (res.action) {
      onActionTrigger(res.action);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // 1. Tab Autocomplete
    if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestion) {
        setInput(prev => prev + suggestion);
        setSuggestion('');
      }
    }
    
    // 2. Command History Up
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (terminalHistory.length === 0) return;
      
      const nextIndex = historyIndex + 1;
      if (nextIndex < terminalHistory.length) {
        setHistoryIndex(nextIndex);
        const histCmd = terminalHistory[terminalHistory.length - 1 - nextIndex];
        setInput(histCmd);
        setSuggestion('');
      }
    }

    // 3. Command History Down
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = historyIndex - 1;
      if (nextIndex >= 0) {
        setHistoryIndex(nextIndex);
        const histCmd = terminalHistory[terminalHistory.length - 1 - nextIndex];
        setInput(histCmd);
        setSuggestion('');
      } else {
        setHistoryIndex(-1);
        setInput('');
        setSuggestion('');
      }
    }

    // 4. Submit Command (Enter)
    if (e.key === 'Enter') {
      e.preventDefault();
      executeInput(input);
      setInput('');
      setSuggestion('');
    }
  };

  const clearLogs = () => {
    setLines([]);
  };

  return {
    input,
    suggestion,
    lines,
    handleInputChange,
    handleKeyDown,
    clearLogs,
    setLines,
    executeInput
  };
};
