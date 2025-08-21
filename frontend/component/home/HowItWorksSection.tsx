import React from 'react';
import { SectionTitle } from '@/component/common/SectionTitle';
import { UserPlus, FileSearch, Send } from 'lucide-react';

const steps = [
  {
    number: "01",
    title: "Buat Akun Anda",
    description: "Daftar gratis hanya dalam beberapa menit dan lengkapi profil Anda untuk menarik perhatian perekrut.",
    icon: <UserPlus />,
  },
  {
    number: "02",
    title: "Cari Lowongan",
    description: "Gunakan filter pencarian canggih kami untuk menemukan pekerjaan yang cocok dengan kriteria Anda.",
    icon: <FileSearch />,
  },
  {
    number: "03",
    title: "Kirim Lamaran",
    description: "Lamar pekerjaan impian Anda dengan mudah dan lacak status lamaran Anda langsung dari dashboard.",
    icon: <Send />,
  },
];

export const HowItWorksSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Langkah Mudah untuk Memulai"
          subtitle="Easy Steps to Join us?"
          align="center"
        />
        <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
          {steps.map((step) => (
            <div key={step.number} className="p-8 bg-white rounded-xl shadow-md border">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mx-auto">
                 {React.cloneElement(step.icon, { size: 32 })}
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};