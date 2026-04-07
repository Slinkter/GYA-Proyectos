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
    const totalBruto = data.productos.reduce((sum, p) => sum + (p.total || 0), 0);
    const descuento = data.descuento || 0;
    const igv = (totalBruto - descuento) * 0.18;
    const totalNeto = totalBruto - descuento + igv;
    setData(prev => ({ ...prev, totalBruto, totalNeto }));
  };
  
  const guardar = async (): Promise<PresupuestoType | null> => {
    calcularTotales();
    try {
      const saved = await presupuestoApi.create(data);
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
