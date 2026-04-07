'use client';

import { Presupuesto } from '../types/presupuesto.types';
import Image from 'next/image';
import bbvaLogo from '@/shared/assets/bbva.svg';

interface DiagramaBlockProps {
  titulo: string;
  subtitulo: string;
  svgCode: string;
  precio: number;
}

function DiagramaBlock({ titulo, subtitulo, svgCode, precio }: DiagramaBlockProps) {
  return (
    <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
      <div className="text-[13px] font-bold text-[#003580] text-center mb-1">{titulo}</div>
      <div className="text-[11px] text-gray-600 text-center mb-2">{subtitulo}</div>
      <div dangerouslySetInnerHTML={{ __html: svgCode }} />
      <div className="text-[14px] text-[#003580] font-bold text-center mt-2">S/ {precio.toFixed(2)}</div>
    </div>
  );
}

export function PresupuestoPage2({ presupuesto }: { presupuesto: Presupuesto }) {
  const svgMampara = `
    <svg width="280" height="200" viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="200" fill="white" />
      <rect x="20" y="15" width="100" height="160" fill="#E0F7FA" stroke="#888" stroke-width="3" />
      <text x="70" y="95" font-family="Arial" font-size="14" text-anchor="middle" fill="#555" font-weight="bold">FIJO</text>
      <rect x="125" y="15" width="100" height="160" fill="#E0F7FA" stroke="#888" stroke-width="3" />
      <text x="175" y="95" font-family="Arial" font-size="18" text-anchor="middle" fill="#555">→</text>
      <rect x="230" y="15" width="30" height="160" fill="#E0F7FA" stroke="#888" stroke-width="3" />
      <text x="245" y="95" font-family="Arial" font-size="18" text-anchor="middle" fill="#555">→</text>
    </svg>
  `;

  const svgVentanaSala = `
    <svg width="300" height="200" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="200" fill="white" />
      <rect x="20" y="15" width="50" height="160" fill="#E0F7FA" stroke="#888" stroke-width="3" />
      <text x="45" y="95" font-family="Arial" font-size="10" text-anchor="middle" fill="#555" font-weight="bold">FIJO</text>
      <rect x="75" y="15" width="120" height="75" fill="#E0F7FA" stroke="#888" stroke-width="3" />
      <text x="135" y="55" font-family="Arial" font-size="16" text-anchor="middle" fill="#555">→</text>
      <rect x="200" y="15" width="60" height="75" fill="#E0F7FA" stroke="#888" stroke-width="3" />
      <text x="230" y="55" font-family="Arial" font-size="16" text-anchor="middle" fill="#555">→</text>
      <rect x="75" y="95" width="80" height="80" fill="#E0F7FA" stroke="#888" stroke-width="3" />
      <text x="115" y="140" font-family="Arial" font-size="12" text-anchor="middle" fill="#555" font-weight="bold">FIJO</text>
      <rect x="200" y="95" width="60" height="80" fill="#E0F7FA" stroke="#888" stroke-width="3" />
      <text x="230" y="140" font-family="Arial" font-size="12" text-anchor="middle" fill="#555" font-weight="bold">FIJO</text>
    </svg>
  `;

  const svgVentanaDorm1 = `
    <svg width="240" height="200" viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="200" fill="white" />
      <rect x="20" y="15" width="200" height="160" fill="#E0F7FA" stroke="#888" stroke-width="3" />
      <line x1="20" y1="95" x2="220" y2="95" stroke="#888" stroke-width="2" />
      <line x1="20" y1="35" x2="130" y2="155" stroke="white" stroke-width="3" opacity="0.6" />
      <text x="80" y="60" font-family="Arial" font-size="16" text-anchor="middle" fill="#555">→</text>
      <text x="80" y="140" font-family="Arial" font-size="14" text-anchor="middle" fill="#555" font-weight="bold">FIJO</text>
    </svg>
  `;

  const svgVentanaDorm2 = `
    <svg width="240" height="200" viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="200" fill="white" />
      <rect x="20" y="15" width="200" height="160" fill="#E0F7FA" stroke="#888" stroke-width="3" />
      <line x1="20" y1="95" x2="220" y2="95" stroke="#888" stroke-width="2" />
      <line x1="20" y1="35" x2="130" y2="155" stroke="white" stroke-width="3" opacity="0.6" />
      <text x="80" y="60" font-family="Arial" font-size="16" text-anchor="middle" fill="#555">→</text>
      <text x="80" y="140" font-family="Arial" font-size="14" text-anchor="middle" fill="#555" font-weight="bold">FIJO</text>
    </svg>
  `;

  const svgVentanaDorm3 = `
    <svg width="240" height="200" viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="200" fill="white" />
      <rect x="20" y="15" width="90" height="160" fill="#E0F7FA" stroke="#888" stroke-width="3" />
      <text x="65" y="95" font-family="Arial" font-size="16" text-anchor="middle" fill="#555">→</text>
      <rect x="115" y="15" width="90" height="160" fill="#E0F7FA" stroke="#888" stroke-width="3" />
      <text x="160" y="95" font-family="Arial" font-size="16" text-anchor="middle" fill="#555">←</text>
    </svg>
  `;

  const svgVentana = `
    <svg width="240" height="180" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="180" fill="white" />
      <rect x="20" y="15" width="90" height="150" fill="#E0F7FA" stroke="#888" stroke-width="3" />
      <text x="65" y="90" font-family="Arial" font-size="18" text-anchor="middle" fill="#555">→</text>
      <rect x="115" y="15" width="90" height="150" fill="#E0F7FA" stroke="#888" stroke-width="3" />
      <text x="160" y="90" font-family="Arial" font-size="18" text-anchor="middle" fill="#555">←</text>
    </svg>
  `;

  const svgVentanaComun = `
    <svg width="240" height="140" viewBox="0 0 240 140" xmlns="http://www.w3.org/2000/svg">
      <rect width="240" height="140" fill="white" />
      <rect x="20" y="15" width="200" height="110" fill="#E0F7FA" stroke="#888" stroke-width="3" />
    </svg>
  `;

  const defaultDiagramas = [
    { titulo: 'Mampara', subtitulo: 'Incoloro 8 mm', svgCode: svgMampara, precio: 1420.00 },
    { titulo: 'Ventana – Sala', subtitulo: 'Incoloro 6 mm y celosía', svgCode: svgVentanaSala, precio: 1050.00 },
    { titulo: 'Ventana – Dorm.1', subtitulo: 'Incoloro 6 mm', svgCode: svgVentanaDorm1, precio: 210.00 },
    { titulo: 'Ventana – Dorm.2', subtitulo: 'Incoloro 6 mm', svgCode: svgVentanaDorm2, precio: 210.00 },
    { titulo: 'Ventana – Dorm.3', subtitulo: 'Incoloro 6 mm', svgCode: svgVentanaDorm3, precio: 374.00 },
    { titulo: 'Ventana', subtitulo: 'Incoloro 6 mm', svgCode: svgVentana, precio: 144.00 },
    { titulo: 'Ventana – Común', subtitulo: 'Incoloro 6 mm', svgCode: svgVentanaComun, precio: 60.00 },
  ];

  const diagramas = presupuesto.diagramas?.length > 0 
    ? presupuesto.diagramas.map(d => ({ titulo: d.titulo, subtitulo: d.subtitulo, svgCode: d.svgCode || svgMampara, precio: d.precio }))
    : defaultDiagramas;

  return (
    <div className="bg-white w-[210mm] p-[18mm]">
      <div className="bg-white w-[210mm] p-[18mm] mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-start mb-[10px] border-b-[3px] border-[#cc0000] pb-2">
          <div className="flex-1">
            <div className="text-[12px] font-black tracking-[0.5px] uppercase font-[Arial]">
              EMPRESA ESPECIALIZADA EN VIDRIOS
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-[24px] font-[Arial] font-black text-[#003580] leading-none uppercase">
                CHALO REYES
              </h1>
              {/* Triángulo rojo doble decorativo */}
              <div className="flex gap-0.5">
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-[#CC0000]" />
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-[#CC0000]" />
              </div>
            </div>
            <div className="text-[18px] font-[Arial] font-black text-[#cc0000] mt-1">
              PRESUPUESTO NRO {presupuesto.numero}
            </div>
            <div className="text-[11px] mt-2 font-serif text-black leading-tight">
              Dirección: Av. Los Fresnos MZ. H LT.16 &nbsp;&nbsp;&nbsp;&nbsp; R.U.C<br />
              Contacto: 998-225-739 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 20606432870<br />
              N° 008-2025
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <svg viewBox="0 0 100 100" width="70" height="65">
              <polygon points="50,5 95,90 5,90" fill="none" stroke="#CC0000" strokeWidth="4"/>
              <polygon points="50,20 80,78 20,78" fill="none" stroke="#CC0000" strokeWidth="2.5"/>
              <line x1="35" y1="55" x2="65" y2="55" stroke="#CC0000" strokeWidth="2"/>
              <line x1="40" y1="45" x2="60" y2="45" stroke="#CC0000" strokeWidth="2"/>
              <line x1="50" y1="30" x2="50" y2="70" stroke="#CC0000" strokeWidth="1.5"/>
            </svg>
          </div>
        </div>

        {/* DIAGRAMAS */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          {diagramas.map((diagrama, idx) => (
            <DiagramaBlock key={idx} {...diagrama} />
          ))}
        </div>

        {/* FOOTER BANK */}
        <div className="mt-auto pt-2 border-t-[3px] border-[#cc0000] flex justify-between">
          <div className="flex flex-col">
            <div className="text-[12px] font-black text-[#003580] font-[Arial] uppercase tracking-wide">
              CHALO REYES
            </div>
            <div className="flex gap-4 mt-1">
              <div className="text-[11px] font-bold text-gray-800">
                <span className="text-[#cc0000]">SOLES:</span> 0011-0106-0100041622
              </div>
              <div className="text-[11px] font-bold text-gray-800">
                <span className="text-[#cc0000]">C.C.I:</span> 011-106-000100041622-20
              </div>
            </div>
          </div>
          <div>
            <Image src={bbvaLogo} alt="BBVA" width={80} height={24} className="object-contain grayscale contrast-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
