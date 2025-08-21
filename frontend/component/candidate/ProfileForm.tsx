'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { UserProfile } from '@/lib/types'; // Asumsi tipe data ada
import { InputField } from '@/component/common/InputField';
import { Button } from '@/component/common/Button';
import { profileService } from '@/services/profileService'; // Asumsi service ada

// Skema validasi menggunakan Zod
const profileSchema = z.object({
  fullName: z.string().min(3, 'Nama lengkap minimal 3 karakter'),
  headline: z.string().min(10, 'Headline minimal 10 karakter'),
  phoneNumber: z.string().min(10, 'Nomor telepon tidak valid'),
  location: z.string().min(3, 'Lokasi minimal 3 karakter'),
  summary: z.string().min(50, 'Ringkasan minimal 50 karakter').max(500, 'Ringkasan maksimal 500 karakter'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  initialData: UserProfile;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: initialData.fullName || '',
      headline: initialData.headline || '',
      phoneNumber: initialData.phoneNumber || '',
      location: initialData.location || '',
      summary: initialData.summary || '',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await profileService.updateCandidateProfile(data);
      // Tampilkan notifikasi sukses
      alert('Profil berhasil diperbarui!');
    } catch (error) {
      console.error(error);
      // Tampilkan notifikasi error
      alert('Gagal memperbarui profil.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Nama Lengkap"
          id="fullName"
          {...register('fullName')}
          error={errors.fullName?.message}
        />
        <InputField
          label="Nomor Telepon"
          id="phoneNumber"
          {...register('phoneNumber')}
          error={errors.phoneNumber?.message}
        />
      </div>
       <InputField
        label="Headline Profesional"
        id="headline"
        placeholder="Contoh: Fresh Graduate Teknik Informatika"
        {...register('headline')}
        error={errors.headline?.message}
      />
       <InputField
        label="Lokasi Saat Ini"
        id="location"
        placeholder="Contoh: Jakarta, Indonesia"
        {...register('location')}
        error={errors.location?.message}
      />
      <div>
        <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
          Ringkasan Profil
        </label>
        <textarea
          id="summary"
          rows={5}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          {...register('summary')}
        />
        {errors.summary && <p className="mt-1 text-sm text-red-600">{errors.summary.message}</p>}
      </div>
      <div className="text-right">
        <Button type="submit" isLoading={isSubmitting}>
          {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
        </Button>
      </div>
    </form>
  );
};