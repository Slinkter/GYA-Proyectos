'use client';

import { Ventana } from '../types/presupuesto.types';

interface DiagramaVentanaProps {
  ventanas: Ventana[];
}

const getDescripcion = (tipo: string): string => {
  const descripciones: Record<string, string> = {
    corrediza: 'VENTANA CORREDIZA',
    batiente: 'VENTANA BATIENTE',
    fija: 'VENTANA FIJA',
    oscilobatiente: 'VENTANA OSCILOBATIENTE',
    panoramica: 'VENTANA PANORÁMICA',
    puerta: 'PUERTA DE BALCÓN',
  };
  return descripciones[tipo] || tipo;
};

function VentanaSVG({ tipo, ancho, alto }: { tipo: string; ancho: number; alto: number }) {
  const escala = 0.5;
  const w = Math.max(ancho * escala, 150);
  const h = Math.max(alto * escala, 120);
  const marco = 20;
  
  const colors: Record<string, string> = {
    corrediza: '#E0F7FA',
    batiente: '#E8F5E9',
    fija: '#FFF3E0',
    puerta: '#FCE4EC',
    panoramica: '#E8EAF6',
    oscilobatiente: '#F3E5F5',
  };
  
  const color = colors[tipo] || '#E0F7FA';
  
  return (
    <svg width={w + 60} height={h + 100} viewBox={`0 0 ${w + 60} ${h + 100}`} xmlns="http://www.w3.org/2000/svg">
      <rect width={w + 60} height={h + 100} fill="white" />
      
      <rect x={marco} y={marco} width={w} height={h} fill="none" stroke="#555555" strokeWidth="6" />
      
      <rect x={marco + 6} y={marco + 6} width={w - 12} height={h - 12} fill={color} stroke="#888888" strokeWidth="3" />
      
      {tipo === 'corrediza' && (
        <>
          <line x1={marco + w / 2} y1={marco + 6} x2={marco + w / 2} y2={h + marco - 6} stroke="#888888" strokeWidth="2" />
          <rect x={marco + 10} y={marco + 10} width={(w - 24) / 2} height={h - 20} fill={color} stroke="#888888" strokeWidth="2" opacity="0.7" />
          <rect x={marco + 10 + (w - 24) / 2 + 4} y={marco + 10} width={(w - 24) / 2} height={h - 20} fill={color} stroke="#888888" strokeWidth="2" opacity="0.7" />
          <rect x={marco + w / 2 - 6} y={h / 2 + marco - 15} width="12" height="30" rx="2" fill="#333333" />
        </>
      )}
      
      {tipo === 'batiente' && (
        <line x1={marco + 6} y1={h + marco - 6} x2={w + marco - 6} y2={h + marco - 6} stroke="#555555" strokeWidth="4" />
      )}
      
      {tipo === 'puerta' && (
        <rect x={w - 30 + marco} y={marco + 6} width="25" height={h - 12} fill={color} stroke="#888888" strokeWidth="2" opacity="0.6" />
      )}
      
      <line x1={marco} y1={h + marco + 25} x2={w + marco} y2={h + marco + 25} stroke="black" strokeWidth="2" />
      <path d={`M${marco} ${h + marco + 25} l15 -6 v12 z M${w + marco} ${h + marco + 25} l-15 -6 v12 z`} fill="black" />
      <text x={(w + 60) / 2} y={h + marco + 55} fontFamily="Arial" fontSize="14" textAnchor="middle" fontWeight="bold">{ancho} mm</text>

      <line x1="18" y1={marco} x2="18" y2={h + marco} stroke="black" strokeWidth="2" />
      <path d={`M18 ${marco} l-6 15 h12 z M18 ${h + marco} l-6 -15 h12 z`} fill="black" />
      <text x="15" y={(h + 100) / 2} fontFamily="Arial" fontSize="14" textAnchor="middle" fontWeight="bold" transform={`rotate(-90, 15, ${(h + 100) / 2})`}>{alto} mm</text>
      
      <text x={(w + 60) / 2} y="35" fontFamily="Arial" fontSize="12" textAnchor="middle" fill="#555555">{getDescripcion(tipo)} - SERIE 20</text>
    </svg>
  );
}

export function DiagramaVentana({ ventanas }: DiagramaVentanaProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {ventanas.map((ventana, index) => (
        <div key={index} className="flex flex-col items-center p-3 bg-white rounded-lg border border-gray-200">
          <div className="mb-2 text-sm font-medium text-gray-700">
            {getDescripcion(ventana.tipo)} - {ventana.ancho}x{ventana.alto} mm - Cantidad: {ventana.cantidad}
          </div>
          <div className="w-full max-w-md">
            <VentanaSVG tipo={ventana.tipo} ancho={ventana.ancho} alto={ventana.alto} />
          </div>
        </div>
      ))}
    </div>
  );
}
