import React, { useState, useEffect, useRef, useCallback } from 'react';

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

  // Performance optimization for mobile
  const isMobile = useRef(window.innerWidth < 768);

  // Calculate typing speed based on device
  const getTypingSpeed = useCallback(() => {
    return isMobile.current ? 70 : 50; // Slower on mobile
  }, []);

  // Calculate delay between lines based on device
  const getLineDelay = useCallback(() => {
    return isMobile.current ? 250 : 150; // Longer delay on mobile
  }, []);

  // Cleanup function
  const clearTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  // Add a timeout with tracking
  const addTimeout = (callback: () => void, delay: number) => {
    const id = setTimeout(() => {
      // Wrap callback in requestAnimationFrame for smoother rendering
      if (typeof window !== 'undefined') {
        window.requestAnimationFrame(callback);
      } else {
        callback();
      }
    }, delay);
    timeoutsRef.current.push(id);
    return id;
  };

  // Scroll terminal when content changes
  useEffect(() => {
    if (terminalRef.current) {
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      });
    }
  }, [completedLines, currentLine]);

  // Blink cursor
  useEffect(() => {
    const id = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(id);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return clearTimeouts;
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      isMobile.current = window.innerWidth < 768;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Main animation logic
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
      const typingSpeed = getTypingSpeed();

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
                }, isMobile.current ? 2500 : 3500); // Shorter delay on mobile
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
      // Add output line all at once (no animation needed)
      addTimeout(() => {
        setCompletedLines(prev => [...prev, line.content]);
        // Small delay before next line
        addTimeout(() => {
          setContentIndex(prev => prev + 1);
        }, getLineDelay());
      }, 16); // Use requestAnimationFrame timing (roughly 16ms)
    }
    else if (line.type === 'empty') {
      // Add empty line
      addTimeout(() => {
        setCompletedLines(prev => [...prev, '']);
        // Small delay before next line
        addTimeout(() => {
          setContentIndex(prev => prev + 1);
        }, getLineDelay() / 2); // Even shorter delay for empty lines
      }, 16);
    }
  }, [contentIndex, onComplete, getTypingSpeed, getLineDelay]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 p-2 sm:p-4 overscroll-none">
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
          className="terminal-content h-[300px] sm:h-[358px] md:h-[448px] overflow-y-auto p-4 bg-gray-900 rounded terminal-scrollbar overscroll-none will-change-transform"
          style={{
            WebkitOverflowScrolling: 'touch',
            transform: 'translateZ(0)'
          }}
        >
          {/* Completed lines */}
          {completedLines.map((line, i) => (
            <div
              key={`line-${i}`}
              className={`text-gray-300 ${line === '' ? 'mb-2' : 'mb-0'} will-change-transform`}
            >
              {line}
            </div>
          ))}

          {/* Currently typing line */}
          {currentLine && (
            <div className="text-gray-300 will-change-transform">
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
        className="fixed bottom-6 right-6 bg-gray-900 hover:bg-gray-800 text-gray-400 px-4 py-2 rounded-md transition-colors duration-200 border border-gray-700 touch-manipulation"
      >
        Skip Intro
      </button>
    </div>
  );
};

export default TerminalIntro;