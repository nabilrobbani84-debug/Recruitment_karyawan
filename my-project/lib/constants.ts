// src/lib/constants.ts

/**
 * Mendefinisikan tipe pekerjaan yang tersedia di platform.
 * Digunakan untuk filter pencarian dan form posting pekerjaan.
 */
export const JOB_TYPES = [
  { value: 'Full-time', label: 'Full-time' },
  { value: 'Part-time', label: 'Part-time' },
  { value: 'Contract', label: 'Kontrak' },
  { value: 'Internship', label: 'Magang' },
  { value: 'Freelance', label: 'Freelance' },
];

/**
 * Mendefinisikan periode gaji yang bisa dipilih.
 */
export const SALARY_PERIODS = [
  { value: 'Monthly', label: 'Per Bulan' },
  { value: 'Annually', label: 'Per Tahun' },
  { value: 'Hourly', label: 'Per Jam' },
];

/**
 * Mendefinisikan mata uang yang didukung.
 */
export const CURRENCIES = [
  { value: 'IDR', label: 'IDR' },
  { value: 'USD', label: 'USD' },
];

/**
 * Role pengguna di dalam sistem.
 */
export const USER_ROLES = {
  CANDIDATE: 'candidate',
  EMPLOYER: 'employer',
  ADMIN: 'admin',
};