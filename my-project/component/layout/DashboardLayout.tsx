'use client';

import React, { useState, Fragment } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext'; // Asumsi hook ini ada untuk logout
import { LucideIcon, Menu, X, ChevronDown, LogOut } from 'lucide-react';
import { Transition } from '@headlessui/react'; // Untuk animasi yang smooth

// --- Definisi Tipe Data ---

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

// Tipe untuk data user, sesuaikan dengan struktur data Anda
interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'employer' | 'candidate' | 'admin';
  profileImageUrl?: string;
}

interface DashboardLayoutProps {
  navItems: NavItem[];
  user: UserData;
  children: React.ReactNode;
}

// --- Komponen Sidebar ---

const SidebarContent = ({ navItems }: { navItems: NavItem[] }) => {
  const pathname = usePathname();
  const { logout } = useAuth(); // Asumsi fungsi logout ada di context

  return (
    <div className="flex flex-grow flex-col overflow-y-auto bg-white pt-5">
      <div className="flex flex-shrink-0 items-center px-4">
        <Link href="/">
          <Image
            src="/images/logo.png" // Pastikan logo ada di public/images
            alt="RecruitEasy Logo"
            width={150}
            height={40}
            priority
          />
        </Link>
      </div>
      <div className="mt-8 flex flex-1 flex-col">
        <nav className="flex-1 space-y-1 px-2 pb-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`
                group flex items-center rounded-md px-2 py-2.5 text-sm font-medium transition-all duration-200
                ${
                  pathname.startsWith(item.href)
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }
              `}
            >
              <item.icon className="mr-3 h-6 w-6 flex-shrink-0" aria-hidden="true" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
         <button
            onClick={() => logout ? logout() : alert('Logout function not found')}
            className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-700 transition-colors"
        >
            <LogOut className="mr-3 h-6 w-6 text-gray-400 group-hover:text-red-600" />
            Keluar
        </button>
      </div>
    </div>
  );
};

// --- Komponen Utama DashboardLayout ---

export default function DashboardLayout({
  navItems,
  user,
  children,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="flex h-screen bg-gray-100/50">
      {/* Sidebar untuk Mobile (dengan transisi) */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <div className="relative z-40 md:hidden">
          {/* Overlay */}
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex w-full max-w-xs flex-1 flex-col">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Tutup sidebar</span>
                      <X className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <SidebarContent navItems={navItems} />
              </div>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true" />
          </div>
        </div>
      </Transition.Root>

      {/* Sidebar untuk Desktop */}
      <aside className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white">
          <SidebarContent navItems={navItems} />
        </div>
      </aside>

      {/* Konten Utama */}
      <div className="flex flex-1 flex-col md:pl-64">
        <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
          {/* Tombol Menu Mobile */}
          <button
            type="button"
            className="border-r border-gray-200 pr-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Buka sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
          
          {/* Header Kanan (Search & Profile) */}
          <div className="flex flex-1 items-center justify-end space-x-4">
            {/* Search Bar bisa ditambahkan di sini jika perlu */}

            {/* Profile Dropdown */}
            <div className="relative">
              <div>
                <button
                  type="button"
                  className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                >
                  <span className="sr-only">Buka menu pengguna</span>
                  <Image
                    className="h-8 w-8 rounded-full object-cover"
                    src={user.profileImageUrl || '/images/default-avatar.png'} // Sediakan avatar default
                    alt="User Avatar"
                    width={32}
                    height={32}
                  />
                  <span className="hidden lg:flex lg:items-center ml-3">
                    <span className="text-sm font-semibold text-gray-700">{user.name}</span>
                    <ChevronDown className="ml-1 h-5 w-5 text-gray-400" />
                  </span>
                </button>
              </div>
              <Transition
                as={Fragment}
                show={profileMenuOpen}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {/* Item Menu Profile */}
                  <button onClick={() => { router.push('/company-profile'); setProfileMenuOpen(false); }} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profil Saya
                  </button>
                  <button onClick={() => { router.push('/settings'); setProfileMenuOpen(false); }} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Pengaturan
                  </button>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button onClick={() => { logout ? logout() : alert('Logout!'); setProfileMenuOpen(false); }} className="w-full text-left block px-4 py-2 text-sm text-red-700 hover:bg-red-50">
                    Keluar
                  </button>
                </div>
              </Transition>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {/* Konten halaman akan dirender di sini */}
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
