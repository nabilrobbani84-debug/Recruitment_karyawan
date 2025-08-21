// src/components/community/TopMembersWidget.tsx
import React from 'react';
import Image from 'next/image';
import { Users } from 'lucide-react';
import { ICommunityAuthor } from '@/lib/types';

const TopMembersWidget: React.FC<{ members: ICommunityAuthor[] }> = ({ members }) => (
    <div className="p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
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

export default TopMembersWidget;