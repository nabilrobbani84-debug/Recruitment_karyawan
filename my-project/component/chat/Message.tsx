// ./component/chat/Message.tsx

'use client';

import { useAuth } from '@/contexts/AuthContext';
import { type Message as MessageType } from '@/store/useChatStore'; // Gunakan 'import type'
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/component/ui/avatar'; // FIX: Gunakan 'components'

// FIX: Ekspor tipe MessageType agar bisa diimpor oleh komponen lain
export type { MessageType };

interface MessageProps {
  message: MessageType;
}

export function Message({ message }: MessageProps) {
  const { user: currentUser } = useAuth();

  // Pastikan properti yang diakses ada di tipe MessageType dari store Anda
  // Contoh: senderId, sender.name, sender.avatarUrl
  const isSender = currentUser ? message.senderId === currentUser.id : false;
  const senderInitial = message.sender?.name.charAt(0) || 'U';
  const senderAvatar = message.sender?.avatarUrl;

  // ... sisa kode tidak berubah ...
  return (
    <div className={cn('flex items-end gap-3', isSender ? 'justify-end' : 'justify-start')}>
      {!isSender && (
        <Avatar className="h-8 w-8">
          <AvatarImage src={senderAvatar} />
          <AvatarFallback>{senderInitial}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-[70%] rounded-lg px-4 py-2',
          isSender
            ? 'rounded-br-none bg-blue-600 text-white'
            : 'rounded-bl-none bg-gray-100 dark:bg-gray-800'
        )}
      >
        <p className="text-sm">{message.content}</p>
        <p className={cn(
          "mt-1 text-right text-xs",
          isSender ? "text-blue-200" : "text-gray-500"
        )}>
          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}