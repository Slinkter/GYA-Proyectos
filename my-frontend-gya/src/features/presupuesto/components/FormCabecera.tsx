'use client';

import { Presupuesto } from '../types/presupuesto.types';

interface FormCabeceraProps {
  data: Presupuesto;
  updateField: <K extends keyof Presupuesto>(key: K, value: Presupuesto[K]) => void;
}

export default function FormCabecera({ data, updateField }: FormCabeceraProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-1.5 h-6 bg-[var(--color-gna-red)] rounded-full" />
        <h2 className="text-lg font-black tracking-tight text-gray-900 uppercase font-[Arial]">
          Datos del Presupuesto
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Nro Presupuesto</label>
          <input
            type="text"
            value={data.numero}
            onChange={(e) => updateField('numero', e.target.value)}
            placeholder="03-000000"
            className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-[var(--color-gna-blue)] transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Fecha de Emisión</label>
          <input
            type="text"
            value={data.fecha}
            onChange={(e) => updateField('fecha', e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-[var(--color-gna-blue)] transition-all"
          />
        </div>

        <div className="md:col-span-2 space-y-1.5">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Cliente / Empresa</label>
          <input
            type="text"
            value={data.cliente}
            onChange={(e) => updateField('cliente', e.target.value)}
            placeholder="Nombre completo o Razón Social"
            className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-[var(--color-gna-blue)] transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">R.U.C.</label>
          <input
            type="text"
            value={data.ruc}
            onChange={(e) => updateField('ruc', e.target.value)}
            placeholder="20XXXXXXXXX"
            className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-[var(--color-gna-blue)] transition-all"
          />
        </div>

        <div className="md:col-span-1 space-y-1.5">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Obra / Referencia</label>
          <input
            type="text"
            value={data.obra}
            onChange={(e) => updateField('obra', e.target.value)}
            placeholder="Nombre del proyecto"
            className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-[var(--color-gna-blue)] transition-all"
          />
        </div>

        <div className="md:col-span-2 space-y-1.5">
          <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">Dirección de Obra</label>
          <input
            type="text"
            value={data.direccion}
            onChange={(e) => updateField('direccion', e.target.value)}
            placeholder="Ubicación exacta"
            className="w-full px-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-[var(--color-gna-blue)] transition-all"
          />
        </div>

        <div className="flex items-center gap-3 px-1 pt-4">
          <label className="relative inline-flex items-center cursor-pointer group">
            <input 
              type="checkbox" 
              checked={data.incluyeIgv}
              onChange={(e) => updateField('incluyeIgv', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--color-gna-blue)]"></div>
            <span className="ms-3 text-xs font-black text-gray-500 uppercase tracking-tighter group-hover:text-[var(--color-gna-blue)] transition-colors">
              Incluir IGV (18%)
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
