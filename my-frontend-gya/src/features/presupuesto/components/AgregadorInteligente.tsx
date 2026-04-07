'use client';

import { useState } from 'react';
import { Sparkles, Plus, Loader2 } from 'lucide-react';

interface AgregadorInteligenteProps {
  onAnalyze: (type: string, prompt: string) => Promise<void>;
  isAnalyzing: boolean;
}

const PRODUCTO_TIPOS = [
  { id: 'VENTANA', label: 'Ventana', icon: '🪟' },
  { id: 'MAMPARA', label: 'Mampara', icon: '🚪' },
  { id: 'DUCHA', label: 'Puerta Ducha', icon: '🚿' },
  { id: 'CRISTAL', label: 'Cristal Temblado', icon: '💎' },
  { id: 'ARENADO', label: 'Servicio Arenado', icon: '✨' },
];

export default function AgregadorInteligente({ onAnalyze, isAnalyzing }: AgregadorInteligenteProps) {
  const [type, setType] = useState('VENTANA');
  const [prompt, setPrompt] = useState('');

  const handleAction = async () => {
    if (!prompt.trim()) return;
    await onAnalyze(type, prompt);
    setPrompt('');
  };

  return (
    <div className="bg-[#1a1c1e] text-white rounded-3xl p-8 shadow-2xl overflow-hidden relative group">
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-gna-blue)] opacity-10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-gna-red)] opacity-10 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 rounded-2xl border border-blue-500/20">
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Input Mágico
            </h3>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 bg-gray-800/50 px-2.5 py-1 rounded-full border border-gray-700/50">
            Powered by Gemma IA
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {PRODUCTO_TIPOS.map((item) => (
            <button
              key={item.id}
              onClick={() => setType(item.id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-300 ${
                type === item.id
                  ? 'bg-blue-600 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)] scale-105 z-10'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-[10px] font-black uppercase tracking-tight opacity-90">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isAnalyzing}
            placeholder='Ej: "Ventana nova 1500x1200 cristal 6mm incoloro natural 2 hojas corredizas"'
            className="w-full h-32 bg-gray-900/50 border border-white/10 rounded-2xl p-5 text-sm font-light text-gray-200 placeholder:text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none leading-relaxed"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) handleAction();
            }}
          />
          <button
            onClick={handleAction}
            disabled={isAnalyzing || !prompt.trim()}
            className="absolute bottom-4 right-4 flex items-center gap-2 px-6 py-3 bg-[var(--color-gna-red)] hover:bg-[#ff0000] text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:scale-100 shadow-lg"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analizando...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Agregar Producto
              </>
            )}
          </button>
        </div>
        
        <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest font-medium">
          PROMPT: Escribe dimensiones, sistema y tipo de cristal para que la IA genere el presupuesto instantáneamente.
        </p>
      </div>
    </div>
  );
}
