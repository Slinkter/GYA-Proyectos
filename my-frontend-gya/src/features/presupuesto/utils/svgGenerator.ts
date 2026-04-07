/**
 * Generador de Diagramas SVG Técnicos para Chalo Reyes
 * Sigue las reglas de viewBox="0 0 2000 1600" y grosores de línea estandarizados.
 */

interface SVGGeneratorParams {
  tipo: string;
  ancho: number;
  alto: number;
  configuracion?: {
    hojasCorredizas?: number;
    hojasFijas?: number;
    panosSuperiores?: number;
  };
}

export function generateTechnicalSVG({ tipo, ancho, alto, configuracion }: SVGGeneratorParams): string {
  const VIEWBOX_W = 2000;
  const VIEWBOX_H = 1600;
  
  // Márgenes internos para las cotas
  const MARGIN_X = 200;
  const MARGIN_Y = 200;
  const DRAW_W = 1600;
  const DRAW_H = 1200;

  let content = '';

  // 1. Marco Exterior (OBLIGATORIO)
  content += `<rect x="${MARGIN_X}" y="${MARGIN_Y}" width="${DRAW_W}" height="${DRAW_H}" fill="none" stroke="#000" stroke-width="50"/>`;

  // 2. Lógica por tipo
  if (tipo.toUpperCase() === 'VENTANA' || tipo.toUpperCase() === 'MAMPARA') {
    const hojasCorredizas = configuracion?.hojasCorredizas || 2;
    const hojasFijas = configuracion?.hojasFijas || 0;
    const totalHojas = hojasCorredizas + hojasFijas;
    const hojaW = DRAW_W / totalHojas;

    for (let i = 0; i < totalHojas; i++) {
      const x = MARGIN_X + (i * hojaW);
      const isFijo = i < hojasFijas;
      
      // Vidrio
      content += `<rect x="${x + 25}" y="${MARGIN_Y + 25}" width="${hojaW - 50}" height="${DRAW_H - 50}" fill="#ADD8E6" fill-opacity="0.4" stroke="#000" stroke-width="25"/>`;
      
      if (isFijo) {
        content += `<text x="${x + hojaW/2}" y="${MARGIN_Y + DRAW_H/2 + 60}" font-size="120" text-anchor="middle" fill="#003580" font-weight="bold">FIJO</text>`;
      } else {
        // Flecha de dirección (alternada o según lógica)
        const arrow = (i % 2 === 0) ? '→' : '←';
        content += `<text x="${x + hojaW/2}" y="${MARGIN_Y + DRAW_H/2 + 60}" font-size="150" text-anchor="middle" fill="#003580" font-weight="bold">${arrow}</text>`;
      }

      // Línea divisoria entre hojas
      if (i > 0) {
        content += `<line x1="${x}" y1="${MARGIN_Y}" x2="${x}" y2="${MARGIN_Y + DRAW_H}" stroke="#000" stroke-width="25"/>`;
      }
    }
  }

  // 3. Cotas de Dimensiones
  // Ancho (Inferior)
  content += `
    <g>
      <line x1="${MARGIN_X}" y1="${MARGIN_Y + DRAW_H + 150}" x2="${MARGIN_X + DRAW_W}" y2="${MARGIN_Y + DRAW_H + 150}" stroke="#000" stroke-width="8"/>
      <polygon points="${MARGIN_X},${MARGIN_Y + DRAW_H + 150} ${MARGIN_X + 40},${MARGIN_Y + DRAW_H + 130} ${MARGIN_X + 40},${MARGIN_Y + DRAW_H + 170}" fill="#000"/>
      <polygon points="${MARGIN_X + DRAW_W},${MARGIN_Y + DRAW_H + 150} ${MARGIN_X + DRAW_W - 40},${MARGIN_Y + DRAW_H + 130} ${MARGIN_X + DRAW_W - 40},${MARGIN_Y + DRAW_H + 170}" fill="#000"/>
      <text x="${MARGIN_X + DRAW_W/2}" y="${MARGIN_Y + DRAW_H + 230}" font-size="80" text-anchor="middle" font-family="Arial" font-weight="bold">${ancho} mm</text>
    </g>
  `;

  // Alto (Lateral)
  content += `
    <g>
      <line x1="${MARGIN_X - 100}" y1="${MARGIN_Y}" x2="${MARGIN_X - 100}" y2="${MARGIN_Y + DRAW_H}" stroke="#000" stroke-width="8"/>
      <polygon points="${MARGIN_X - 100},${MARGIN_Y} ${MARGIN_X - 120},${MARGIN_Y + 40} ${MARGIN_X - 80},${MARGIN_Y + 40}" fill="#000"/>
      <polygon points="${MARGIN_X - 100},${MARGIN_Y + DRAW_H} ${MARGIN_X - 120},${MARGIN_Y + DRAW_H - 40} ${MARGIN_X - 80},${MARGIN_Y + DRAW_H - 40}" fill="#000"/>
      <text x="${MARGIN_X - 140}" y="${MARGIN_Y + DRAW_H/2}" font-size="80" text-anchor="middle" font-family="Arial" font-weight="bold" transform="rotate(-90, ${MARGIN_X - 140}, ${MARGIN_Y + DRAW_H/2})">${alto} mm</text>
    </g>
  `;

  return `<svg viewBox="0 0 ${VIEWBOX_W} ${VIEWBOX_H}" xmlns="http://www.w3.org/2000/svg">${content}</svg>`;
}
