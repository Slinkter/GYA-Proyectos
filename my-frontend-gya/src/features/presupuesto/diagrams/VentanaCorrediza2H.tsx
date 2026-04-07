'use client';

import BaseSVG from './BaseSVG';

interface VentanaCorrediza2HProps {
  ancho: number;
  alto: number;
}

export default function VentanaCorrediza2H({ ancho, alto }: VentanaCorrediza2HProps) {
  return (
    <BaseSVG ancho={ancho} alto={alto}>
      {/* División Central */}
      <line 
        x1="1000" 
        y1="200" 
        x2="1000" 
        y2="1400" 
        stroke="#000" 
        strokeWidth="25" 
      />

      {/* Hoja Izquierda */}
      <g>
        <rect 
          x="225" 
          y="225" 
          width="750" 
          height="1150" 
          fill="#ADD8E6" 
          fillOpacity="0.4" 
          stroke="#000" 
          strokeWidth="25" 
        />
        <text 
          x="600" 
          y="850" 
          fontSize="150" 
          textAnchor="middle" 
          fill="#003580" 
          fontWeight="bold"
        >
          →
        </text>
      </g>

      {/* Hoja Derecha */}
      <g>
        <rect 
          x="1025" 
          y="225" 
          width="750" 
          height="1150" 
          fill="#ADD8E6" 
          fillOpacity="0.4" 
          stroke="#000" 
          strokeWidth="25" 
        />
        <text 
          x="1400" 
          y="850" 
          fontSize="150" 
          textAnchor="middle" 
          fill="#003580" 
          fontWeight="bold"
        >
          ←
        </text>
      </g>
    </BaseSVG>
  );
}
