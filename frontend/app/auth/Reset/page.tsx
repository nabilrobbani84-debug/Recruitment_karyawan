// src/app/(auth)/reset-password/page.tsx
// TODO: Buat komponen PasswordResetForm.tsx di src/components/auth/
// import PasswordResetForm from '@/components/auth/PasswordResetForm';
import AuthLayout from '@/component/layout/AuthLayout';
import Link from 'next/link';

export const metadata = {
  title: 'Reset Password - RecruitEasy',
};

// Placeholder komponen form, buat file sesungguhnya di src/components/auth/
const PasswordResetFormPlaceholder = ({ token }: { token?: string | string[] }) => (
 <div className="space-y-6">
    {token ? (
      <>
        <p className="text-gray-600 text-sm">
          Masukkan password baru Anda di bawah ini.
        </p>
        {/* TODO: Ganti dengan InputField yang sebenarnya */}
        <div>
          <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">Password Baru</label>
          <input id="new-password" type="password" className="w-full p-2 border border-gray-300 rounded-md" placeholder="••••••••" />
        </div>
        <div>
          <label htmlFor="confirm-new-password" className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password Baru</label>
          <input id="confirm-new-password" type="password" className="w-full p-2 border border-gray-300 rounded-md" placeholder="••••••••" />
        </div>
        {/* TODO: Ganti dengan Button yang sebenarnya */}
        <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors">
          Reset Password
        </button>
      </>
    ) : (
      <p className="text-red-600 text-sm text-center">
        Tautan reset password tidak valid atau telah kedaluwarsa.
      </p>
    )}
     <p className="mt-4 text-center text-sm">
      <Link href="/login" className="font-medium text-primary hover:text-primary-dark">
        Kembali ke Halaman Login
      </Link>
    </p>
  </div>
);


export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token?: string | string[] };
}) {
  const token = searchParams.token;

  return (
    <AuthLayout
      title="Atur Ulang Password Anda"
      subtitle={token ? "Buat password baru yang kuat." : "Tautan Tidak Valid"}
    >
      {/* <PasswordResetForm token={token} /> */}
      <PasswordResetFormPlaceholder token={token} /> {/* Ganti saat komponen asli dibuat */}
    </AuthLayout>
  );
}