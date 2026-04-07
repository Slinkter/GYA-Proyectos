'use client';

import { ProductoItem } from '../types/presupuesto.types';
import { Trash2 } from 'lucide-react';

interface ListadoItemsProps {
  productos: ProductoItem[];
  diagramas?: any[]; // Añadimos diagramas
  onUpdate: (id: string, changes: Partial<ProductoItem>) => void;
  onRemove: (id: string) => void;
}

export default function ListadoItems({ productos, diagramas = [], onUpdate, onRemove }: ListadoItemsProps) {
  if (productos.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1.5 h-6 bg-[var(--color-gna-blue)] rounded-full" />
        <h2 className="text-lg font-black tracking-tight text-gray-900 uppercase font-[Arial]">
          Ítems del Presupuesto
        </h2>
        <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
          {productos.length}
        </span>
      </div>

      <div className="grid gap-4">
        {productos.map((item, index) => {
          // Intentar encontrar el diagrama correspondiente
          const diagrama = diagramas[index] || null;

          return (
            <div 
              key={item.id} 
              className="group relative bg-white rounded-2xl border border-gray-100 p-5 shadow-sm transition-all hover:shadow-md hover:border-blue-100/50 flex flex-col md:flex-row gap-6 items-center"
            >
              {/* Visual Preview */}
              <div className="w-24 h-24 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center overflow-hidden p-1">
                {diagrama?.svgCode ? (
                  <div 
                    className="w-full h-full [&>svg]:w-full [&>svg]:h-full" 
                    dangerouslySetInnerHTML={{ __html: diagrama.svgCode }} 
                  />
                ) : (
                  <span className="text-[10px] text-gray-300 font-bold uppercase text-center">Sin Diagrama</span>
                )}
              </div>

              {/* Info Section */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item.producto}
                    onChange={(e) => onUpdate(item.id, { producto: e.target.value })}
                    className="text-sm font-black text-[var(--color-gna-blue)] uppercase tracking-tight bg-transparent border-none p-0 focus:ring-0 w-32"
                  />
                  <div className="h-4 w-[1px] bg-gray-200" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    ID: {item.id.slice(0,4)}
                  </span>
                </div>

                <textarea
                  value={item.descripcion}
                  onChange={(e) => onUpdate(item.id, { descripcion: e.target.value })}
                  className="w-full text-xs text-gray-600 bg-transparent border-none p-0 focus:ring-0 resize-none h-16 leading-relaxed font-normal italic"
                  placeholder="Descripción del sistema, cristales y accesorios..."
                />
              </div>

              {/* Actions & Pricing */}
              <div className="flex flex-row md:flex-col items-center md:items-end gap-3 min-w-[120px]">
                <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg">
                  <button 
                    onClick={() => onUpdate(item.id, { cantidad: Math.max(1, item.cantidad - 1) })}
                    className="w-6 h-6 flex items-center justify-center bg-white border border-gray-100 rounded text-xs hover:bg-gray-50 active:scale-95 transition-all text-gray-600"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.cantidad}
                    onChange={(e) => onUpdate(item.id, { cantidad: Number(e.target.value) })}
                    className="w-8 text-center text-xs font-bold bg-transparent border-none p-0 focus:ring-0"
                  />
                  <button 
                    onClick={() => onUpdate(item.id, { cantidad: item.cantidad + 1 })}
                    className="w-6 h-6 flex items-center justify-center bg-white border border-gray-100 rounded text-xs hover:bg-gray-50 active:scale-95 transition-all text-gray-600"
                  >
                    +
                  </button>
                </div>

                <div className="relative group/price">
                  <span className="absolute -top-4 right-0 text-[9px] font-black text-gray-400 uppercase tracking-widest opacity-0 group-hover/price:opacity-100 transition-all">
                    Monto Total Item
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-gray-900">S/</span>
                    <input
                      type="number"
                      value={item.total}
                      onChange={(e) => onUpdate(item.id, { total: Number(e.target.value) })}
                      className="w-24 text-right text-lg font-black text-gray-900 bg-transparent border-none p-0 focus:ring-0"
                    />
                  </div>
                </div>

                <button 
                  onClick={() => onRemove(item.id)}
                  className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
