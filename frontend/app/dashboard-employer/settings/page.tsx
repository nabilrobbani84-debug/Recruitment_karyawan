// src/app/(dashboard-employer)/settings/page.tsx
'use client';
import React from 'react';

const AccountSettingsForm = () => {
    return (
        <form className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">Nama Kontak Utama</label>
                <input type="text" defaultValue="Rina Mardiana" className="mt-1 w-full form-input" />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Email Kontak Utama</label>
                <input type="email" defaultValue="rina.m@majubersama.co.id" className="mt-1 w-full form-input" />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Ganti Password</label>
                <input type="password" placeholder="Masukkan password baru" className="mt-1 w-full form-input" />
            </div>
             <div className="flex justify-end">
                <button type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded-lg">Simpan Pengaturan</button>
             </div>
        </form>
    )
}

const NotificationSettings = () => {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <span className="flex-grow flex flex-col">
                    <span className="text-sm font-medium text-gray-900">Notifikasi Pelamar Baru</span>
                    <span className="text-sm text-gray-500">Kirim email setiap ada kandidat baru yang melamar.</span>
                </span>
                {/* Toggle Switch Component */}
                <button type="button" className="bg-primary relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out">
                    <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                </button>
            </div>
            {/* ...tambahkan opsi notifikasi lainnya */}
        </div>
    )
}


export default function SettingsPage() {
  return (
    <div className="space-y-10">
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Pengaturan Akun</h2>
        <AccountSettingsForm />
      </div>
       <div className="bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Preferensi Notifikasi</h2>
        <NotificationSettings />
      </div>
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
            <h3 className="text-xl font-bold text-red-800">Area Berbahaya</h3>
            <p className="mt-2 text-red-700">Menghapus akun Anda akan menghapus semua data perusahaan dan lowongan secara permanen. Aksi ini tidak dapat dibatalkan.</p>
            <button className="mt-4 bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700">
                Hapus Akun Perusahaan
            </button>
        </div>
    </div>
  );
}