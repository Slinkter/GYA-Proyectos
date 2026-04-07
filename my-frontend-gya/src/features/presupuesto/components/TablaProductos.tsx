'use client';

import { ProductoItem } from '../types/presupuesto.types';

interface TablaProductosProps {
  productos: ProductoItem[];
}

export function TablaProductos({ productos }: TablaProductosProps) {
  return (
    <table className="w-full border-collapse mb-4">
      <thead>
        <tr>
          <th className="bg-blue-900 text-white font-arial text-xs font-bold py-2 px-3 border border-blue-800 text-center" style={{ width: '16%' }}>
            PRODUCTO
          </th>
          <th className="bg-blue-900 text-white font-arial text-xs font-bold py-2 px-3 border border-blue-800">
            DESCRIPCIÓN
          </th>
          <th className="bg-blue-900 text-white font-arial text-xs font-bold py-2 px-3 border border-blue-800 text-center" style={{ width: '10%' }}>
            CANT.
          </th>
          <th className="bg-blue-900 text-white font-arial text-xs font-bold py-2 px-3 border border-blue-800 text-center" style={{ width: '16%' }}>
            TOTAL
          </th>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto) => (
          <tr key={producto.id}>
            <td className="border border-gray-300 py-2 px-3 text-xs text-center">
              {producto.producto}
            </td>
            <td className="border border-gray-300 py-2 px-3 text-xs">
              <div className="font-bold">{producto.descripcion || 'Sistema nova'}</div>
            </td>
            <td className="border border-gray-300 py-2 px-3 text-xs text-center">
              {producto.cantidad}
            </td>
            <td className="border border-gray-300 py-2 px-3 text-xs text-right">
              S/ {producto.total.toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
