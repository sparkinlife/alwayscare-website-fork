import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, AlertTriangle, RotateCcw } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

interface ExtendedChatMessage extends ChatMessage {
  isError?: boolean;
}

const GeminiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ExtendedChatMessage[]>([
    { role: 'model', text: 'Hi! I am Arham AI. If you see an injured animal, describe the situation and I will give you immediate first aid advice while you call our ambulance.', timestamp: Date.now() }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Focus input when chat opens
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, isOpen]);

  const handleSend = async (messageToSend?: string) => {
    const textToSend = messageToSend || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ExtendedChatMessage = { role: 'user', text: textToSend, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setLastFailedMessage(null);

    try {
      const responseText = await sendMessageToGemini(textToSend);

      if (!responseText || responseText.includes('error') || responseText.includes('Error')) {
        throw new Error('Invalid response');
      }

      const botMsg: ExtendedChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      setLastFailedMessage(textToSend);
      const errorMsg: ExtendedChatMessage = {
        role: 'model',
        text: 'Sorry, I encountered an error. Please try again or call our helpline directly.',
        timestamp: Date.now(),
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastFailedMessage) {
      // Remove the error message
      setMessages(prev => prev.slice(0, -1));
      handleSend(lastFailedMessage);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isOpen
            ? 'bg-slate-800 rotate-90 focus:ring-slate-500'
            : 'bg-red-600 hover:bg-red-700 hover:scale-110 focus:ring-red-500'
        }`}
        aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
        aria-expanded={isOpen}
        aria-controls="chat-dialog"
      >
        {isOpen ? <X className="text-white" size={24} /> : <MessageSquare className="text-white" size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          id="chat-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="chat-title"
          className="fixed bottom-24 right-6 w-[90vw] md:w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col border border-slate-200 overflow-hidden animate-fade-in-up"
        >
          {/* Header */}
          <div className="bg-slate-900 p-4 flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-full">
              <Bot className="text-red-400" size={20} />
            </div>
            <div>
              <h3 id="chat-title" className="text-white font-bold">Arham Assistant</h3>
              <p className="text-slate-400 text-xs">Powered by Gemini AI</p>
            </div>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50"
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user'
                      ? 'bg-red-600 text-white rounded-br-none'
                      : msg.isError
                      ? 'bg-red-50 border border-red-200 text-red-700 rounded-bl-none'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.isError && (
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle size={16} />
                      <span className="font-medium">Connection Error</span>
                    </div>
                  )}
                  {msg.text.split('\n').map((line, i) => (
                    <p key={i} className={line.trim().startsWith('-') || line.trim().startsWith('*') ? 'ml-2' : ''}>
                      {line}
                    </p>
                  ))}
                  {msg.isError && lastFailedMessage && (
                    <button
                      onClick={handleRetry}
                      className="mt-2 flex items-center gap-1 text-xs font-medium text-red-600 hover:text-red-800 transition-colors"
                    >
                      <RotateCcw size={14} />
                      Try again
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-bl-none shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <label htmlFor="chat-input" className="sr-only">Type your message</label>
            <input
              ref={inputRef}
              id="chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about first aid..."
              className="flex-1 bg-slate-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GeminiAssistant;
