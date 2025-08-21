import apiClient from '@/lib/apiClient';
// FIX 1: Impor Application dan ApplicationFormData dari sumber yang sama dan benar
import { Application, ApplicationFormData } from '@/lib/types'; 
import { AxiosError } from 'axios';

// FIX 2: Definisi interface lokal dihapus dari sini.

class ApplicationService {
  /**
   * Mengirim lamaran untuk sebuah pekerjaan.
   * @param jobId - ID pekerjaan yang dilamar.
   * @param formData - Data tambahan seperti cover letter.
   * @returns Promise<Application> - Data lamaran yang baru dibuat.
   */
  async applyToJob(jobId: string, formData: ApplicationFormData): Promise<Application> {
    try {
      const response = await apiClient.post(`/jobs/${jobId}/apply`, formData);
      return response.data;
    } catch (error: unknown) {
      console.error(`Error applying to job ${jobId}:`, error);

      if (error instanceof AxiosError) {
        // Cek jika error karena sudah pernah melamar
        if (error.response?.data?.message === 'Already applied') {
          throw new Error('Anda sudah pernah melamar di pekerjaan ini.');
        }
      }
      
      // Error fallback
      throw new Error('Gagal mengirim lamaran.');
    }
  }

  /**
   * Mengambil riwayat lamaran pengguna yang sedang login.
   * @returns Promise<Application[]> - Daftar riwayat lamaran.
   */
  async getApplications(): Promise<Application[]> {
    try {
      const response = await apiClient.get('/candidate/applications');
      return response.data;
    } catch (error) {
      console.error('Error fetching applications:', error);
      throw new Error('Gagal mengambil riwayat lamaran.');
    }
  }
}

export const applicationService = new ApplicationService();
