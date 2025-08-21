// src/services/categoryService.ts



import apiClient from '@/lib/apiClient';
// FIX: Impor isAxiosError dari axios untuk digunakan sebagai type guard yang andal.
import { isAxiosError } from 'axios';

// --- Definisi Tipe Data (Tidak ada perubahan) ---

interface ApiCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  parent_id: string | null;
  job_count: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  parentId: string | null;
  jobCount: number;
  children: Category[];
}

export interface CategoryPayload {
  name: string;
  description: string;
  parentId?: string | null;
}

// --- Fungsi Pemetaan (Mapper) (Tidak ada perubahan) ---

const mapApiCategoryToCategory = (apiCategory: ApiCategory): Category => {
  return {
    id: apiCategory.id,
    name: apiCategory.name,
    slug: apiCategory.slug,
    description: apiCategory.description,
    parentId: apiCategory.parent_id,
    jobCount: apiCategory.job_count,
    children: [],
  };
};

// --- Fungsi Service (Berinteraksi dengan API) ---

const CATEGORY_API_ENDPOINT = '/categories';

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await apiClient.get<ApiCategory[]>(CATEGORY_API_ENDPOINT);
    return response.data.map(mapApiCategoryToCategory);
  } catch (error: unknown) { // FIX: Gunakan 'unknown' bukan 'any'
    console.error('Service Error: Gagal mengambil semua kategori', error);
    let errorMessage = 'Terjadi kesalahan saat memuat kategori';
    // FIX: Gunakan type guard untuk menangani error dengan aman
    if (isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    throw new Error(errorMessage);
  }
};

export const getCategoryBySlug = async (slug: string): Promise<Category> => {
    try {
        const response = await apiClient.get<ApiCategory>(`${CATEGORY_API_ENDPOINT}/slug/${slug}`);
        return mapApiCategoryToCategory(response.data);
    } catch (error: unknown) { // FIX: Gunakan 'unknown' bukan 'any'
        console.error(`Service Error: Gagal mengambil kategori dengan slug ${slug}`, error);
        // FIX: Gunakan type guard untuk menangani error dengan aman
        if (isAxiosError(error) && error.response?.status === 404) {
            throw new Error('Kategori yang Anda cari tidak ditemukan.');
        }
        let errorMessage = 'Gagal mengambil detail kategori';
        if (isAxiosError(error)) {
            errorMessage = error.response?.data?.message || error.message;
        } else if (error instanceof Error) {
            errorMessage = error.message;
        }
        throw new Error(errorMessage);
    }
};

export const createCategory = async (categoryData: CategoryPayload): Promise<Category> => {
  try {
    const apiPayload = {
      name: categoryData.name,
      description: categoryData.description,
      parent_id: categoryData.parentId,
    };
    const response = await apiClient.post<ApiCategory>(CATEGORY_API_ENDPOINT, apiPayload);
    return mapApiCategoryToCategory(response.data);
  } catch (error: unknown) { // FIX: Gunakan 'unknown' bukan 'any'
    console.error('Service Error: Gagal membuat kategori', error);
    let errorMessage = 'Gagal menyimpan kategori baru';
    // FIX: Gunakan type guard untuk menangani error dengan aman
    if (isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    throw new Error(errorMessage);
  }
};

export const updateCategory = async (id: string, categoryData: CategoryPayload): Promise<Category> => {
    try {
        const apiPayload = {
            name: categoryData.name,
            description: categoryData.description,
            parent_id: categoryData.parentId,
        };
        const response = await apiClient.put<ApiCategory>(`${CATEGORY_API_ENDPOINT}/${id}`, apiPayload);
        return mapApiCategoryToCategory(response.data);
    } catch (error: unknown) { // FIX: Gunakan 'unknown' bukan 'any'
        console.error(`Service Error: Gagal memperbarui kategori dengan ID ${id}`, error);
        let errorMessage = 'Gagal memperbarui kategori';
        // FIX: Gunakan type guard untuk menangani error dengan aman
        if (isAxiosError(error)) {
          errorMessage = error.response?.data?.message || error.message;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }
        throw new Error(errorMessage);
    }
};

export const deleteCategory = async (id: string): Promise<void> => {
    try {
        await apiClient.delete(`${CATEGORY_API_ENDPOINT}/${id}`);
    } catch (error: unknown) { // FIX: Gunakan 'unknown' bukan 'any'
        console.error(`Service Error: Gagal menghapus kategori dengan ID ${id}`, error);
        let errorMessage = 'Gagal menghapus kategori';
        // FIX: Gunakan type guard untuk menangani error dengan aman
        if (isAxiosError(error)) {
          errorMessage = error.response?.data?.message || error.message;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }
        throw new Error(errorMessage);
    }
};