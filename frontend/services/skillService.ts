// src/services/skillService.ts

// FIX 2: Impor apiClient dikomentari untuk menghilangkan warning 'defined but never used'
// Jika Anda sudah siap menggunakan API backend, hapus komentar pada baris ini.
// import apiClient from '@/lib/apiClient'; 

// FIX 1: Impor sekarang akan berhasil karena tipe sudah didefinisikan di src/lib/types.ts
import { Skill, SkillSuggestion } from '@/lib/types';
import { AxiosError } from 'axios';

/**
 * Kelas SkillService bertanggung jawab untuk semua interaksi API
 * yang berkaitan dengan data keahlian (skills).
 */
class SkillService {

  /**
   * Mengambil daftar saran keahlian berdasarkan query pencarian.
   * Ideal untuk fitur autocomplete pada input field.
   * @param query - String pencarian yang diketik oleh pengguna.
   * @returns Promise<SkillSuggestion[]> - Daftar keahlian yang cocok dengan query.
   * @throws Melempar Error jika panggilan API gagal.
   * @description
   * PENTING: Komponen UI yang memanggil metode ini SANGAT DISARANKAN
   * untuk menggunakan hook `useDebounce`. Ini untuk mencegah panggilan API
   * yang berlebihan pada setiap ketukan tombol, sehingga menghemat sumber daya
   * dan meningkatkan performa.
   */
  async getSkillSuggestions(query: string): Promise<SkillSuggestion[]> {
    if (!query || query.trim().length < 2) {
      return Promise.resolve([]);
    }
    
    try {
      // const response = await apiClient.get<SkillSuggestion[]>('/skills/search', {
      //   params: { q: query, limit: 10 }
      // });
      // return response.data;

      // --- Mock Data untuk Development ---
      console.log(`Mencari keahlian untuk: "${query}"`);
      const mockSkills: SkillSuggestion[] = [
        { id: '1', name: 'React', jobCount: 150 },
        { id: '2', name: 'Next.js', jobCount: 120 },
        { id: '3', name: 'TypeScript', jobCount: 200 },
        { id: '4', name: 'Node.js', jobCount: 180 },
        { id: '5', name: 'Go (Golang)', jobCount: 90 },
        { id: '6', name: 'Tailwind CSS', jobCount: 130 },
        { id: '7', name: 'GraphQL', jobCount: 75 },
        { id: '8', name: 'Rust', jobCount: 40 },
      ];
      const filtered = mockSkills.filter(skill => 
        skill.name.toLowerCase().includes(query.toLowerCase())
      );
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulasi network delay
      return Promise.resolve(filtered);
      // --- Akhir Mock Data ---

    } catch (error) {
      console.error('Error fetching skill suggestions:', error);
      throw new Error('Gagal mendapatkan saran keahlian. Silakan coba lagi nanti.');
    }
  }

  /**
   * Menambahkan satu atau lebih keahlian ke profil kandidat yang sedang login.
   * @param skillNames - Array dari nama keahlian yang akan ditambahkan.
   * @returns Promise<Skill[]> - Daftar keahlian yang berhasil ditambahkan.
   */
  async addSkillsToCandidateProfile(skillNames: string[]): Promise<Skill[]> {
    if (!skillNames || skillNames.length === 0) {
      throw new Error("Daftar keahlian tidak boleh kosong.");
    }

    try {
      // const response = await apiClient.post<Skill[]>('/candidate/profile/skills', { skills: skillNames });
      // return response.data;

      // --- Mock Data untuk Development ---
      console.log('Menambahkan keahlian:', skillNames);
      const newSkills: Skill[] = skillNames.map((name, index) => ({
        id: `new-skill-${Date.now()}-${index}`,
        name: name
      }));
      await new Promise(resolve => setTimeout(resolve, 500));
      return Promise.resolve(newSkills);
      // --- Akhir Mock Data ---

    } catch (error: unknown) {
      console.error('Error adding skills to profile:', error);
      if (error instanceof AxiosError && error.response?.status === 409) {
        throw new Error('Beberapa keahlian sudah ada di profil Anda.');
      }
      throw new Error('Gagal menambahkan keahlian ke profil.');
    }
  }

  /**
   * Menghapus sebuah keahlian dari profil kandidat yang sedang login.
   * @param skillId - ID unik dari keahlian yang akan dihapus.
   * @returns Promise<void> - Tidak mengembalikan apa-apa jika sukses.
   */
  async removeSkillFromCandidateProfile(skillId: string | number): Promise<void> {
    if (!skillId) {
      throw new Error("ID Keahlian dibutuhkan untuk proses penghapusan.");
    }
    
    try {
      // await apiClient.delete(`/candidate/profile/skills/${skillId}`);

      // --- Mock Data untuk Development ---
      console.log(`Menghapus keahlian dengan ID: ${skillId}`);
      await new Promise(resolve => setTimeout(resolve, 500));
      return Promise.resolve();
      // --- Akhir Mock Data ---

    } catch (error: unknown) {
      console.error(`Error removing skill ${skillId} from profile:`, error);
      if (error instanceof AxiosError && error.response?.status === 404) {
        throw new Error('Keahlian tidak ditemukan di profil Anda.');
      }
      throw new Error('Gagal menghapus keahlian dari profil.');
    }
  }
}

/**
 * Instance singleton dari SkillService untuk digunakan di seluruh aplikasi.
 */
export const skillService = new SkillService();
