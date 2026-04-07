'use client';
import { useState } from 'react';
import { authApi } from '@/api/api';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authApi.login(credentials);
      toast.success('Bienvenido');
      router.push('/');
    } catch {
      // Error handled in api.ts
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-gna-gray)]">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md w-96 border-t-4 border-[var(--color-gna-blue)]">
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 bg-[var(--color-gna-blue)] rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-xl">G&A</span>
          </div>
        </div>
        <h1 className="text-2xl font-black mb-6 text-center text-[var(--color-gna-blue)]">Iniciar Sesión</h1>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Usuario"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gna-blue)]"
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-gna-blue)]"
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full p-3 bg-[var(--color-gna-blue)] text-white font-bold rounded-lg hover:bg-[#002a5c] transition-all disabled:opacity-50"
          >
            {isLoading ? 'Ingresando...' : 'Entrar'}
          </button>
        </div>
      </form>
    </div>
  );
}
