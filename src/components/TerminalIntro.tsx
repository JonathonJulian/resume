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
  { type: 'command', content: '❯ helm install jonathon-resume ./resume-chart' },
  { type: 'output', content: 'NAME: jonathon-resume' },
  { type: 'output', content: 'LAST DEPLOYED: Tue Mar 04 14:35:21 2025' },
  { type: 'output', content: 'NAMESPACE: default' },
  { type: 'output', content: 'STATUS: deployed' },
  { type: 'output', content: 'REVISION: 1' },
  { type: 'empty', content: '' },
  { type: 'command', content: '❯ kubectl get pod -l app=jonathon-resume' },
  { type: 'output', content: 'NAME                                 READY   STATUS    RESTARTS   AGE' },
  { type: 'output', content: 'jonathon-fritz-resume-6f7d9c7b8d-x2zs1   1/1     Running   0          42s' },
  { type: 'empty', content: '' },
  { type: 'command', content: '❯ kubectl port-forward jonathon-fritz-resume-6f7d9c7b8d-x2zs1 8080:80' },
  { type: 'output', content: 'Forwarding from 127.0.0.1:8080 -> 80' },
  { type: 'empty', content: '' },
  { type: 'command', content: '❯ open http://localhost:8080' }
];

const TerminalIntro: React.FC<TerminalIntroProps> = ({ onComplete }) => {
  // Terminal state
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [typewriterText, setTypewriterText] = useState("");
  const [typewriterComplete, setTypewriterComplete] = useState(true);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Refs
  const terminalRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<{timeouts: ReturnType<typeof setTimeout>[]}>(
    {timeouts: []}
  );

  // Clean up function
  const clearTimeouts = () => {
    animationRef.current.timeouts.forEach(clearTimeout);
    animationRef.current.timeouts = [];
  };

  // Add timeout with tracking for cleanup
  const addTimeout = (callback: () => void, delay: number) => {
    const id = setTimeout(callback, delay);
    animationRef.current.timeouts.push(id);
    return id;
  };

  // Initialize with AWS line on mount, only once
  useEffect(() => {
    // Start with the AWS line - it's always visible and never animated
    setVisibleLines([TERMINAL_CONTENT[0].content]);
    setCurrentLineIndex(1); // Start processing from line 1

    // Start cursor blinking
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(cursorInterval);
      clearTimeouts();
    };
  }, []);

  // Effect for scrolling whenever content changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [visibleLines, typewriterText]);

  // Main animation effect
  useEffect(() => {
    // Skip if we've processed all lines
    if (currentLineIndex >= TERMINAL_CONTENT.length) {
      addTimeout(() => {
        onComplete();
      }, 2000);
      return;
    }

    // Only start a new line animation if the previous one is complete
    if (!typewriterComplete) return;

    const currentLine = TERMINAL_CONTENT[currentLineIndex];

    // Process the current line based on its type
    if (currentLine.type === 'command') {
      // For commands, animate typing character by character
      setTypewriterComplete(false);
      setTypewriterText('');

      let charIndex = 0;
      const typingSpeed = 40; // milliseconds per character
      const content = currentLine.content;

      const typeNextChar = () => {
        if (charIndex <= content.length) {
          setTypewriterText(content.substring(0, charIndex));
          charIndex++;

          if (charIndex <= content.length) {
            addTimeout(typeNextChar, typingSpeed);
          } else {
            // Command typing finished, add to visible lines after a small pause
            addTimeout(() => {
              setVisibleLines(prev => [...prev, content]);
              setTypewriterText('');
              setTypewriterComplete(true);
              setCurrentLineIndex(prev => prev + 1);
            }, 200);
          }
        }
      };

      // Start typing after a delay
      addTimeout(typeNextChar, 300);
    }
    else if (currentLine.type === 'output') {
      // For output, add all at once
      setVisibleLines(prev => [...prev, currentLine.content]);
      setCurrentLineIndex(prev => prev + 1);
    }
    else if (currentLine.type === 'empty') {
      // For empty lines, just add and continue
      setVisibleLines(prev => [...prev, '']);
      setCurrentLineIndex(prev => prev + 1);
    }
  }, [currentLineIndex, typewriterComplete, onComplete]);

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
          {/* Display all completed lines */}
          {visibleLines.map((line, i) => (
            <div
              key={`line-${i}`}
              className={`text-gray-300 ${line === '' ? 'mb-2' : 'mb-0'}`}
            >
              {line}
            </div>
          ))}

          {/* Display the line currently being typed */}
          {typewriterText && (
            <div className="text-gray-300">
              {typewriterText}
              {showCursor && <span className="inline-block w-2 h-4 bg-gray-500 ml-0.5"></span>}
            </div>
          )}

          {/* Show cursor at the end when nothing is being typed and animation is complete */}
          {!typewriterText && currentLineIndex >= TERMINAL_CONTENT.length && showCursor && (
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