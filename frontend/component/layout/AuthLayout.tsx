
import Image from 'next/image';
import Link from 'next/link';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  illustration?: string; // Opsional, path ke gambar ilustrasi
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  illustration = '/images/auth-illustration.svg', // Gambar default
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light via-primary to-purple-700 p-4">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center max-w-5xl">
        {/* Kolom Ilustrasi (terlihat di layar besar) */}
        <div className="hidden lg:flex lg:w-1/2 p-8 items-center justify-center">
          {/* Ganti dengan ilustrasi yang lebih relevan atauSVG */}
          <Image
            src={illustration}
            alt="Ilustrasi Otentikasi RecruitEasy"
            width={400}
            height={400}
            priority
            className="object-contain"
          />
        </div>

        {/* Kolom Form */}
        <div className="w-full lg:w-1/2 bg-white shadow-2xl rounded-xl p-8 md:p-12 transform transition-all duration-500 hover:scale-105">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo.png" // Pastikan Anda punya logo.png di public/images
                alt="RecruitEasy Logo"
                width={150}
                height={40}
                className="mx-auto"
              />
            </Link>
            <h1 className="text-3xl font-bold text-primary-dark mb-2">{title}</h1>
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}