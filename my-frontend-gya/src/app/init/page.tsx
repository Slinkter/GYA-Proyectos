'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function InitPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem('presupuestos', '');
    const timeout = setTimeout(() => router.push('/'), 1500);
    return () => clearTimeout(timeout);
  }, [router]);

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