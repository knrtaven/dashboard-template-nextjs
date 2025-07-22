'use client'
import { sequentialReplies } from '@/constants/chatReflection'
import React, { useEffect, useState } from 'react'
import { TypingIndicator } from './TypingIndicator';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
  }

export default function Chatbox() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [isTyping, setIsTyping] = useState<boolean>(false);

    // Initialize with first message
  useEffect(() => {
    setMessages([{
      id: 0,
      text: sequentialReplies[0],
      sender: 'bot',
    }]);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isComplete) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

     // Move to next step
     const nextStep: number = currentStep + 1;
     setCurrentStep(nextStep);

    // Show typing indicator after 1 second buffer
    setTimeout(() => {
      setIsTyping(true);
    }, 1000);

     // Add next bot response after delay
    setTimeout(() => {
      setIsTyping(false);
        if (nextStep < sequentialReplies.length) {
          const botReply: Message = {
            id: Date.now() + 1,
            text: sequentialReplies[nextStep],
            sender: 'bot',
          };
          setMessages(prev => [...prev, botReply]);
  
          // Check if this was the last message
          if (nextStep === sequentialReplies.length - 1) {
            setIsComplete(true);
          }
        }
      }, 1200);
  }

  const handleReset = (): void => {
    setMessages([{
      id: 0,
      text: sequentialReplies[0],
      sender: 'bot',

    }]);
    setCurrentStep(0);
    setIsComplete(false);
    setIsTyping(false);
    setInput('');
  };

  return (
    <div className='w-full  mx-auto h-[calc(100vh-14vh)] bg-gray-50 flex flex-col'>
        {/* Header */}

        <div className="bg-white border-b px-4 py-3 sm:px-6 sm:py-4 shadow-sm flex-shrink-0">
            <div className='flex justify-between'>
               <p> Self-Reflection Tool</p>   
               {isComplete && (
            <button
              onClick={handleReset}
              className="px-3 py-2 sm:px-4 sm:py-2 bg-brand-primary text-white text-xs sm:text-sm rounded-lg hover:bg-brand-primary-dark transition-colors self-start sm:self-auto"
            >
              Start New Session
            </button>
          )}
            </div>

           {/* Progress bar */}
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                <div 
                  className="bg-brand-primary h-1.5 sm:h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(Math.min(currentStep + 1, sequentialReplies.length) / sequentialReplies.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Messages */}

        <div className='flex-1 overflow-y-auto p-3 sm:py-6 sm:px-1 space-y-3 sm:space-y-2'>
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] sm:max-w-md px-3 py-2 sm:px-4 sm:py-3 rounded-2xl ${
              msg.sender === 'user' 
                ? 'bg-blue-500 text-white rounded-br-md' 
                : 'bg-white text-gray-800 shadow-sm border rounded-bl-md'
            }`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <span className={`text-xs block mt-1 sm:mt-2 ${
                msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
              }`}>
              </span>
            </div>
          </div>

        ))}

          {/* Typing Indicator */}
          {isTyping && <TypingIndicator />}
        </div>

         {/* Input */}

        <div className="bg-white border-t p-3 sm:p-4 flex-shrink-0 ">
        {!isComplete ? (
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <textarea
              value={input}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Share your thoughts..."
              rows={3}
              className="flex-1 px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary-dark focus:border-transparent resize-none text-sm"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="px-4 py-2 sm:px-6 sm:py-3 bg-brand-primary text-white text-sm rounded-xl hover:bg-brand-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors sm:self-end"
            >
              Send
            </button>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-600 mb-4 text-sm">Session completed! You can review your responses above.</p>
            <button
              onClick={()=>{}}
              className="px-4 py-2 sm:px-6 sm:py-3 bg-purple-600 text-white text-sm rounded-xl hover:bg-green-600 transition-colors"
            >
              Next Step
            </button>
          </div>
        )}
        
      </div>

    </div>
  )
}

