import React, { useState, useEffect, useRef } from 'react';

interface TerminalIntroProps {
  onComplete: () => void;
}

const TerminalIntro: React.FC<TerminalIntroProps> = ({ onComplete }) => {
  const [displayedContent, setDisplayedContent] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const completionTriggeredRef = useRef(false);

  // Command sequence to display with K8s-themed content
  const commands = [
    '❯ kubectl get nodes',
    'NAME                STATUS    ROLES   AGE    VERSION',
    'resume-master-01    Ready     master  2y     v1.26.0',
    'resume-worker-01    Ready     worker  2y     v1.26.0',
    'resume-worker-02    Ready     worker  2y     v1.26.0',
    '',
    '❯ kubectl get pods',
    'No resources found in default namespace.',
    '',
    '❯ kubectl create -f jonathon-resume.yaml',
    'deployment.apps/jonathon-fritz-resume created',
    '',
    '❯ kubectl describe pod jonathon-fritz-resume-6f7d9c7b8d-x2zs1',
    'Name:         jonathon-fritz-resume-6f7d9c7b8d-x2zs1',
    'Namespace:    default',
    'Status:       Running',
    'IP:           10.42.1.5',
    'Controlled By: ReplicaSet/jonathon-fritz-resume-6f7d9c7b8d',
    '',
    '❯ kubectl port-forward jonathon-fritz-resume-6f7d9c7b8d-x2zs1 8080:80',
    'Forwarding from 127.0.0.1:8080 -> 80',
    '',
    '❯ open http://localhost:8080'
  ];

  // Typing speed and pauses
  const typingSpeed = 20; // ms per character
  const commandPause = 600; // pause before starting new command
  const completionPause = 1200; // pause before showing the resume
  const promptTypingSpeed = 10; // slight delay for prompt lines
  const commandTypingSpeed = 40; // slower for command lines
  const finalCommandSpeed = 80; // even slower for final command

  // Initialization effect - start the animation after component mount
  useEffect(() => {
    // Small delay to ensure component is fully mounted
    const initialDelay = setTimeout(() => {
      setIsTyping(true);
      processCurrentLine();
    }, 300);

    return () => clearTimeout(initialDelay);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll the terminal content
  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [displayedContent]);

  // Process the current line based on its type
  const processCurrentLine = () => {
    if (currentLine >= commands.length) {
      // All commands displayed, trigger the completion callback after a pause
      if (!completionTriggeredRef.current) {
        completionTriggeredRef.current = true;
        console.log("Terminal animation complete, transitioning to resume...");

        // Add a visual pause after final command before transitioning
        setTimeout(() => {
          onComplete();
        }, completionPause);
      }
      return;
    }

    const currentCommand = commands[currentLine];
    const isPromptLine = currentCommand.startsWith('on arn:aws');
    const isCommandLine = currentCommand.startsWith('❯');
    const isFinalCommand = currentCommand.includes('open http://localhost');

    // Determine typing speed based on line type
    let currentTypingSpeed = typingSpeed;
    if (isPromptLine) {
      currentTypingSpeed = promptTypingSpeed;
    } else if (isCommandLine) {
      currentTypingSpeed = isFinalCommand ? finalCommandSpeed : commandTypingSpeed;
    }

    if (charIndex === 0) {
      // For command lines, show character by character
      if (isCommandLine && !isPromptLine) {
        setTimeout(() => {
          setDisplayedContent(prev => [...prev, currentCommand.slice(0, 1)]);
          setCharIndex(1);
          setIsTyping(false);
        }, commandPause);
      }
      else if (currentCommand === '') {
        // For empty lines, just add them
        setTimeout(() => {
          setDisplayedContent(prev => [...prev, '']);
          setCurrentLine(prevLine => prevLine + 1);
          setIsTyping(false);
        }, typingSpeed * 2);
      }
      else {
        // For prompt lines and output lines, display the entire line at once
        setTimeout(() => {
          setDisplayedContent(prev => [...prev, currentCommand]);
          setCurrentLine(prevLine => prevLine + 1);
          setIsTyping(false);
        }, isPromptLine ? promptTypingSpeed : typingSpeed * 3);
      }
    } else {
      // Continue typing the current line, character by character
      setTimeout(() => {
        if (charIndex < currentCommand.length) {
          setDisplayedContent(prev => {
            const newContent = [...prev];
            newContent[newContent.length - 1] = currentCommand.slice(0, charIndex + 1);
            return newContent;
          });
          setCharIndex(prevIndex => prevIndex + 1);
        } else {
          // Line finished, move to next line
          setCharIndex(0);
          setCurrentLine(prevLine => prevLine + 1);
        }
        setIsTyping(false);
      }, currentTypingSpeed);
    }
  };

  // Effect to process the next step when not typing
  useEffect(() => {
    if (!isTyping && currentLine < commands.length) {
      const timer = setTimeout(() => {
        setIsTyping(true);
        processCurrentLine();
      }, 10);

      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTyping, currentLine, charIndex]);

  // Ensure the completion callback is triggered if we reach the end
  useEffect(() => {
    if (currentLine >= commands.length && !completionTriggeredRef.current) {
      completionTriggeredRef.current = true;
      console.log("Terminal animation complete, transitioning to resume...");
      setTimeout(() => {
        onComplete();
      }, completionPause);
    }
  }, [currentLine, commands.length, onComplete]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="w-full max-w-4xl bg-black text-green-500 rounded-md font-mono text-xs sm:text-sm md:text-base overflow-hidden animate-fadeIn">
        <div className="terminal-header flex items-center justify-between p-2 sm:p-3 bg-gray-900 border-b border-gray-800">
          <div className="flex space-x-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-xs sm:text-sm text-gray-400">Terminal</div>
          <div className="w-2 h-2 sm:w-3 sm:h-3"></div> {/* Empty div for spacing */}
        </div>

        <div
          ref={terminalContentRef}
          className="terminal-content h-80 sm:h-96 md:h-[420px] overflow-y-auto p-4 bg-gray-900 rounded terminal-scrollbar"
        >
          {/* Display the prompt line only once at the top */}
          <div className="text-blue-400 mb-1">
            on arn:aws:eks:us-east-1:966761610288:cluster/prod ~ on main [!+?] is 📦 v1.0.0
          </div>

          {displayedContent.map((line, index) => (
            <div key={index} className={`${line.startsWith('on arn:aws') ? 'text-blue-400' : line.startsWith('❯') ? 'text-white' : 'text-green-400'} ${line === '' ? 'mb-2' : 'mb-0'}`}>
              {line}
              {index === displayedContent.length - 1 && charIndex === line.length && currentLine < commands.length && (
                <span className="inline-block w-2 h-4 bg-white animate-blink ml-0.5"></span>
              )}
            </div>
          ))}
          {/* Add final cursor after all content is displayed */}
          {currentLine >= commands.length && !completionTriggeredRef.current && (
            <div className="text-white">
              <span className="inline-block w-2 h-4 bg-white animate-blink ml-0.5"></span>
            </div>
          )}
        </div>
      </div>

      {/* Skip button that appears after a short delay */}
      {currentLine < commands.length - 3 && (
        <button
          onClick={onComplete}
          className="fixed bottom-6 right-6 bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded-md transition-colors duration-200 border border-gray-700"
        >
          Skip Intro
        </button>
      )}
    </div>
  );
};

export default TerminalIntro;