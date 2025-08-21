'use client';

import React, { useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from '@/contexts/AuthContext'; // Sesuaikan path jika perlu
import { store } from '@/redux/store'; // Sesuaikan path jika perlu

export default function Providers({ children }: { children: React.ReactNode }) {
  // State untuk QueryClient, pastikan hanya dibuat sekali
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 menit
        refetchOnWindowFocus: false, // Opsional: matikan refetch saat window focus
      },
    },
  }));

  return (
    // Setiap provider membungkus provider berikutnya
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ReduxProvider>
  );
}