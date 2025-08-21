import apiClient from '@/lib/apiClient';
// Tipe 'Education' sekarang akan digunakan
import { UserProfile, Experience, Education } from '@/lib/types'; 

class ProfileService {
  /**
   * Mengambil profil lengkap kandidat yang sedang login.
   * @returns Promise<UserProfile>
   */
  async getCandidateProfile(): Promise<UserProfile> {
    try {
      const response = await apiClient.get('/candidate/profile');
      return response.data;
    } catch (error) {
      console.error('Error fetching candidate profile:', error);
      throw new Error('Gagal mengambil data profil.');
    }
  }

  /**
   * Memperbarui profil kandidat.
   * @param profileData - Data profil yang akan diperbarui.
   * @returns Promise<UserProfile> - Data profil setelah diperbarui.
   */
  async updateCandidateProfile(profileData: Partial<UserProfile>): Promise<UserProfile> {
    try {
      const response = await apiClient.patch('/candidate/profile', profileData);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw new Error('Gagal memperbarui profil.');
    }
  }

  /**
   * Mengunggah file CV. Menggunakan FormData untuk file upload.
   * @param file - File CV yang akan diunggah.
   * @returns Promise<{ cvUrl: string }> - URL CV yang baru.
   */
  async uploadCv(file: File): Promise<{ cvUrl: string }> {
    const formData = new FormData();
    formData.append('cv', file);

    try {
      const response = await apiClient.post('/candidate/profile/cv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading CV:', error);
      throw new Error('Gagal mengunggah CV.');
    }
  }
  
  // --- Metode untuk Pengalaman Kerja ---
  async getExperiences(): Promise<Experience[]> {
     try {
        const response = await apiClient.get('/candidate/experiences');
        return response.data;
     } catch (error) {
        console.error('Error fetching experiences:', error);
        throw new Error('Gagal mengambil data pengalaman.');
     }
  }
  
  async addExperience(experienceData: Omit<Experience, 'id'>): Promise<Experience> {
     const response = await apiClient.post('/candidate/experiences', experienceData);
     return response.data;
  }
  
  // --- Metode untuk Pendidikan (BAGIAN YANG DIPERBAIKI) ---

  /**
   * Mengambil riwayat pendidikan kandidat.
   * @returns Promise<Education[]>
   */
  async getEducations(): Promise<Education[]> {
    try {
      const response = await apiClient.get('/candidate/educations');
      return response.data;
    } catch (error) {
      console.error('Error fetching educations:', error);
      throw new Error('Gagal mengambil data pendidikan.');
    }
  }

  /**
   * Menambahkan riwayat pendidikan baru.
   * @param educationData - Data pendidikan tanpa ID.
   * @returns Promise<Education> - Data pendidikan yang baru dibuat.
   */
  async addEducation(educationData: Omit<Education, 'id'>): Promise<Education> {
    try {
      // Tipe 'Education' digunakan di sini
      const response = await apiClient.post('/candidate/educations', educationData);
      return response.data;
    } catch (error) {
      console.error('Error adding education:', error);
      throw new Error('Gagal menambahkan data pendidikan.');
    }
  }

  // Anda juga bisa menambahkan fungsi updateEducation dan deleteEducation dengan pola yang sama.
}

export const profileService = new ProfileService();