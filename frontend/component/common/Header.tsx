// src/components/common/Header.tsx
"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore'; // 1. Impor store otentikasi

// 2. Menggunakan ikon dari lucide-react untuk tampilan yang lebih modern
import { 
  Globe, 
  MessageSquare, 
  Bell, 
  Menu, 
  X, 
  ChevronDown,
  User,
  LogOut,
  Settings
} from 'lucide-react';

// 3. Custom Hook untuk menutup dropdown saat klik di luar area
function useOnClickOutside(ref: React.RefObject<HTMLDivElement>, handler: () => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export default function Header() {
  const { user, isAuthenticated, logout } = useAuthStore(); // Mengambil state dan action dari store
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const router = useRouter();
  
  // Refs untuk setiap dropdown
  const languageRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Menggunakan custom hook
  useOnClickOutside(languageRef, () => activeDropdown === 'language' && setActiveDropdown(null));
  useOnClickOutside(notificationsRef, () => activeDropdown === 'notifications' && setActiveDropdown(null));
  useOnClickOutside(profileRef, () => activeDropdown === 'profile' && setActiveDropdown(null));

  const handleLogout = () => {
    logout();
    setActiveDropdown(null);
    router.push('/'); // Redirect ke halaman utama setelah logout
  };
  
  const mainNavLinks = [
    { href: '/jobs', label: 'Lowongan Kerja' },
    { href: '/companies', label: 'Perusahaan' },
    { href: '/blog', label: 'Blog' },
    { href: '/community', label: 'Komunitas' },
  ];

  return (
    <header className="bg-gray-900 text-gray-200 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white">
          Recruiteasy
        </Link>

        {/* Navigasi Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {mainNavLinks.map(link => (
            <Link key={link.href} href={link.href} className="text-sm font-medium hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Ikon dan Profil Pengguna (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Dropdown */}
          <div className="relative" ref={languageRef}>
            <button onClick={() => setActiveDropdown(activeDropdown === 'language' ? null : 'language')} className="flex items-center gap-1 hover:text-white p-2 rounded-full transition-colors">
              <Globe size={20} />
            </button>
            {activeDropdown === 'language' && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg border border-gray-700 p-2">
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-700 rounded">Bahasa</a>
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-700 rounded">English</a>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Link href="/chat" className="hover:text-white p-2 rounded-full transition-colors"><MessageSquare size={20} /></Link>
            <div className="relative" ref={notificationsRef}>
               <button onClick={() => setActiveDropdown(activeDropdown === 'notifications' ? null : 'notifications')} className="hover:text-white p-2 rounded-full transition-colors">
                 <Bell size={20} />
               </button>
               {activeDropdown === 'notifications' && (
                  <div className="absolute top-full right-0 mt-2 w-72 bg-gray-800 rounded-md shadow-lg border border-gray-700 p-3">
                    <p className="font-semibold px-2">Notifikasi</p>
                    {/* Isi Notifikasi */}
                  </div>
               )}
            </div>
          </div>
          
          <div className="h-6 w-px bg-gray-600" />

          {/* Kondisi Otentikasi */}
          {/* PERBAIKAN 1: Hapus tanda kurung () dari isAuthenticated */}
          {isAuthenticated && user ? (
            <div className="relative" ref={profileRef}>
              <button onClick={() => setActiveDropdown(activeDropdown === 'profile' ? null : 'profile')} className="flex items-center gap-2 hover:bg-gray-700 p-1.5 rounded-full transition-colors">
                <span className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold">{user.name.charAt(0)}</span>
                <span className="font-medium text-sm">{user.name}</span>
                <ChevronDown size={16} className={`transition-transform ${activeDropdown === 'profile' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'profile' && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg border border-gray-700 p-2">
                  <Link href="/profile" className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-700 rounded"><User size={16}/>Profil</Link>
                  <Link href="/settings" className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-700 rounded"><Settings size={16}/>Pengaturan</Link>
                  <div className="my-1 h-px bg-gray-700" />
                  <button onClick={handleLogout} className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:bg-red-500 hover:text-white rounded"><LogOut size={16}/>Keluar</button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors">
              Masuk
            </Link>
          )}
        </div>

        {/* Tombol Menu Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Konten Menu Mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-700 px-4 pb-4">
          <nav className="flex flex-col gap-2 mt-4">
            {mainNavLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="px-3 py-2 hover:bg-gray-800 rounded-md">
                {link.label}
              </Link>
            ))}
            {/* Tambahkan link lain untuk mobile di sini */}
            <div className="mt-4 border-t border-gray-700 pt-4">
              {/* PERBAIKAN 2: Hapus tanda kurung () dari isAuthenticated */}
              {isAuthenticated && user ? (
                <div>
                  <p className='px-3 text-sm text-gray-400'>Masuk sebagai {user.name}</p>
                  <button onClick={handleLogout} className="flex items-center gap-2 w-full mt-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500 hover:text-white rounded"><LogOut size={16}/>Keluar</button>
                </div>
              ) : (
               <Link href="/login" onClick={() => setIsMenuOpen(false)} className="bg-blue-600 text-white w-full block text-center py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors">
                  Masuk
               </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}