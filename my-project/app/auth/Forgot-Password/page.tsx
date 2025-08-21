// src/app/(auth)/forgot-password/page.tsx
// TODO: Buat komponen PasswordResetRequestForm.tsx di src/components/auth/
// import PasswordResetRequestForm from '@/components/auth/PasswordResetRequestForm';
import AuthLayout from '@/component/layout/AuthLayout';
import Link from 'next/link';

export const metadata = {
  title: 'Lupa Password - RecruitEasy',
};

// Placeholder komponen form, buat file sesungguhnya di src/components/auth/
const PasswordResetRequestFormPlaceholder = () => (
  <div className="space-y-6">
    <p className="text-gray-600 text-sm">
      Masukkan alamat email yang terhubung dengan akun Anda. Kami akan mengirimkan tautan untuk mereset password Anda.
    </p>
    {/* TODO: Ganti dengan InputField yang sebenarnya */}
    <div>
      <label htmlFor="email-forgot" className="block text-sm font-medium text-gray-700 mb-1">Alamat Email</label>
      <input id="email-forgot" type="email" className="w-full p-2 border border-gray-300 rounded-md" placeholder="anda@email.com" />
    </div>
    {/* TODO: Ganti dengan Button yang sebenarnya */}
    <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors">
      Kirim Tautan Reset
    </button>
    <p className="mt-4 text-center text-sm">
      <Link href="/login" className="font-medium text-primary hover:text-primary-dark">
        Kembali ke Halaman Login
      </Link>
    </p>
  </div>
);


export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Lupa Password Anda?"
      subtitle="Jangan khawatir, kami akan membantu Anda."
    >
      {/* <PasswordResetRequestForm /> */}
      <PasswordResetRequestFormPlaceholder /> {/* Ganti saat komponen asli dibuat */}
    </AuthLayout>
  );
}