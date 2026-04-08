'use client';

import { useThemeStore } from '@/store/themeStore';
import { useEffect, useState, type ReactNode } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const isDark = useThemeStore((state) => state.isDark);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme-storage');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.state?.isDark) {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}

export function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg transition-all hover:scale-110 bg-[var(--color-gna-blue)] text-white"
      aria-label={isDark ? 'Modo claro' : 'Modo oscuro'}
    >
      {isDark ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
}