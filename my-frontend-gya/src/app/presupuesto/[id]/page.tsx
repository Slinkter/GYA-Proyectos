'use client';

import { useParams } from 'next/navigation';
import { usePresupuesto } from '@/features/presupuesto/hooks/usePresupuesto';
import { PresupuestoPage1 } from '@/features/presupuesto/components/PresupuestoPage1';
import { PresupuestoPage2 } from '@/features/presupuesto/components/PresupuestoPage2';
import { A4PreviewLayout } from '@/shared/components/A4PreviewLayout';

export default function PresupuestoDetallePage() {
  const params = useParams();
  const { presupuestos } = usePresupuesto();
  
  const numero = decodeURIComponent(params.id as string);
  const presupuesto = presupuestos.find(p => p.numero === numero) || presupuestos[0];

  if (!presupuesto) {
    return <div className="p-8">Presupuesto no encontrado</div>;
  }

  return (
    <A4PreviewLayout>
      <PresupuestoPage1 presupuesto={presupuesto} />
      <PresupuestoPage2 presupuesto={presupuesto} />
    </A4PreviewLayout>
  );
}
