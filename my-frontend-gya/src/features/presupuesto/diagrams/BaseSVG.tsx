'use client';

import { ReactNode } from 'react';

interface BaseSVGProps {
  ancho: number;
  alto: number;
  children: ReactNode;
}

export default function BaseSVG({ ancho, alto, children }: BaseSVGProps) {
  return (
    <svg 
      viewBox="0 0 2000 1600" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto drop-shadow-md"
    >
      {/* Marco Exterior */}
      <rect 
        x="200" 
        y="200" 
        width="1600" 
        height="1200" 
        fill="none" 
        stroke="#000" 
        strokeWidth="50" 
      />

      {/* Contenido (Vidrios, Divisores, etc) */}
      {children}

      {/* Cota Ancho (Inferior) */}
      <g>
        <line x1="200" y1="1450" x2="1800" y2="1450" stroke="#000" strokeWidth="8" />
        <polygon points="200,1450 240,1430 240,1470" fill="#000" />
        <polygon points="1800,1450 1760,1430 1760,1470" fill="#000" />
        <text 
          x="1000" 
          y="1530" 
          fontSize="80" 
          fontFamily="Arial" 
          textAnchor="middle" 
          fontWeight="bold"
        >
          {ancho} mm
        </text>
      </g>

      {/* Cota Alto (Lateral Izquierdo) */}
      <g>
        <line x1="100" y1="200" x2="100" y2="1400" stroke="#000" strokeWidth="8" />
        <polygon points="100,200 80,240 120,240" fill="#000" />
        <polygon points="100,1400 80,1360 120,1360" fill="#000" />
        <text 
          x="60" 
          y="800" 
          fontSize="80" 
          fontFamily="Arial" 
          textAnchor="middle" 
          fontWeight="bold" 
          transform="rotate(-90, 60, 800)"
        >
          {alto} mm
        </text>
      </g>
    </svg>
  );
}
