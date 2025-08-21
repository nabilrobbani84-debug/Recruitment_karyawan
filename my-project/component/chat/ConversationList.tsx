'use client';

import { useChatStore } from '@/store/useChatStore';
import { ConversationItem } from './ConversationItem';
import { ScrollArea } from '@/component/ui/scroll-area'; // <-- PERBAIKAN PATH

// 1. Definisikan props yang diterima
interface ConversationListProps {
  isLoading: boolean;
  onSelectConversation: (conversationId: string) => void;
}

export function ConversationList({ isLoading, onSelectConversation }: ConversationListProps) {
  const { conversations } = useChatStore();

  if (isLoading) {
    // TODO: Ganti dengan UI Skeleton yang lebih baik
    return <div className="p-4">Loading...</div>;
  }
  
  if (conversations.length === 0) {
    return <div className="p-4 text-center text-gray-500">Tidak ada pesan.</div>
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Pesan</h2>
        <div className="space-y-2">
          {conversations.map((convo) => (
            // 2. Teruskan fungsi onSelect ke setiap item
            <ConversationItem 
              key={convo.id} 
              conversation={convo}
              onSelect={() => onSelectConversation(convo.id)}
            />
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}