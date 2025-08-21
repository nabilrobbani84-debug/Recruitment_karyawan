// src/app/(dashboard-employer)/layout.tsx
import DashboardLayout from '@/component/layout/DashboardLayout';
import { Building, PlusCircle, Briefcase, Search, Settings } from 'lucide-react';
// import { getCurrentUser } from '@/lib/session'; // Fungsi placeholder untuk mendapatkan user


export default async function EmployerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Definisikan item navigasi untuk dashboard perusahaan
  const employerNavItems = [
    { name: 'Profil Perusahaan', href: '/company-profile', icon: Building },
    { name: 'Posting Lowongan', href: '/post-job', icon: PlusCircle },
    { name: 'Kelola Lowongan', href: '/jobs', icon: Briefcase },
    { name: 'Cari Kandidat', href: '/candidates', icon: Search },
    { name: 'Pengaturan', href: '/settings', icon: Settings },
  ];

  // Di aplikasi nyata, Anda akan mendapatkan data user dari sesi
  // const user = await getCurrentUser();
  const mockUser = { id: 'comp-1', name: 'PT Teknologi Maju', email: 'hr@teknologimaju.com', role: 'employer' as const, profileImageUrl: '/images/company-logo-placeholder.png' };

  return (
    <DashboardLayout
      navItems={employerNavItems}
      user={mockUser}
      userRole="employer"
    >
      {children}
    </DashboardLayout>
  );
}