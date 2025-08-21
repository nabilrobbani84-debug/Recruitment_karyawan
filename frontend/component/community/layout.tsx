// src/app/community/layout.tsx
import Header from '@/component/layout/Header';

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}