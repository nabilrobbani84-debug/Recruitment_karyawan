import { Users, Tag } from 'lucide-react';
import { type ICommunityAuthor, type ICommunityTag } from '@/services/communityService';
// Impor Link dan Image karena digunakan di dalam komponen ini
import Link from 'next/link'; 
import Image from 'next/image';

// Widget Anggota Teratas
const TopMembersWidget = ({ members }: { members: ICommunityAuthor[] }) => (
    <div className="p-5 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h3 className="flex items-center gap-2 font-bold text-gray-900 dark:text-white mb-4"><Users size={18}/> Anggota Teratas</h3>
        <ul className="space-y-3">
            {members.map(member => (
                <li key={member.id} className="flex items-center gap-3">
                    <Image src={member.avatarUrl} alt={member.name} width={32} height={32} className="rounded-full" />
                    <div>
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{member.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{member.title}</p>
                    </div>
                </li>
            ))}
        </ul>
    </div>
);

// Widget Tag Populer
const PopularTagsWidget = ({ tags }: { tags: ICommunityTag[] }) => (
    <div className="p-5 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg">
        <h3 className="flex items-center gap-2 font-bold text-gray-900 dark:text-white mb-4"><Tag size={18}/> Tag Populer</h3>
        <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
                <Link key={tag.id} href={`/community/tags/${tag.slug}`} className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                    # {tag.name}
                </Link>
            ))}
        </div>
    </div>
);

// Komponen Sidebar Utama
export const CommunitySidebar = ({ topMembers, popularTags }: { topMembers: ICommunityAuthor[]; popularTags: ICommunityTag[] }) => {
    return (
        <aside className="space-y-6 sticky top-24">
            <TopMembersWidget members={topMembers} />
            <PopularTagsWidget tags={popularTags} />
        </aside>
    );
};

