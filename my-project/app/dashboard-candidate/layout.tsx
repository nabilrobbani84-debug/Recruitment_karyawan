'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// FIX 1: Menambahkan impor ikon yang dibutuhkan
import { User, Briefcase, Bookmark, Settings, LogOut } from 'lucide-react';

const SidebarNav = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/profile', icon: <User size={20} />, label: 'Profil Saya' },
    { href: '/applications', icon: <Briefcase size={20} />, label: 'Riwayat Lamaran' },
    { href: '/saved-jobs', icon: <Bookmark size={20} />, label: 'Pekerjaan Tersimpan' },
    { href: '/settings', icon: <Settings size={20} />, label: 'Pengaturan Akun' },
  ];

  // FIX 2: Logika isActive diperbaiki untuk menangani sub-rute
  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
      <div className="h-20 flex items-center px-6 border-b border-gray-200">
        <Link href="/" className="text-xl font-bold text-blue-600">
          RecruitEasy
        </Link>
      </div>
      <nav className="flex-grow px-4 py-6">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="px-4 py-6 border-t border-gray-200">
         <button className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50">
            <LogOut size={20} />
            <span>Keluar</span>
         </button>
      </div>
    </aside>
  );
};


export default function DashboardCandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <div className="hidden md:flex">
        <SidebarNav />
      </div>

      <main className="flex-1 overflow-y-auto">
        <header className="md:hidden sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200">
            <h1 className="text-lg font-bold text-blue-600">Dashboard</h1>
            <button className="p-2">
                {/* Menu Icon */}
            </button>
        </header>
        
        <div className="p-4 sm:p-6 lg:p-8">
            {children}
        </div>
      </main>
    </div>
  );
}