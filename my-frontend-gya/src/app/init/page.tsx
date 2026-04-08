'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

export default function InitPage() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    localStorage.clear();
    logout();
    const timeout = setTimeout(() => router.push('/login'), 1500);
    return () => clearTimeout(timeout);
  }, [router, logout]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-6 border-4 border-[var(--color-gna-blue)] border-t-transparent rounded-full animate-spin" />
        <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
          Reiniciando datos...
        </h1>
        <p className="text-gray-500 mt-2">Volviendo al inicio</p>
      </div>
    </div>
  );
}