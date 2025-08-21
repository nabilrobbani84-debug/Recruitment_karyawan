// src/app/(dashboard-employer)/post-job/page.tsx
'use client';
import React from 'react';
import SectionTitle from '@/components/common/SectionTitle';

// Sebaiknya ini menjadi komponen sendiri `JobPostForm.tsx` di `src/components/employer/`
const JobPostForm = () => {
    // TODO: Implementasi state & logic untuk form
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logika submit ke backend
        alert('Lowongan berhasil diposting! (Placeholder)');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informasi Dasar */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Informasi Dasar Lowongan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium">Posisi Pekerjaan</label>
                        <input type="text" placeholder="Contoh: Frontend Developer" className="mt-1 w-full form-input" required/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium">Tipe Pekerjaan</label>
                        <select className="mt-1 w-full form-select" required>
                            <option>Purna Waktu (Full-time)</option>
                            <option>Paruh Waktu (Part-time)</option>
                            <option>Kontrak</option>
                            <option>Magang (Internship)</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium">Kategori</label>
                         <input type="text" placeholder="Contoh: Teknologi, Marketing" className="mt-1 w-full form-input" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium">Lokasi</label>
                        <input type="text" placeholder="Contoh: Jakarta, Remote" className="mt-1 w-full form-input" required/>
                    </div>
                </div>
            </div>

             {/* Detail Gaji & Deskripsi */}
            <div className="p-6 bg-white rounded-lg shadow-sm">
                 <h3 className="text-lg font-semibold text-gray-800 mb-4">Detail Pekerjaan</h3>
                <div className="space-y-6">
                    <div>
                         <label className="block text-sm font-medium">Rentang Gaji (per bulan, opsional)</label>
                         <div className="flex items-center space-x-2">
                             <input type="number" placeholder="Rp Minimum" className="w-full form-input"/>
                             <span>-</span>
                             <input type="number" placeholder="Rp Maksimum" className="w-full form-input"/>
                         </div>
                    </div>
                     <div>
                        <label className="block text-sm font-medium">Deskripsi Pekerjaan</label>
                        <textarea rows={6} placeholder="Jelaskan tentang tugas dan tanggung jawab untuk posisi ini..." className="mt-1 w-full form-textarea" required></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Kualifikasi</label>
                        <textarea rows={6} placeholder="Sebutkan kualifikasi yang dibutuhkan, misal: Pengalaman minimal 2 tahun di React, Menguasai TypeScript, dll." className="mt-1 w-full form-textarea" required></textarea>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                 <button type="submit" className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-dark transition-colors">
                    Posting Lowongan
                </button>
            </div>
        </form>
    )
}

// Tambahkan CSS ini di globals.css jika belum ada untuk styling form yang lebih baik
// .form-input, .form-select, .form-textarea {
//  @apply block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm;
// }


export default function PostJobPage() {
    return (
        <div>
            <SectionTitle
                title="Buat Lowongan Pekerjaan Baru"
                subtitle="Isi detail di bawah ini untuk menemukan kandidat terbaik untuk perusahaan Anda."
            />
            <div className="mt-8">
                <JobPostForm />
            </div>
        </div>
    )
}