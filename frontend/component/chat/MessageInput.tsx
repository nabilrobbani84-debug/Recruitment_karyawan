'use client';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useChatStore } from '@/store/useChatStore';
import { sendMessage } from '@/services/chatService';
import { Input } from '@/component/ui/input';   
import { Button } from '../ui/Button';   
import { Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function MessageInput() {
  const [content, setContent] = useState('');
  const { activeConversationId } = useChatStore();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (messageContent: string) => {
      if (!activeConversationId) {
        throw new Error('Tidak ada percakapan aktif.');
      }
      return sendMessage(activeConversationId, { content: messageContent });
    },
    onSuccess: () => {
      setContent('');
      queryClient.invalidateQueries({ queryKey: ['messages', activeConversationId] });
    },
    onError: (error) => {
      toast.error(`Gagal mengirim pesan: ${error.message}`);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || mutation.isPending) return;
    mutation.mutate(content);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Ketik pesan..."
        autoComplete="off"
        disabled={!activeConversationId || mutation.isPending}
      />
      <Button
        type="submit"
        // size="icon"
        disabled={!activeConversationId || !content.trim() || mutation.isPending}
      >
        {mutation.isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
}