import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SvgService {
  private genAI: GoogleGenerativeAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY') || process.env.GEMINI_API_KEY || '';
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async generateSvg(descripcion: string) {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const SYSTEM_PROMPT = `
      Eres un ingeniero de diseño experto en dibujo técnico SVG.
      Genera ÚNICAMENTE el código SVG, sin explicaciones, sin markdown.
      Reglas:
      - viewBox="0 0 2000 1600"
      - Marco exterior: stroke-width="50" stroke="#000"
      - Hojas vidrio: fill="#ADD8E6" fill-opacity="0.4" stroke-width="25"
      - Hoja fija: texto "FIJO" font-size="120" fill="#003580" font-weight="bold"
      - Hoja corrediza: flechas → o ← font-size="150" fill="#003580"
      - Líneas de cota: stroke="#000" stroke-width="8" con medidas en mm
      - Output: SOLO el tag <svg>...</svg>, nada más
    `;

    const prompt = `${SYSTEM_PROMPT}\n\nDescripción: ${descripcion}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return {
      svgCode: text.trim(),
      promptUsado: prompt,
    };
  }
}
