import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// --- PERBAIKAN: Gunakan path yang benar ('components') dan kapitalisasi yang benar ---
import Header from '@/component/common/Header';
import Footer from '@/component/common/Footer';
import { SupportWidget } from '@/component/chat/SupportWidget';
import AuthInterceptorSetup from "@/component/common/AuthInterceptorSetup";
import Providers from './provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Recruiteasy - Temukan Pekerjaan Impian Anda',
  description: 'Platform untuk mencari lowongan pekerjaan dari perusahaan terkemuka di Indonesia.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.className} bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200`}>
        {/* Bungkus semua konten dengan <Providers> */}
        <Providers>
          {/* AuthInterceptorSetup tidak me-render UI, jadi aman ditaruh di sini */}
          <AuthInterceptorSetup />
          
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>

          {/* ChatWidget berada di luar flex-col agar posisinya fixed dengan benar */}
          <SupportWidget />
        </Providers>
      </body>
    </html>
  );
}
