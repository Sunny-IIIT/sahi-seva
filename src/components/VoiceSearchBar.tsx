'use client';

import React, { useState, useEffect } from 'react';
import { Search, Mic, MicOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function VoiceSearchBar() {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Initialize Web Speech API (SpeechRecognition)
    // TypeScript workaround for browser implementations
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = false;
      // Capture both Hindi and English
      recog.lang = 'hi-IN'; 
      recog.interimResults = false;

      recog.onstart = () => {
        setIsListening(true);
      };

      recog.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        
        // Auto-submit after voice input is captured
        setTimeout(() => {
          handleSearch(transcript);
        }, 500);
      };

      recog.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recog.onend = () => {
        setIsListening(false);
      };

      setRecognition(recog);
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognition?.stop();
    } else {
      recognition?.start();
    }
  };

  const handleSearch = (searchQuery: string = query) => {
    if (!searchQuery.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex items-center bg-white rounded-full shadow-lg border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
        <div className="pl-6 text-gray-400">
          <Search size={20} />
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for a service... (e.g. Electrician, Plumber)"
          className="w-full py-4 px-4 text-gray-800 outline-none bg-transparent"
        />

        {recognition && (
          <button
            onClick={toggleListening}
            className={`p-4 transition-colors border-l border-gray-100 ${
              isListening ? 'bg-red-50' : 'hover:bg-gray-50'
            }`}
            title="Search by Voice (Hindi/English)"
          >
            {isListening ? (
              <div className="relative flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <Mic className="text-red-600 relative" size={24} />
              </div>
            ) : (
              <MicOff className="text-gray-400 hover:text-indigo-600 transition-colors" size={24} />
            )}
          </button>
        )}
      </div>
      
      {isListening && (
        <p className="absolute -bottom-8 left-0 w-full text-center text-sm font-medium text-red-500 animate-pulse">
          Listening... (Speak in Hindi or English)
        </p>
      )}
      
      {!recognition && (
        <p className="text-xs text-gray-400 text-center mt-2">
          * Voice search is not supported in this browser.
        </p>
      )}
    </div>
  );
}
