'use client';

import { useEffect } from 'react';
import Pusher from 'pusher-js';
import { useChatStore, Message } from '@/store/useChatStore';

interface PusherProviderProps {
  userId: string;
  children: React.ReactNode;
}

export default function PusherProvider({ userId, children }: PusherProviderProps) {
  const { addMessage } = useChatStore();

  useEffect(() => {
    if (!userId) return;

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      // Backend Anda harus menyediakan endpoint ini untuk otorisasi channel privat
      authEndpoint: '/api/pusher/auth', 
      auth: {
          headers: {
              // Jika pakai token, sertakan di sini
              // Authorization: `Bearer ${token}`
          }
      }
    });

    // Subscribe ke channel privat user ini. 
    // Format channel: 'private-user-<id>'
    const channel = pusher.subscribe(`private-user-${userId}`);

    // Bind ke event 'new-message' yang di-trigger oleh backend
    channel.bind('new-message', (data: Message) => {
      // Tambahkan pesan yang baru masuk ke state Zustand
      addMessage(data);
    });

    return () => {
      pusher.unsubscribe(`private-user-${userId}`);
      pusher.disconnect();
    };
  }, [userId, addMessage]);

  return <>{children}</>;
}