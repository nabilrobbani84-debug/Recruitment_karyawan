'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ConversationList } from './ConversationList';
import { ChatWindow } from './ChatWindow';
import { useChatStore } from '@/store/useChatStore';
import { getConversations } from '@/services/chatService';
import PusherProvider from './PusherProvider';
import { Card } from '@/component/ui/card'; 
import { cn } from '@/lib/utils';

// ... sisa kode Anda (sudah benar)
interface User {
  id: string;
  name: string;
}

interface ChatLayoutProps {
  currentUser: User;
}

export function ChatLayout({ currentUser }: ChatLayoutProps) {
  const { setConversations, activeConversationId, setActiveConversationId } = useChatStore();
  const [isChatVisible, setIsChatVisible] = useState(false);

  const { data: conversations, isLoading } = useQuery({
    queryKey: ['conversations'],
    queryFn: getConversations,
  });

  useEffect(() => {
    if (conversations) {
      setConversations(conversations);
    }
  }, [conversations, setConversations]);
  
  const handleSelectConversation = (conversationId: string) => {
    setActiveConversationId(conversationId);
    setIsChatVisible(true);
  };

  const handleBack = () => {
    setActiveConversationId(null);
    setIsChatVisible(false);
  };

  return (
    <PusherProvider userId={currentUser.id}>
      <Card className="h-[calc(100vh-10rem)] w-full flex overflow-hidden">
        <aside
          className={cn(
            'w-full md:w-1/3 md:flex flex-col border-r transition-transform duration-300 ease-in-out',
            isChatVisible ? '-translate-x-full md:translate-x-0' : 'translate-x-0'
          )}
        >
          <ConversationList
            isLoading={isLoading}
            onSelectConversation={handleSelectConversation}
          />
        </aside>

        <main
          className={cn(
            'w-full md:w-2/3 flex flex-col absolute md:static top-0 left-0 h-full bg-white transition-transform duration-300 ease-in-out',
            isChatVisible ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
          )}
        >
          {activeConversationId ? (
            <ChatWindow onBack={handleBack} />
          ) : (
            <div className="hidden md:flex h-full items-center justify-center text-gray-500">
              <p>Pilih percakapan untuk memulai 💬</p>
            </div>
          )}
        </main>
      </Card>
    </PusherProvider>
  );
}