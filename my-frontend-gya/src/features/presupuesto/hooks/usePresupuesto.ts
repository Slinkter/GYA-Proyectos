'use client';

import { useState, useEffect } from 'react';
import { Presupuesto as PresupuestoType, ProductoItem, DiagramaSVG } from '../types/presupuesto.types';
import { presupuestoApi } from '@/api/api';
import { toast } from 'react-hot-toast';

const generateId = () => Math.random().toString(36).substring(2, 9);

export function usePresupuesto(initial?: Partial<PresupuestoType>) {
  const [presupuestos, setPresupuestos] = useState<PresupuestoType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchPresupuestos() {
      try {
        const data = await presupuestoApi.getAll();
        if (Array.isArray(data)) {
          setPresupuestos(data as PresupuestoType[]);
        }
      } catch {
        toast.error('Error cargando presupuestos');
      } finally {
        setIsLoading(false);
      }
    }
    fetchPresupuestos();
  }, []);
  
  const [data, setData] = useState<PresupuestoType>({
    numero: initial?.numero || '',
    fecha: initial?.fecha || new Date().toLocaleDateString('es-PE'),
    cliente: initial?.cliente || '',
    ruc: initial?.ruc || '',
    obra: initial?.obra || '',
    direccion: initial?.direccion || '',
    tipoServicio: initial?.tipoServicio || 'Servicio de Venta',
    productos: initial?.productos || [{ id: generateId(), producto: '', descripcion: '', cantidad: 1, total: 0 }],
    diagramas: initial?.diagramas || [],
    incluyeIgv: initial?.incluyeIgv ?? true,
    totalBruto: initial?.totalBruto || 0,
    descuento: initial?.descuento || 0,
    totalNeto: initial?.totalNeto || 0,
    tiempoEntrega: initial?.tiempoEntrega || '3-4 días hábiles',
  });
  
  const updateField = <K extends keyof PresupuestoType>(
    key: K,
    value: PresupuestoType[K]
  ) => setData(prev => ({ ...prev, [key]: value }));
  
  const addProducto = () =>
    setData(prev => ({
      ...prev,
      productos: [
        ...prev.productos,
        { id: generateId(), producto: '', descripcion: '', cantidad: 1, total: 0 }
      ]
    }));
  
  const updateProducto = (id: string, changes: Partial<ProductoItem>) =>
    setData(prev => ({
      ...prev,
      productos: prev.productos.map(p => p.id === id ? { ...p, ...changes } : p)
    }));
  
  const removeProducto = (id: string) => {
    if (data.productos.length > 1) {
      setData(prev => ({
        ...prev,
        productos: prev.productos.filter(p => p.id !== id)
      }));
    }
  };
  
  const addDiagrama = () =>
    setData(prev => ({
      ...prev,
      diagramas: [
        ...prev.diagramas,
        { id: generateId(), titulo: '', subtitulo: '', svgCode: '', precio: 0 }
      ]
    }));
  
  const updateDiagrama = (id: string, changes: Partial<DiagramaSVG>) =>
    setData(prev => ({
      ...prev,
      diagramas: prev.diagramas.map(d => d.id === id ? { ...d, ...changes } : d)
    }));
  
  const removeDiagrama = (id: string) =>
    setData(prev => ({
      ...prev,
      diagramas: prev.diagramas.filter(d => d.id !== id)
    }));
  
  const calcularTotales = () => {
    const subtotal = data.productos.reduce((sum, p) => sum + (p.total || 0), 0);
    const descuento = data.descuento || 0;
    const baseImponible = subtotal - descuento;
    
    let totalNeto;
    if (data.incluyeIgv) {
      const igv = baseImponible * 0.18;
      totalNeto = baseImponible + igv;
    } else {
      totalNeto = baseImponible;
    }
    
    setData(prev => ({ ...prev, totalBruto: subtotal, totalNeto }));
  };
  
  const guardar = async (): Promise<PresupuestoType | null> => {
    calcularTotales();
    try {
      // Transformar datos para el backend
      const payload = {
        obraNombre: data.obra,
        obraDireccion: data.direccion,
        tiempoEntrega: data.tiempoEntrega,
        clienteNombre: data.cliente,
        clienteRuc: data.ruc,
        incluyeIgv: data.incluyeIgv,
        subtotal: data.totalBruto,
        descuento: data.descuento,
        total: data.totalNeto,
        notas: data.notas,
        items: data.productos.map(p => ({
          producto: p.producto,
          sistema: p.sistema,
          descripcion: p.descripcion,
          altura: p.altura,
          ancho: p.ancho,
          cantidad: p.cantidad,
          precioUnitario: p.precioUnitario || (p.cantidad > 0 ? p.total / p.cantidad : 0),
          subtotal: p.total
        })),
        diagramas: data.diagramas.map(d => ({
          titulo: d.titulo,
          subtitulo: d.subtitulo,
          svgCode: d.svgCode,
          precio: d.precio,
          promptOriginal: d.promptOriginal
        }))
      };

      const saved = await presupuestoApi.create(payload as any);
      if (saved && typeof saved === 'object') {
        setPresupuestos(prev => [...prev, saved as PresupuestoType]);
      }
      toast.success('Presupuesto guardado correctamente');
      return saved as PresupuestoType | null;
    } catch {
      toast.error('Error al guardar el presupuesto');
      return null;
    }
  };
  
  return { 
    data,
    presupuestos,
    isLoading,
    updateField, 
    addProducto, 
    updateProducto, 
    removeProducto,
    addDiagrama,
    updateDiagrama,
    removeDiagrama,
    calcularTotales,
    guardar
  };
}
