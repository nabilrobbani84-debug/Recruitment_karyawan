'use client';

import React from 'react';
import { Button } from '@/component/common/Button';
import { InputField } from '@/component/common/InputField';
import { useForm } from 'react-hook-form'; // Contoh menggunakan react-hook-form

const SettingsPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onPasswordChange = (data: any) => {
    console.log("Changing password...", data);
    // Panggil authService.changePassword(data)
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Pengaturan Akun</h1>
        <p className="mt-1 text-gray-600">Kelola informasi login dan preferensi notifikasi Anda.</p>
      </header>

      {/* Form Ubah Kata Sandi */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-4">Ubah Kata Sandi</h2>
        <form onSubmit={handleSubmit(onPasswordChange)} className="space-y-4">
          <InputField
            label="Kata Sandi Lama"
            type="password"
            {...register('oldPassword', { required: 'Kata sandi lama wajib diisi' })}
            error={errors.oldPassword?.message as string}
          />
          <InputField
            label="Kata Sandi Baru"
            type="password"
            {...register('newPassword', { required: 'Kata sandi baru wajib diisi', minLength: 8 })}
            error={errors.newPassword?.message as string}
          />
          <InputField
            label="Konfirmasi Kata Sandi Baru"
            type="password"
            {...register('confirmPassword', { required: 'Konfirmasi wajib diisi' })}
            error={errors.confirmPassword?.message as string}
          />
          <div className="pt-4 text-right">
            <Button type="submit" variant="primary">
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </section>

      {/* Pengaturan Notifikasi */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-4">Notifikasi</h2>
        <div className="space-y-5">
           <div className="flex items-center justify-between">
              <div>
                 <h3 className="font-medium text-gray-800">Rekomendasi Pekerjaan Mingguan</h3>
                 <p className="text-sm text-gray-500">Dapatkan email berisi pekerjaan yang cocok untuk Anda setiap Senin.</p>
              </div>
              <label htmlFor="job-recs" className="cursor-pointer">
                <div className="relative">
                  <input type="checkbox" id="job-recs" className="sr-only peer" defaultChecked/>
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </div>
              </label>
           </div>
           <div className="flex items-center justify-between">
              <div>
                 <h3 className="font-medium text-gray-800">Update Status Lamaran</h3>
                 <p className="text-sm text-gray-500">Dapatkan notifikasi email saat status lamaran Anda berubah.</p>
              </div>
               <label htmlFor="app-updates" className="cursor-pointer">
                <div className="relative">
                  <input type="checkbox" id="app-updates" className="sr-only peer" defaultChecked/>
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </div>
              </label>
           </div>
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;