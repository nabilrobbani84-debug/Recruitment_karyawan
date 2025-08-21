"use client";

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1e1e2f] text-white pt-16 pb-8 relative">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img src="/footer.png" alt="Footer Background" className="w-full h-full object-cover opacity-20" />
      </div>

      {/* Main Grid: Logo, Nav Columns, Contact */}
      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        {/* Logo & Social Icons */}
        <div>
          <img src="/logo.png" alt="RecruitEasy Logo" className="h-12 mb-4" />
          <p className="uppercase font-semibold mb-4">RecruitEasy</p>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-green-500">
              <i className="fab fa-instagram text-lg"></i>
            </Link>
            <Link href="#" className="hover:text-green-500">
              <i className="fab fa-linkedin-in text-lg"></i>
            </Link>
            <Link href="#" className="hover:text-green-500">
              <i className="fab fa-facebook-f text-lg"></i>
            </Link>
            <Link href="#" className="hover:text-green-500">
              <i className="fab fa-tiktok text-lg"></i>
            </Link>
            <Link href="#" className="hover:text-green-500">
              <i className="fas fa-envelope text-lg"></i>
            </Link>
          </div>
        </div>
        {/* Untuk Pencari Kerja */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Untuk Pencari Kerja</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/jobs" className="hover:text-green-500">Nama Perusahaan</Link></li>
            <li><Link href="/categories" className="hover:text-green-500">Kategori Pekerjaan</Link></li>
            <li><Link href="/jobs/popular" className="hover:text-green-500">Lowongan Kerja Populer</Link></li>
            <li><Link href="/help" className="hover:text-green-500">Help Center</Link></li>
          </ul>
        </div>
        {/* Untuk Pemberi Kerja */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Untuk Pemberi Kerja</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/hr-tips" className="hover:text-green-500">HR Tips</Link></li>
            <li><Link href="/recruiteasy" className="hover:text-green-500">RecruitEasy</Link></li>
            <li><Link href="/platform" className="hover:text-green-500">Platform</Link></li>
            <li><Link href="/perekrutan" className="hover:text-green-500">Perekrutan</Link></li>
            <li><Link href="/bakat" className="hover:text-green-500">Bakat</Link></li>
            <li><Link href="/terkelola" className="hover:text-green-500">Terkelola</Link></li>
          </ul>
        </div>
        {/* Perusahaan */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Perusahaan</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about-us" className="hover:text-green-500">Tentang Kami</Link></li>
            <li><Link href="/hired-blog" className="hover:text-green-500">Hired Blog</Link></li>
            <li><Link href="/inside-recruiteasy" className="hover:text-green-500">Inside RecruitEasy</Link></li>
            <li><Link href="/tech-blog" className="hover:text-green-500">Tech Blog</Link></li>
            <li><Link href="/careers" className="hover:text-green-500">Careers</Link></li>
            <li><Link href="/kebijakan" className="hover:text-green-500">Kebijakan</Link></li>
            <li><Link href="/privasi" className="hover:text-green-500">Privasi</Link></li>
            <li><Link href="/syarat" className="hover:text-green-500">Syarat dan Ketentuan</Link></li>
            <li><Link href="/layanan" className="hover:text-green-500">Layanan</Link></li>
          </ul>
        </div>
        {/* Contact Us */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
          <p className="text-sm">4517 Washington Ave. Manchester, Kentucky 39495</p>
          <p className="text-sm mt-2 flex items-center"><i className="far fa-clock mr-2"></i>Mon - Sat: 10:00 AM - 4:00 PM</p>
          <p className="text-sm mt-2 flex items-center"><i className="fas fa-phone mr-2"></i>+6285777659082</p>
        </div>
      </div>

      {/* Image on the Right Side */}
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 pr-4">
        <img src="/footer.png" alt="RecruitEasy Footer Graphic Right" className="h-[200px] w-auto" />
      </div>

      {/* Image on the Left Side */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 pl-4">
        <img src="/footer2.png" alt="RecruitEasy Footer Graphic Left" className="h-[200px] w-auto" />
      </div>

      {/* Scroll to Top Button */}
      <div className="absolute left-1/2 transform -translate-x-1/2 -mt-8 bg-gray-800 hover:bg-green-500 p-3 rounded-full cursor-pointer z-10">
        <i className="fas fa-arrow-up text-white"></i>
      </div>

      {/* Bottom Bar */}
      <div className="mt-16 border-t border-gray-700 pt-4">
        <div className="max-w-screen-xl mx-auto px-6 flex justify-between items-center text-sm">
          <p>&copy; 2025 PT. RecruitEasy Indonesia Group</p>
          <div className="space-x-6">
            <Link href="/terms" className="hover:text-green-500">Terms & Conditions</Link>
            <Link href="/privacy" className="hover:text-green-500">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
