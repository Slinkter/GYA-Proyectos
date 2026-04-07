'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePresupuesto } from '@/features/presupuesto/hooks/usePresupuesto';
import FormCabecera from '@/features/presupuesto/components/FormCabecera';
import AgregadorInteligente from '@/features/presupuesto/components/AgregadorInteligente';
import ListadoItems from '@/features/presupuesto/components/ListadoItems';
import { FileText, Save, X, Printer, Calculator, Sparkles } from 'lucide-react';
import { generateTechnicalSVG } from '@/features/presupuesto/utils/svgGenerator';

export default function NuevoPresupuestoPage() {
  const router = useRouter();
  const { 
    data, 
    updateField, 
    updateProducto, 
    removeProducto, 
    calcularTotales,
    guardar 
  } = usePresupuesto();
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    calcularTotales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.productos, data.descuento]);

  const handleAnalyze = async (type: string, prompt: string) => {
    setIsAnalyzing(true);
    
    try {
      const res = await fetch('/api/parse-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, prompt })
      });
      
      const dataIA = await res.json();
      
      if (dataIA.error) {
        console.error('Error análisis:', dataIA.error);
        setIsAnalyzing(false);
        return;
      }

      const newId = Math.random().toString(36).substring(2, 9);
      const newProduct = {
        id: newId,
        producto: dataIA.producto,
        descripcion: dataIA.descripcion_formateada,
        cantidad: 1,
        total: dataIA.precio_sugerido_base || 0,
        ancho: dataIA.datos_tecnicos?.ancho,
        altura: dataIA.datos_tecnicos?.alto,
        sistema: dataIA.datos_tecnicos?.sistema
      };
      
      const updatedProductos = [...data.productos.filter(p => p.producto !== ''), newProduct];
      updateField('productos', updatedProductos);
      
      // Si hay datos técnicos, agregamos un diagrama
      if (dataIA.datos_tecnicos) {
        const svgCode = generateTechnicalSVG({
          tipo: dataIA.producto,
          ancho: dataIA.datos_tecnicos.ancho,
          alto: dataIA.datos_tecnicos.alto,
          configuracion: dataIA.datos_tecnicos.configuracion
        });

        const newDiagram = {
          id: Math.random().toString(36).substring(2, 9),
          titulo: `${dataIA.producto} – ${dataIA.datos_tecnicos.ancho}x${dataIA.datos_tecnicos.alto} mm`,
          subtitulo: dataIA.datos_tecnicos.cristal,
          svgCode: svgCode,
          precio: 0,
          promptOriginal: prompt
        };
        updateField('diagramas', [...data.diagramas, newDiagram]);
      }

    } catch (err) {
      console.error('Error de red analizando:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSave = async () => {
    const saved = await guardar();
    if (saved) {
      router.push(`/presupuesto/${saved.numero}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Dynamic Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50/20 via-white to-red-50/10 pointer-events-none" />

      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-[var(--color-gna-blue)] rounded-xl shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-900 tracking-tight uppercase font-[Arial]">
                Constructor de Presupuestos
              </h1>
              <p className="text-gray-400 text-sm">
                Chalo Reyes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-400 hover:text-gray-900 transition-all uppercase tracking-tighter"
            >
              <X className="w-4 h-4" />
              Descartar
            </button>
            <button
              onClick={handleSave}
              disabled={!data.cliente}
              className="flex items-center gap-2 px-6 py-2.5 bg-[var(--color-gna-blue)] text-white rounded-xl text-sm font-bold uppercase tracking-widest shadow-xl shadow-blue-900/10 hover:bg-black transition-all active:scale-95 disabled:opacity-30 disabled:scale-100"
            >
              <Save className="w-4 h-4" />
              Finalizar Presupuesto
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input Magic & Header Info */}
          <div className="lg:col-span-12 xl:col-span-5 space-y-8">
            <FormCabecera data={data} updateField={updateField} />
            <AgregadorInteligente onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
            
            {/* Totals Panel Bento Style */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between h-40 group hover:border-[var(--color-gna-red)] transition-all">
                <div className="p-2 bg-red-50 text-[var(--color-gna-red)] rounded-xl w-fit group-hover:scale-110 transition-transform">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Subtotal Bruto</span>
                  <p className="text-2xl font-black text-gray-900">S/ {data.totalBruto.toLocaleString()}</p>
                </div>
              </div>

              <div className="bg-[var(--color-gna-blue)] p-6 rounded-3xl shadow-xl flex flex-col justify-between h-40 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <div className="p-2 bg-white/10 text-white rounded-xl w-fit group-hover:rotate-12 transition-transform">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">Total Neto</span>
                  <p className="text-2xl font-black text-white">S/ {data.totalNeto.toLocaleString()}</p>
                </div>
              </div>

              <div className="col-span-2 bg-white px-6 py-4 rounded-2xl border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Vigencia: 15 días calendario</span>
                </div>
                <div className="flex items-center gap-4">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Descuento Especial</label>
                  <input
                    type="number"
                    value={data.descuento}
                    onChange={(e) => updateField('descuento', Number(e.target.value))}
                    className="w-24 text-right bg-blue-50 border-none rounded-lg text-sm font-black text-[var(--color-gna-blue)] focus:ring-1 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Items List */}
          <div className="lg:col-span-12 xl:col-span-7">
            <div className="bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-gray-100 p-8 min-h-[600px] shadow-sm relative">
              <ListadoItems 
                productos={data.productos.filter(p => p.producto !== '')} 
                diagramas={data.diagramas}
                onUpdate={updateProducto}
                onRemove={removeProducto}
              />
              
              {data.productos.filter(p => p.producto !== '').length === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10 opacity-40">
                  <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mb-4">
                    <Sparkles className="w-10 h-10 text-gray-300" />
                  </div>
                  <h4 className="text-lg font-black text-gray-400 uppercase tracking-tight mb-2">No hay productos aún</h4>
                  <p className="text-xs text-gray-400 max-w-[240px]">Usa el Input Mágico de la izquierda para agregar ventanas, mamparas o servicios.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
