// src/components/auth/RegisterForm.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import InputField from '@/component/common/InputField';
import Button from '@/component/common/Button';
import { Mail, Lock, User, Briefcase, CheckSquare } from 'lucide-react';
// import { useAuth } from '@/hooks/useAuth';

export default function RegisterForm() {
  const router = useRouter();
  // const { register } = useAuth(); // Contoh penggunaan AuthContext
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState<'candidate' | 'employer'>('candidate');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setPasswordError('Password dan konfirmasi password tidak cocok.');
    } else {
      setPasswordError(null);
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (password && e.target.value !== password) {
      setPasswordError('Password dan konfirmasi password tidak cocok.');
    } else {
      setPasswordError(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok.');
      return;
    }
    if (!agreedToTerms) {
      setError('Anda harus menyetujui Syarat & Ketentuan untuk mendaftar.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setPasswordError(null);

    // TODO: Implementasi logika registrasi
    // Contoh:
    // try {
    //   await register({ fullName, email, password, accountType });
    //   router.push('/login?registration=success'); // Arahkan ke login dengan notifikasi
    // } catch (err: any) {
    //   setError(err.message || 'Registrasi gagal. Silakan coba lagi.');
    // } finally {
    //   setIsLoading(false);
    // }

    // Placeholder
    console.log('Register attempt:', { fullName, email, password, accountType });
    setTimeout(() => {
      alert('Registrasi Berhasil! (Placeholder). Silakan login.');
      router.push('/login');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      <InputField
        label="Nama Lengkap"
        name="fullName"
        type="text"
        Icon={User}
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="John Doe"
        required
      />
      <InputField
        label="Alamat Email"
        name="email"
        type="email"
        Icon={Mail}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="anda@email.com"
        required
      />
      <InputField
        label="Password"
        name="password"
        type="password"
        Icon={Lock}
        value={password}
        onChange={handlePasswordChange}
        placeholder="Minimal 8 karakter"
        required
        error={passwordError && password ? passwordError : undefined}
      />
      <InputField
        label="Konfirmasi Password"
        name="confirmPassword"
        type="password"
        Icon={Lock}
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        placeholder="Ulangi password"
        required
        error={passwordError && confirmPassword ? passwordError : undefined}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Saya mendaftar sebagai:
        </label>
        <div className="flex space-x-4">
          <Button
            type="button"
            variant={accountType === 'candidate' ? 'default' : 'outline'}
            onClick={() => setAccountType('candidate')}
            className="flex-1"
          >
            <User className="mr-2 h-5 w-5" /> Pencari Kerja
          </Button>
          <Button
            type="button"
            variant={accountType === 'employer' ? 'default' : 'outline'}
            onClick={() => setAccountType('employer')}
            className="flex-1"
          >
            <Briefcase className="mr-2 h-5 w-5" /> Perusahaan
          </Button>
        </div>
      </div>

      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="terms" className="font-medium text-gray-700">
            Saya setuju dengan{' '}
            <Link href="/terms-and-conditions" legacyBehavior>
              <a target="_blank" className="text-primary hover:underline">
                Syarat & Ketentuan
              </a>
            </Link>
          </label>
        </div>
      </div>

      <Button type="submit" className="w-full" isLoading={isLoading} disabled={!agreedToTerms || !!passwordError}>
        <CheckSquare className="mr-2 h-5 w-5" />
        Daftar Sekarang
      </Button>

      <p className="mt-6 text-center text-sm text-gray-600">
        Sudah punya akun?{' '}
        <Link href="/login" legacyBehavior>
          <a className="font-medium text-primary hover:text-primary-dark">
            Masuk di sini
          </a>
        </Link>
      </p>
    </form>
  );
}