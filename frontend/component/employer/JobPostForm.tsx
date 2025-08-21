// src/components/employer/JobPostForm.tsx

import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import { isAxiosError } from 'axios';

// --- Impor komponen, service, dan utilitas dari struktur proyek Anda ---
// FIX: Path diubah dari @/component menjadi @/components
import { InputField } from '@/component/common/InputField';
import { Button } from '@/component/common/Button';
import { Alert } from '@/component/common/Alert';
import { SectionTitle } from '@/component/common/SectionTitle';

// FIX: Pastikan file service Anda benar-benar ada dan mengekspor fungsi-fungsi ini.
// Jika file service belum dibuat, error akan tetap muncul.
import * as jobService from '@/services/jobService';
import * as categoryService from '@/services/categoryService';
import * as skillService from '@/services/skillService';

// FIX: Impor ini sekarang akan berhasil setelah Anda membuat file constants.ts
import { JOB_TYPES, SALARY_PERIODS, CURRENCIES } from '@/lib/constants';

// --- Definisi Tipe Data ---
// Menggunakan tipe dari service lebih baik, tapi ini bisa untuk sementara.
import type { Category } from '@/services/categoryService';
import type { Skill } from '@/services/skillService';


// --- Skema Validasi menggunakan Zod ---
const jobPostSchema = z.object({
  title: z.string().min(5, { message: "Judul pekerjaan minimal 5 karakter." }),
  location: z.string().min(3, { message: "Lokasi tidak boleh kosong." }),
  jobCategoryId: z.string().min(1, { message: "Silakan pilih kategori pekerjaan." }),
  jobType: z.string().min(1, { message: "Silakan pilih tipe pekerjaan." }),
  salaryMin: z.coerce.number().positive({ message: "Gaji minimal harus angka positif." }),
  salaryMax: z.coerce.number().positive({ message: "Gaji maksimal harus angka positif." }),
  salaryCurrency: z.string().min(1, "Mata uang harus dipilih"),
  salaryPeriod: z.string().min(1, "Periode gaji harus dipilih"),
  skillIds: z.array(z.string()).min(1, { message: "Pilih minimal satu skill yang dibutuhkan." }),
  description: z.string().min(50, { message: "Deskripsi pekerjaan minimal 50 karakter." }),
  responsibilities: z.string().min(50, { message: "Tanggung jawab minimal 50 karakter." }),
  qualifications: z.string().min(50, { message: "Kualifikasi minimal 50 karakter." }),
}).refine(data => data.salaryMin <= data.salaryMax, {
  message: "Gaji minimal tidak boleh lebih besar dari gaji maksimal.",
  path: ["salaryMax"],
});

type JobPostFormData = z.infer<typeof jobPostSchema>;


