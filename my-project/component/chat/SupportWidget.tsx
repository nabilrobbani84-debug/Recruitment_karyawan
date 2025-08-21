"use client";

import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { ChatWindow } from './ChatWindow';

export function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Jendela Chat yang akan muncul */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <ChatWindow onClose={toggleChat} />
      </div>

      {/* Tombol Chat Bubble */}
      <button
        onClick={toggleChat}
        className="mt-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-transform duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        aria-label={isOpen ? 'Tutup chat' : 'Buka chat'}
      >
        {isOpen ? <X size={30} /> : <MessageSquare size={30} />}
      </button>
    </div>
  );
}