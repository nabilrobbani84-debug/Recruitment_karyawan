'use client';

import React, { useState, useEffect } from 'react';
// FIX 1: Path impor diperbaiki ke @/components
import { ProfileForm } from '@/component/candidate/ProfileForm';
import { ExperienceCard } from '@/component/candidate/ExperienceCard';
import { EducationCard } from '@/component/candidate/EducationCard';
import { CVUpload } from '@/component/candidate/CVUpload';
import { Button } from '@/component/common/Button';
import { profileService } from '@/services/profileService';
// FIX 2: Impor tipe dari sumber terpusat
import { UserProfile, Experience, Education } from '@/lib/types';
import { Plus } from 'lucide-react';

const ProfilePage = () => {
  // FIX 3: Menggunakan tipe data yang sudah diimpor untuk state
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Panggil beberapa service sekaligus
        const [profileData, expData, eduData] = await Promise.all([
          profileService.getCandidateProfile(),
          profileService.getExperiences(),
          profileService.getEducations(),
        ]);
        setProfile(profileData);
        setExperiences(expData);
        setEducations(eduData);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
        // Tampilkan notifikasi error kepada user
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  if (isLoading) {
    return <div className="text-center p-10">Memuat data profil...</div>;
  }
  
  if (!profile) {
    return <div className="text-center p-10 text-red-500">Gagal memuat profil. Silakan coba lagi nanti.</div>;
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Profil Saya</h1>
        <p className="mt-1 text-gray-600">Perbarui informasi Anda agar perekrut lebih mudah menemukan Anda.</p>
      </header>
      
      {/* Section Informasi Pribadi */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Informasi Pribadi</h2>
        <ProfileForm initialData={profile} />
      </section>

      {/* Section Upload CV */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Resume / CV</h2>
        <CVUpload currentCV={profile.cvUrl} />
      </section>

      {/* Section Pengalaman Kerja */}
      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Pengalaman Kerja</h2>
          <Button>
            <Plus size={16} className="mr-2"/> Tambah Pengalaman
          </Button>
        </div>
        <div className="space-y-4">
          {experiences.length > 0 ? (
            experiences.map(exp => <ExperienceCard key={exp.id} experience={exp} />)
          ) : (
            <p className="text-gray-500 italic">Anda belum menambahkan pengalaman kerja.</p>
          )}
        </div>
      </section>
      
        {/* Section Pendidikan */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Pendidikan</h2>
          <Button>
             <Plus size={16} className="mr-2"/> Tambah Pendidikan
          </Button>
        </div>
        <div className="space-y-4">
           {educations.length > 0 ? (
             educations.map(edu => <EducationCard key={edu.id} education={edu} />)
           ) : (
             <p className="text-gray-500 italic">Anda belum menambahkan riwayat pendidikan.</p>
           )}
        </div>
      </section>

    </div>
  );
};

export default ProfilePage;
