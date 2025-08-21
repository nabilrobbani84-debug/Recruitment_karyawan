import React from 'react';
import { PlusCircle, Search } from 'lucide-react';
import { getCommunityData } from '@/services/communityService';
// --- FIX: Path impor diseragamkan ---
import { ThreadCard } from '@/component/community/ThreadCard';
import { CommunitySidebar } from '@/component/community/CommunitySidebar';
import { Button } from '@/component/ui/Button'; // Menggunakan huruf kecil 'ui'

// Ini adalah Server Component.
export default async function CommunityPage() {
  const { threads, topMembers, popularTags } = await getCommunityData();

  return (
    <main className="bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Komunitas Recruiteasy</h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
            Tempat untuk berdiskusi, berbagi pengalaman, dan bertanya seputar dunia kerja dan karir.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
            <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Cari diskusi..."
                    className="w-full pl-11 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <Button className="w-full sm:w-auto">
                <PlusCircle className="mr-2 h-5 w-5" />
                Mulai Diskusi Baru
            </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <section className="lg:col-span-3 space-y-5">
            {threads.map(thread => (
              <ThreadCard key={thread.id} thread={thread} />
            ))}
          </section>

          <div className="lg:col-span-1">
             <CommunitySidebar topMembers={topMembers} popularTags={popularTags} />
          </div>
        </div>
      </div>
    </main>
  );
}