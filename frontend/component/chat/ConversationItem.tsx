'use client';

import { useChatStore, Conversation } from '@/store/useChatStore';
import { Avatar, AvatarFallback, AvatarImage } from '@/component/ui/avatar';
import { cn } from '@/lib/utils';

// 1. Definisikan props yang diterima
interface ConversationItemProps {
  conversation: Conversation;
  onSelect: () => void;
}

export function ConversationItem({ conversation, onSelect }: ConversationItemProps) {
  // Hanya perlu `activeConversationId` untuk mengecek status aktif
  const { activeConversationId } = useChatStore();
  const isActive = activeConversationId === conversation.id;

  return (
    <button
      onClick={onSelect} // <-- 2. Gunakan fungsi onSelect dari props
      className={cn(
        'w-full text-left p-3 rounded-lg flex items-center space-x-3 transition-colors',
        isActive 
          ? 'bg-gray-100 dark:bg-gray-800' 
          : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
      )}
    >
      <Avatar>
        <AvatarImage src={conversation.participant.avatarUrl} alt={conversation.participant.name} />
        <AvatarFallback>{conversation.participant.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 overflow-hidden">
        <p className="font-semibold truncate">{conversation.participant.name}</p>
        <p className="text-sm text-gray-500 truncate">{conversation.lastMessage?.content}</p>
      </div>
      {conversation.unreadCount > 0 && (
        <span className="bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {conversation.unreadCount}
        </span>
      )}
    </button>
  );
}