import React, { useState, useEffect, useRef } from 'react';

interface TerminalIntroProps {
  onComplete: () => void;
}

// Terminal content with types for better control
type LineType = 'aws' | 'command' | 'output' | 'empty';

interface TerminalLine {
  type: LineType;
  content: string;
}

// The terminal content with explicit types
const TERMINAL_CONTENT: TerminalLine[] = [
  { type: 'aws', content: 'on arn:aws:eks:us-east-1:123456789012:cluster/prod ~ on main [!+?] is 📦 v1.0.0' },
  { type: 'command', content: '❯ helm repo add jfritz https://jonathonfritz.github.io/resume/' },
  { type: 'output', content: '"jfritz" has been added to your repositories' },
  { type: 'empty', content: '' },
  { type: 'command', content: '❯ helm install resume jfritz/resume' },
  { type: 'output', content: 'NAME: resume' },
  { type: 'output', content: 'LAST DEPLOYED: Tue Mar 04 14:35:21 2025' },
  { type: 'output', content: 'NAMESPACE: default' },
  { type: 'output', content: 'STATUS: deployed' },
  { type: 'output', content: 'REVISION: 1' },
  { type: 'empty', content: '' },
  { type: 'command', content: '❯ kubectl get pod -l app=resume' },
  { type: 'output', content: 'NAME                      READY     STATUS    RESTARTS   AGE' },
  { type: 'output', content: 'resume-6f7d9c7b8d-x2zs1   1/1       Running   0          42s' },
  { type: 'empty', content: '' },
  { type: 'command', content: '❯ kubectl port-forward resume-6f7d9c7b8d-x2zs1 8080:80' },
  { type: 'output', content: 'Forwarding from 127.0.0.1:8080 -> 80' },
  { type: 'empty', content: '' },
  { type: 'command', content: '❯ open http://localhost:8080' }
];

// Completely new animation approach
const TerminalIntro: React.FC<TerminalIntroProps> = ({ onComplete }) => {
  // Define all of our completed lines - this only includes fully rendered lines
  const [completedLines, setCompletedLines] = useState<string[]>([TERMINAL_CONTENT[0].content]);

  // Current line being animated
  const [currentLine, setCurrentLine] = useState<string>('');

  // Index in the content array
  const [contentIndex, setContentIndex] = useState(1);

  // Cursor state
  const [showCursor, setShowCursor] = useState(true);

  // Refs for cleanup
  const terminalRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Cleanup function
  const clearTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  // Add a timeout with tracking
  const addTimeout = (callback: () => void, delay: number) => {
    const id = setTimeout(callback, delay);
    timeoutsRef.current.push(id);
    return id;
  };

  // Scroll terminal when content changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [completedLines, currentLine]);

  // Setup cursor blinking
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(cursorInterval);
      clearTimeouts();
    };
  }, []);

  // Main animation effect
  useEffect(() => {
    if (contentIndex >= TERMINAL_CONTENT.length) {
      addTimeout(() => {
        onComplete();
      }, 2000);
      return;
    }

    const line = TERMINAL_CONTENT[contentIndex];

    if (line.type === 'command') {
      // Animate typing the command character by character
      setCurrentLine(''); // Start with empty
      let charIndex = 0;
      const content = line.content;
      const typingSpeed = 50;

      const typeNextChar = () => {
        if (charIndex <= content.length) {
          setCurrentLine(content.substring(0, charIndex));
          charIndex++;

          if (charIndex <= content.length) {
            addTimeout(typeNextChar, typingSpeed);
          } else {
            // Typing complete, move to next line
            addTimeout(() => {
              // Add the command to completed lines
              setCompletedLines(prev => [...prev, content]);
              // Clear current line
              setCurrentLine('');
              // Move to next content

              // Add a longer delay after helm install to simulate longer processing time
              if (content.includes('helm install')) {
                addTimeout(() => {
                  setContentIndex(prev => prev + 1);
                }, 3500); // 3.5 second delay for helm install
              } else {
                // Regular commands proceed normally
                setContentIndex(prev => prev + 1);
              }
            }, 400);
          }
        }
      };

      // Start typing after delay
      addTimeout(typeNextChar, 400);
    }
    else if (line.type === 'output') {
      // Add output line instantly
      setCompletedLines(prev => [...prev, line.content]);
      // Small delay before next line
      addTimeout(() => {
        setContentIndex(prev => prev + 1);
      }, 150);
    }
    else if (line.type === 'empty') {
      // Add empty line
      setCompletedLines(prev => [...prev, '']);
      // Small delay before next line
      addTimeout(() => {
        setContentIndex(prev => prev + 1);
      }, 100);
    }
  }, [contentIndex, onComplete]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="w-full max-w-[1050px] bg-black text-gray-400 rounded-md font-mono text-xs sm:text-sm md:text-base overflow-hidden animate-fadeIn shadow-xl border border-gray-700">
        <div className="terminal-header flex items-center justify-between p-2 sm:p-3 bg-gray-900 border-b border-gray-800">
          <div className="flex space-x-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-xs sm:text-sm text-gray-500">Terminal</div>
          <div className="w-2 h-2 sm:w-3 sm:h-3"></div>
        </div>

        <div
          ref={terminalRef}
          className="terminal-content h-[358px] sm:h-[448px] md:h-[448px] overflow-y-auto p-4 bg-gray-900 rounded terminal-scrollbar"
        >
          {/* Completed lines */}
          {completedLines.map((line, i) => (
            <div
              key={`line-${i}`}
              className={`text-gray-300 ${line === '' ? 'mb-2' : 'mb-0'}`}
            >
              {line}
            </div>
          ))}

          {/* Currently typing line */}
          {currentLine && (
            <div className="text-gray-300">
              {currentLine}
              {showCursor && <span className="inline-block w-2 h-4 bg-gray-500 ml-0.5"></span>}
            </div>
          )}

          {/* Final cursor */}
          {!currentLine && contentIndex >= TERMINAL_CONTENT.length && showCursor && (
            <div className="text-gray-300">
              <span className="inline-block w-2 h-4 bg-gray-500 ml-0.5"></span>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => {
          clearTimeouts();
          onComplete();
        }}
        className="fixed bottom-6 right-6 bg-gray-900 hover:bg-gray-800 text-gray-400 px-4 py-2 rounded-md transition-colors duration-200 border border-gray-700"
      >
        Skip Intro
      </button>
    </div>
  );
};

export default TerminalIntro;