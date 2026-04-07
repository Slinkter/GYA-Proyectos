'use client';

import Link from 'next/link';
import { usePresupuesto } from '@/features/presupuesto/hooks/usePresupuesto';
import { Plus, FileText, Eye } from 'lucide-react';

export default function Home() {
  const { presupuestos } = usePresupuesto();

  return (
    <div className="min-h-screen bg-[var(--color-gna-gray)]">
      <header className="bg-white shadow-md border-b-4 border-[var(--color-gna-blue)]">
        <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[var(--color-gna-blue)] rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-[var(--color-gna-blue)] tracking-tight">
                PRESUPUESTOS G&A
              </h1>
              <p className="text-sm text-gray-500">Glass & Aluminum Company S.A.C.</p>
            </div>
          </div>
          <Link
            href="/nuevo"
            className="flex items-center gap-2 px-5 py-3 bg-[var(--color-gna-blue)] text-white font-bold rounded-lg hover:bg-[#002a5c] transition-all shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Nuevo Presupuesto
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-[var(--color-gna-light-blue)] px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-[var(--color-gna-blue)] uppercase tracking-wide">
              Lista de Presupuestos
            </h2>
          </div>
          
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-black text-[var(--color-gna-blue)] uppercase tracking-wider">
                  Número
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-[var(--color-gna-blue)] uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-[var(--color-gna-blue)] uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-[var(--color-gna-blue)] uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-[var(--color-gna-blue)] uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {presupuestos.length > 0 ? (
                presupuestos.map((presupuesto) => (
                  <tr key={presupuesto.numero} className="hover:bg-[var(--color-gna-light-blue)] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-[var(--color-gna-red)]">
                        #{presupuesto.numero}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {presupuesto.cliente}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {presupuesto.fecha}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-[var(--color-gna-blue)]">
                        S/ {presupuesto.totalNeto.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        href={`/presupuesto/${presupuesto.numero}`}
                        className="inline-flex items-center gap-1 text-sm font-bold text-[var(--color-gna-blue)] hover:text-[var(--color-gna-red)] transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        Ver Detalle
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <FileText className="w-12 h-12 text-gray-300" />
                      <p className="text-gray-500 font-medium">No hay presupuestos registrados</p>
                      <Link
                        href="/nuevo"
                        className="text-[var(--color-gna-blue)] font-bold hover:underline"
                      >
                        Crear el primer presupuesto →
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}