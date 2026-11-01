'use client';

import React, { useState } from 'react';
import { useOSStore } from '../../store/useOSStore';
import { resolvePath, getNodeByPath, FSDirectory, FSNode } from '../../lib/filesystem';
import { ArrowLeft, Folder, File, FileText, Download } from 'lucide-react';

export const FileExplorerWindow: React.FC = () => {
  const currentDir = useOSStore((state) => state.currentDir);
  const setCurrentDir = useOSStore((state) => state.setCurrentDir);
  
  const [selectedFile, setSelectedFile] = useState<FSNode | null>(null);

  const node = getNodeByPath(currentDir);

  const handleNavigate = (name: string) => {
    const newPath = resolvePath(currentDir, name);
    const targetNode = getNodeByPath(newPath);
    if (targetNode && targetNode.type === 'dir') {
      setCurrentDir(newPath);
      setSelectedFile(null);
    }
  };

  const handleBack = () => {
    if (currentDir === '/' || currentDir === '/home/visitor') return;
    const parts = currentDir.split('/').filter(p => p !== '');
    parts.pop();
    setCurrentDir('/' + parts.join('/'));
    setSelectedFile(null);
  };

  const handleDownloadFile = (fileNode: FSNode) => {
    if (fileNode.type !== 'file') return;
    const blob = new Blob([fileNode.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileNode.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!node || node.type !== 'dir') {
    return <div className="p-4 text-xs text-red-500">Error: Invalid virtual directory state</div>;
  }

  const childrenKeys = Object.keys(node.children);

  return (
    <div className="w-full h-full flex flex-col overflow-hidden select-none font-sans bg-zinc-950/20">
      
      {/* Path Address Bar */}
      <div className="h-11 px-3 border-b border-white/10 bg-black/40 flex items-center gap-3 flex-shrink-0">
        <button 
          onClick={handleBack}
          disabled={currentDir === '/' || currentDir === '/home/visitor'}
          className="p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
        >
          <ArrowLeft size={16} />
        </button>
        <span className="text-zinc-600 font-mono">|</span>
        <div className="flex-1 bg-zinc-950/60 border border-white/5 rounded px-2.5 py-1 text-xs font-mono text-zinc-300 select-all truncate">
          {currentDir}
        </div>
      </div>

      {/* Explorer Split Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Main Grid View */}
        <div className="flex-1 p-4 overflow-y-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3.5 items-start content-start">
          {childrenKeys.map((key) => {
            const childNode = node.children[key];
            const isDir = childNode.type === 'dir';
            const isSelected = selectedFile?.name === childNode.name;
            
            return (
              <div 
                key={key}
                onClick={() => setSelectedFile(childNode)}
                onDoubleClick={() => isDir && handleNavigate(key)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border cursor-pointer transition-all hover:bg-white/5 text-center ${isSelected ? 'bg-accent/15 border-accent text-white' : 'bg-transparent border-transparent text-zinc-300'}`}
              >
                <div className="w-10 h-10 flex items-center justify-center filter drop-shadow-md">
                  {isDir ? (
                    <Folder size={32} className="text-[#fabd2f]" />
                  ) : childNode.name.endsWith('.md') ? (
                    <FileText size={32} className="text-[#33ccff]" />
                  ) : (
                    <File size={32} className="text-zinc-400" />
                  )}
                </div>
                <span className="text-[10px] md:text-[11px] mt-1.5 line-clamp-2 leading-tight break-all font-mono">
                  {key}
                </span>
              </div>
            );
          })}

          {childrenKeys.length === 0 && (
            <div className="col-span-full text-center text-xs text-zinc-500 mt-8">
              Directory is empty
            </div>
          )}
        </div>

        {/* Sidebar Preview Drawer */}
        {selectedFile && (
          <div className="w-80 border-l border-white/10 bg-black/40 p-4 overflow-y-auto flex flex-col justify-between flex-shrink-0 animate-fade-in">
            <div className="space-y-4">
              <div className="flex items-start gap-2.5">
                <div className="p-2 bg-white/5 rounded-lg border border-white/5 text-zinc-400">
                  {selectedFile.type === 'dir' ? <Folder size={18} /> : <FileText size={18} />}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white truncate break-all">{selectedFile.name}</h4>
                  <p className="text-[10px] text-zinc-500 font-mono uppercase mt-0.5">{selectedFile.type} node</p>
                </div>
              </div>
              
              <hr className="border-white/5" />

              {/* Preview Box */}
              <div>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-1.5">Quick Preview</span>
                {selectedFile.type === 'dir' ? (
                  <div className="text-[11px] text-zinc-400 font-sans italic bg-zinc-950/40 p-3 rounded-lg border border-white/5">
                    Double-click directory to enter. Contains {Object.keys(selectedFile.children).length} elements.
                  </div>
                ) : (
                  <pre className="text-[10px] text-zinc-300 font-mono leading-relaxed bg-zinc-950/50 p-3 rounded-lg border border-white/5 whitespace-pre-wrap max-h-60 overflow-y-auto scrollbar-thin">
                    {selectedFile.content}
                  </pre>
                )}
              </div>
            </div>

            {/* Folder Actions */}
            {selectedFile.type === 'dir' ? (
              <button 
                onClick={() => handleNavigate(selectedFile.name)}
                className="w-full h-8 bg-accent hover:bg-accent-hover text-white rounded text-xs transition-all cursor-pointer font-bold mt-4"
              >
                Enter Directory
              </button>
            ) : (
              <button 
                onClick={() => handleDownloadFile(selectedFile)}
                className="w-full h-8 bg-zinc-900 border border-white/10 hover:bg-zinc-850 rounded text-xs text-zinc-300 hover:text-white transition-all flex items-center justify-center gap-1.5 mt-4 font-bold cursor-pointer"
              >
                <Download size={13} />
                <span>Save to Local</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
