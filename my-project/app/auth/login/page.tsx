// src/app/(auth)/login/page.tsx
import LoginForm from '@/component/auth/LoginForm';
import AuthLayout from '@/component/layout/AuthLayout';

export const metadata = {
  title: 'Masuk - RecruitEasy',
  description: 'Masuk ke akun RecruitEasy Anda.',
};

export default function LoginPage() {
  return (
    <AuthLayout
      title="Selamat Datang Kembali!"
      subtitle="Masuk untuk melanjutkan ke akun RecruitEasy Anda."
      // Anda bisa mengganti ilustrasi per halaman jika mau
      // illustration="/images/login-illustration.svg"
    >
      <LoginForm />
    </AuthLayout>
  );
}