import Link from 'next/link';
import Image from 'next/image';
import { MessageSquare, Eye, ThumbsUp } from 'lucide-react';
import { type ICommunityThread } from '@/services/communityService';

// Fungsi helper untuk format waktu
const timeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return "Baru saja";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} menit lalu`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} jam lalu`;
    const days = Math.floor(hours / 24);
    return `${days} hari lalu`;
};

// Ini adalah Server Component, ia hanya menerima data dan menampilkannya.
export const ThreadCard = ({ thread }: { thread: ICommunityThread }) => {
    return (
        <div className="p-5 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg transition-all duration-300 hover:shadow-lg hover:border-blue-500 dark:hover:bg-gray-800">
            <div className="flex items-start gap-4">
                <Image src={thread.author.avatarUrl} alt={thread.author.name} width={40} height={40} className="rounded-full" />
                <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm">
                        <span className="font-bold text-gray-900 dark:text-white">{thread.author.name}</span>
                        <span className="text-gray-500 dark:text-gray-400">· diposting {timeAgo(thread.createdAt)}</span>
                    </div>
                    <Link href={`/community/thread/${thread.id}`} className="block mt-1">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">{thread.title}</h3>
                    </Link>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{thread.contentSnippet}</p>
                    <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                            {thread.tags.map(tag => (
                                <Link key={tag.id} href={`/community/tags/${tag.slug}`} className="px-2.5 py-1 text-xs font-medium text-blue-800 bg-blue-100 dark:bg-blue-900/50 dark:text-blue-200 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800">
                                    {tag.name}
                                </Link>
                            ))}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 shrink-0">
                            <span className="flex items-center gap-1.5" title="Balasan"><MessageSquare size={14} /> {thread.stats.replies}</span>
                            <span className="flex items-center gap-1.5" title="Dilihat"><Eye size={14} /> {thread.stats.views}</span>
                            <span className="flex items-center gap-1.5" title="Suka"><ThumbsUp size={14} /> {thread.stats.likes}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
