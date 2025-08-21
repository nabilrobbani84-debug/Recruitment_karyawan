// ./component/chat/ChatWindow.tsx

'use client';
 
import React, { useEffect, useMemo, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useChatStore } from '@/store/useChatStore';
import { getMessagesForConversation } from '@/services/chatService';
import { MessageInput } from './MessageInput';

// Impor tipe yang sudah diekspor dari Message.tsx
import { Message, type MessageType } from './Message';

// --- FIX: Semua jalur impor diseragamkan menjadi '@components/' ---
import { ScrollArea } from '@/component/ui/scroll-area';
import { Separator } from '@/component/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/component/ui/avatar';
import { Button } from '@/component/ui/Button';
import { Loader2 } from 'lucide-react';

// Menggunakan MessageType sebagai satu-satunya sumber kebenaran.
interface IPaginatedMessagesResponse {
  data: MessageType[]; // Gunakan MessageType dari impor
  meta: {
    current_page: number;
    last_page: number;
  };
}

interface ChatWindowProps {
  onBack: () => void;
}

export function ChatWindow({ onBack }: ChatWindowProps) {
  const { activeConversationId, messages, setMessages, conversations } = useChatStore();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const activeConversation = conversations.find(c => c.id === activeConversationId);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<IPaginatedMessagesResponse, Error>({
    queryKey: ['messages', activeConversationId],
    queryFn: ({ pageParam }: { pageParam?: number }) => getMessagesForConversation(activeConversationId!, pageParam || 1),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.current_page < lastPage.meta.last_page) {
        return lastPage.meta.current_page + 1;
      }
      return undefined;
    },
    enabled: !!activeConversationId,
  });

  // Gunakan MessageType yang diimpor
  const allMessages: MessageType[] = useMemo(() => {
    // Balik urutan data dari API sebelum digabungkan agar pesan lama di atas
    return data?.pages.flatMap(page => page.data).reverse() ?? [];
  }, [data]);

  useEffect(() => {
    setMessages(allMessages);
  }, [allMessages, setMessages]);

  useEffect(() => {
    // Scroll ke bawah saat pesan baru ditambahkan
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);
  
  if (!activeConversation) {
    return (
        <div className="flex h-full items-center justify-center text-gray-500">
            <p>Pilih percakapan untuk memulai.</p>
        </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center space-x-3">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onBack}>
          &lt;
        </Button>
        <Avatar>
          <AvatarImage src={activeConversation.participant.avatarUrl} />
          <AvatarFallback>{activeConversation.participant.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-bold">{activeConversation.participant.name}</p>
          <p className="text-sm text-green-500">Online</p>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {hasNextPage && (
            <div className="text-center">
              <Button onClick={() => fetchNextPage()} variant="link" disabled={isFetchingNextPage}>
                {isFetchingNextPage ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Muat pesan sebelumnya'}
              </Button>
            </div>
          )}
          {isLoading && <p className="text-center text-gray-500">Memuat pesan...</p>}
          {allMessages.map((msg) => (
            <Message key={msg.id} message={msg} />
          ))}
        </div>
      </ScrollArea>
      <Separator />
      <div className="p-4 bg-white dark:bg-gray-900">
        <MessageInput />
      </div>
    </div>
  );
}
