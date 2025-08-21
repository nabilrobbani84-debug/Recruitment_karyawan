import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// Definisikan tipe data sesuai dengan data dari API Anda
export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
  sender?: User;
}

export interface Conversation {
  id: string;
  participant: User;
  lastMessage: Message;
  unreadCount: number;
}

interface ChatState {
  conversations: Conversation[];
  activeConversationId: string | null;
  messages: Message[];
  setConversations: (conversations: Conversation[]) => void;
  setActiveConversationId: (id: string | null) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
}

export const useChatStore = create<ChatState>()(
  devtools((set) => ({
    conversations: [],
    activeConversationId: null,
    messages: [],
    setConversations: (conversations) => set({ conversations }),
    setActiveConversationId: (id) => set({ activeConversationId: id, messages: [] }), // Reset pesan saat ganti percakapan
    setMessages: (messages) => set({ messages }),
    addMessage: (message) =>
      set((state) => ({
        messages: [...state.messages, message],
      })),
  }))
);