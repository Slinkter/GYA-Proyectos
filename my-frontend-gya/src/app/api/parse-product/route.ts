import { NextResponse } from 'next/server';
import { SYSTEM_PROMPT_PARSER } from '@/features/presupuesto/prompts/parser';

export async function POST(req: Request) {
  try {
    const { type, prompt } = await req.json();

    // En una implementación real, aquí llamaríamos a Gemma / OpenAI / Anthropic
    // Usando el SYSTEM_PROMPT_PARSER y el prompt del usuario.
    
    // Simulación de respuesta IA basada en el prompt del usuario
    console.log('Analizando requerimiento con System Prompt:', SYSTEM_PROMPT_PARSER);
    
    // Lógica de parsing muy básica para el mock:
    const anchoMatch = prompt.match(/(\d+(?:\.\d+)?)\s*(?:m|cm|mm)/);
    const altoMatch = prompt.match(/x\s*(\d+(?:\.\d+)?)\s*(?:m|cm|mm)/);
    
    let ancho = 1500;
    let alto = 1200;
    
    if (anchoMatch) {
      const val = parseFloat(anchoMatch[1]);
      if (prompt.includes(' m')) ancho = val * 1000;
      else if (prompt.includes(' cm')) ancho = val * 10;
      else ancho = val;
    }
    
    if (altoMatch) {
      const val = parseFloat(altoMatch[1]);
      const postX = prompt.split('x')[1];
      if (postX.includes(' m')) alto = val * 1000;
      else if (postX.includes(' cm')) alto = val * 10;
      else alto = val;
    }

    const mockResponse = {
      producto: type,
      descripcion_formateada: `${type} Sistema Nova\n- Cristal Incoloro 6mm\n- Perfiles Natural\n- Accesorios`,
      datos_tecnicos: {
        ancho,
        alto,
        sistema: "Nova",
        cristal: "Incoloro 6mm",
        configuracion: {
          hojasCorredizas: 2,
          hojasFijas: 0,
          panosSuperiores: 0
        }
      },
      precio_sugerido_base: 0
    };

    return NextResponse.json(mockResponse);
  } catch {
    return NextResponse.json({ error: 'Error analizando' }, { status: 500 });
  }
}