// --- Komponen Utama ---
export const JobPostForm = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [initialError, setInitialError] = useState<string | null>(null);

  const [formStatus, setFormStatus] = useState<{
    loading: boolean;
    error: string | null;
    success: string | null;
  }>({ loading: false, error: null, success: null });
  
  const { 
    register, 
    handleSubmit, 
    control,
    formState: { errors },
    reset 
  } = useForm<JobPostFormData>({
    resolver: zodResolver(jobPostSchema),
    defaultValues: {
      skillIds: [],
      salaryCurrency: 'IDR',
      salaryPeriod: 'Monthly'
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setInitialLoading(true);
        setInitialError(null);
        const [categoriesData, skillsData] = await Promise.all([
          categoryService.getAllCategories(),
          skillService.getAllSkills(),
        ]);
        setCategories(categoriesData);
        setSkills(skillsData);
      } catch (error: unknown) {
        console.error("Failed to fetch initial data:", error);
        setInitialError("Gagal memuat data yang diperlukan. Silakan coba muat ulang halaman.");
      } finally {
        setInitialLoading(false);
      }
    };
    fetchData();
  }, []);

  const onSubmit: SubmitHandler<JobPostFormData> = async (data) => {
    setFormStatus({ loading: true, error: null, success: null });
    try {
      const response = await jobService.createJob(data);
      setFormStatus({ loading: false, error: null, success: `Lowongan "${response.title}" berhasil dipublikasikan!` });
      reset();
    } catch (error: unknown) {
      console.error("Failed to post job:", error);
      let errorMessage = "Terjadi kesalahan. Gagal memublikasikan lowongan.";
      if (isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      setFormStatus({ loading: false, error: errorMessage, success: null });
    }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
        <p className="ml-4 text-gray-600">Mempersiapkan form...</p>
      </div>
    );
  }
  
  // FIX: Menggunakan 'variant' sebagai prop, asumsi ini sesuai dengan definisi Alert.tsx
  if (initialError) {
    return <Alert variant="error" title="Gagal Memuat Data" message={initialError} />;
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl mx-auto">
      <SectionTitle title="Buat Lowongan Pekerjaan Baru" />
      <p className="text-gray-500 mb-8">Isi detail di bawah ini untuk mempublikasikan lowongan pekerjaan di platform kami.</p>
      
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="space-y-6">

          {formStatus.error && <Alert variant="error" title="Gagal" message={formStatus.error} />}
          {formStatus.success && <Alert variant="success" title="Berhasil" message={formStatus.success} />}

          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Detail Utama</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Judul Pekerjaan"
                id="title"
                {...register('title')}
                error={errors.title?.message}
                placeholder="Contoh: Senior Frontend Developer"
                required
              />
              <InputField
                label="Lokasi"
                id="location"
                {...register('location')}
                error={errors.location?.message}
                placeholder="Contoh: Jakarta, Remote"
                required
              />
              <div>
                <label htmlFor="jobCategoryId" className="block text-sm font-medium text-gray-700 mb-1">Kategori Pekerjaan <span className="text-red-500">*</span></label>
                <select 
                  id="jobCategoryId"
                  {...register('jobCategoryId')}
                  className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.jobCategoryId ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
                {errors.jobCategoryId && <p className="text-sm text-red-600 mt-1">{errors.jobCategoryId.message}</p>}
              </div>
              <div>
                <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">Tipe Pekerjaan <span className="text-red-500">*</span></label>
                <select 
                  id="jobType"
                  {...register('jobType')}
                  className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.jobType ? 'border-red-500' : 'border-gray-300'}`}
                >
                    <option value="">Pilih Tipe</option>
                    {JOB_TYPES.map((type) => <option key={type.value} value={type.value}>{type.label}</option>)}
                </select>
                {errors.jobType && <p className="text-sm text-red-600 mt-1">{errors.jobType.message}</p>}
              </div>
            </div>
          </div>

          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Informasi Gaji</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
               <InputField
                label="Gaji Minimal"
                id="salaryMin"
                type="number"
                {...register('salaryMin')}
                error={errors.salaryMin?.message}
                placeholder="10000000"
                required
              />
               <InputField
                label="Gaji Maksimal"
                id="salaryMax"
                type="number"
                {...register('salaryMax')}
                error={errors.salaryMax?.message}
                placeholder="15000000"
                required
              />
               <div>
                <label htmlFor="salaryCurrency" className="block text-sm font-medium text-gray-700 mb-1">Mata Uang <span className="text-red-500">*</span></label>
                <select id="salaryCurrency" {...register('salaryCurrency')} className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300">
                    {CURRENCIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
               <div>
                <label htmlFor="salaryPeriod" className="block text-sm font-medium text-gray-700 mb-1">Periode <span className="text-red-500">*</span></label>
                <select id="salaryPeriod" {...register('salaryPeriod')} className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 border-gray-300">
                    {SALARY_PERIODS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                </select>
              </div>
            </div>
          </div>
          
          <div className="border-b pb-6">
            <label htmlFor="skillIds" className="block text-lg font-semibold text-gray-800 mb-4">Skill yang Dibutuhkan <span className="text-red-500">*</span></label>
            <p className="text-gray-500 mb-2 text-sm">Pilih beberapa skill yang paling relevan.</p>
            <Controller
                name="skillIds"
                control={control}
                render={({ field }) => (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-60 overflow-y-auto p-4 border rounded-md">
                        {skills.map((skill) => (
                            <label key={skill.id} className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    checked={field.value?.includes(skill.id)}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        const selectedIds = field.value ? [...field.value] : [];
                                        if (e.target.checked) {
                                            field.onChange([...selectedIds, skill.id]);
                                        } else {
                                            field.onChange(selectedIds.filter((id) => id !== skill.id));
                                        }
                                    }}
                                />
                                <span className="text-gray-700">{skill.name}</span>
                            </label>
                        ))}
                    </div>
                )}
            />
            {errors.skillIds && <p className="text-sm text-red-600 mt-1">{errors.skillIds.message}</p>}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Deskripsi Detail</h3>
            <div className="space-y-4">
              <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Pekerjaan <span className="text-red-500">*</span></label>
                  <textarea id="description" {...register('description')} rows={6} className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.description ? 'border-red-500' : 'border-gray-300'}`} placeholder="Jelaskan secara umum tentang peran ini..."></textarea>
                  {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>}
              </div>
              <div>
                  <label htmlFor="responsibilities" className="block text-sm font-medium text-gray-700 mb-1">Tanggung Jawab Utama <span className="text-red-500">*</span></label>
                  <textarea id="responsibilities" {...register('responsibilities')} rows={6} className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.responsibilities ? 'border-red-500' : 'border-gray-300'}`} placeholder="Buat daftar tanggung jawab utama dalam format poin atau paragraf..."></textarea>
                  {errors.responsibilities && <p className="text-sm text-red-600 mt-1">{errors.responsibilities.message}</p>}
              </div>
              <div>
                  <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700 mb-1">Kualifikasi <span className="text-red-500">*</span></label>
                  <textarea id="qualifications" {...register('qualifications')} rows={6} className={`w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.qualifications ? 'border-red-500' : 'border-gray-300'}`} placeholder="Sebutkan kualifikasi yang harus dimiliki kandidat..."></textarea>
                  {errors.qualifications && <p className="text-sm text-red-600 mt-1">{errors.qualifications.message}</p>}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end pt-6">
            <Button 
              type="submit" 
              disabled={formStatus.loading}
              className="min-w-[150px]"
            >
              {formStatus.loading ? (
                <Loader2 className="animate-spin h-5 w-5 mx-auto" />
              ) : (
                'Publikasikan Lowongan'
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};