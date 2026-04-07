export interface ProductoItem {
  id: string;
  producto: string;      // "VENTANA" | "MAMPARA" | "ARENADO" | "SERVICIO"
  descripcion: string;   // puede incluir saltos de línea con \n
  cantidad: number;
  precioUnitario?: number;
  subtotal?: number;
  total: number;         // Campo legado/calculado
  altura?: number;
  ancho?: number;
  sistema?: string;
}

export interface DiagramaSVG {
  id: string;
  titulo: string;        // "Mampara" | "Ventana – Sala"
  subtitulo: string;     // "Incoloro 8 mm"
  svgCode: string;       // SVG completo generado por el prompt técnico
  precio: number;
  promptOriginal?: string;
}

export interface Presupuesto {
  numero: string;        // "03-000020"
  fecha: string;         // "28 de marzo del 2026"
  cliente: string;       // "GRUPO DYM CONSTRUCTORA E INMOBILIARIA SAC"
  ruc: string;           // "20550506352"
  obra: string;          // "Sierra Negra"
  direccion: string;     // "Calle Sierra Negra - ATE"
  tipoServicio: string;  // "Servicio de Venta" | "Servicio de Arenado"
  productos: ProductoItem[];
  incluyeIgv: boolean;   // Nuevo campo
  totalBruto: number;
  descuento: number;     // 0 si no hay descuento
  totalNeto: number;
  tiempoEntrega: string; // "3-4 días hábiles (*)"
  diagramas: DiagramaSVG[];
  notas?: string;
}

export interface SVGParams {
  ancho: number;
  alto: number;
  unidades?: string; // default "mm"
}

export interface VentanaParams extends SVGParams {
  hojasCorredizas: number;
  hojasFijas: number;
  panosSuperiores?: number;
  celosiaLateral?: boolean;
}

export interface MamparaParams extends SVGParams {
  hojasCorredizas: number;
  hojasFijas: number;
}

export interface Ventana {
  id: string;
  tipo: 'corrediza' | 'batiente' | 'fija' | 'oscilobatiente' | 'panoramica';
  ancho: number;
  alto: number;
  hojas: number;
  cantidad?: number;
}
