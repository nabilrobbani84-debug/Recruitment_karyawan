/** @type {import('next').NextConfig} */
const nextConfig = {
  // --- PERBAIKAN: Tambahkan blok konfigurasi 'images' di sini ---
  images: {
    // remotePatterns adalah cara yang lebih modern dan aman
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**', // Izinkan semua path dari hostname ini
      },

      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      // Anda bisa menambahkan hostname lain di sini jika perlu
      // Contoh:
      // {
      //   protocol: 'https',
      //   hostname: 'cdn.vostra-api.com',
      //   port: '',
      //   pathname: '/images/**',
      // },
    ],
  },
  // Konfigurasi lain yang mungkin sudah Anda miliki bisa tetap di sini
  // reactStrictMode: true,
};

module.exports = nextConfig;
