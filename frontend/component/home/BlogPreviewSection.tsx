// import React from 'react';
// import Image from 'next/image'; // 1. Impor komponen Image dari Next.js
// import Link from 'next/link';
// import { SectionTitle } from '@/component/common/SectionTitle';
// import { ArrowRight } from 'lucide-react'; // Ikon ini sekarang akan kita gunakan

// // Data dummy, idealnya dari API
// const posts = [
//   { id: 1, title: '5 Tips Jitu Menulis CV yang Dilirik HRD', excerpt: 'CV adalah kesan pertama Anda. Pelajari cara membuatnya menonjol...', image: '/images/blog/cv-tips.jpg', href: '/blog/cv-tips' },
//   { id: 2, title: 'Panduan Sukses Wawancara Kerja untuk Fresh Graduate', excerpt: 'Jangan gugup! Persiapkan diri Anda dengan panduan lengkap ini...', image: '/images/blog/interview.jpg', href: '/blog/interview-guide' },
//   { id: 3, title: 'Membangun Personal Branding di LinkedIn', excerpt: 'LinkedIn lebih dari sekadar CV online. Manfaatkan untuk karir Anda...', image: '/images/blog/linkedin.jpg', href: '/blog/linkedin-branding' },
// ];

// export const BlogPreviewSection = () => {
//   return (
//     <section className="py-16 sm:py-24 bg-white">
//       <div className="container mx-auto px-4">
//         <SectionTitle
//           title="Jelajahi Blog & Berita"
//           subtitle="Dapatkan wawasan terbaru seputar dunia karir dan pengembangan diri."
//           align="center"
//         />
//         <div className="mt-12 grid gap-8 lg:grid-cols-3">
//           {posts.map((post) => (
//             <article key={post.id} className="group flex flex-col overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border">
//               <div className="flex-shrink-0 relative h-48 w-full">
//                 {/* 2. Menggunakan komponen <Image> dari Next.js */}
//                 <Image
//                   src={post.image}
//                   alt={`Gambar sampul untuk artikel: ${post.title}`} // 3. Menambahkan alt text yang deskriptif
//                   fill
//                   style={{ objectFit: 'cover' }}
//                   sizes="(max-width: 1024px) 100vw, 33vw"
//                 />
//               </div>
//               <div className="flex flex-1 flex-col justify-between bg-white p-6">
//                 <div className="flex-1">
//                   <Link href={post.href} className="block mt-2">
//                     <p className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{post.title}</p>
//                     <p className="mt-3 text-base text-gray-500">{post.excerpt}</p>
//                   </Link>
//                 </div>
//                 <div className="mt-6">
//                   <Link href={post.href} className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 group-hover:underline">
//                     Baca Selengkapnya
//                     {/* 4. Menambahkan ikon ArrowRight yang sebelumnya tidak digunakan */}
//                     <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
//                   </Link>
//                 </div>
//               </div>
//             </article>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };