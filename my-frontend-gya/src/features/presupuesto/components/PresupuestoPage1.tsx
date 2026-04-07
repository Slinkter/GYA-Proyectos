'use client';

import { Presupuesto } from '../types/presupuesto.types';

interface PresupuestoPage1Props {
  presupuesto: Presupuesto;
}

export function PresupuestoPage1({ presupuesto }: PresupuestoPage1Props) {
  return (
    <div className="bg-white w-[210mm] p-[18mm]">
        {/* HEADER */}
        <div className="flex justify-between items-start mb-[10px] border-b-[3px] border-[#cc0000] pb-2">
          <div className="flex-1">
            <div className="text-[12px] font-black tracking-[0.5px] uppercase font-[Arial]">
              EMPRESA ESPECIALIZADA EN VIDRIOS
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-[24px] font-[Arial] font-black text-[#003580] leading-none uppercase">
                CHALO REYES
              </h1>
              {/* Triángulo rojo doble decorativo */}
              <div className="flex gap-0.5">
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-[#CC0000]" />
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-[#CC0000]" />
              </div>
            </div>
            <div className="text-[18px] font-[Arial] font-black text-[#cc0000] mt-1">
              PRESUPUESTO NRO {presupuesto.numero}
            </div>
            <div className="text-[11px] mt-2 font-serif text-black leading-tight">
              Dirección: Av. Los Fresnos MZ. H LT.16 &nbsp;&nbsp;&nbsp;&nbsp; R.U.C<br />
              Contacto: 998-225-739 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 20606432870<br />
              N° 008-2025
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <svg viewBox="0 0 100 100" width="70" height="65">
              <polygon points="50,5 95,90 5,90" fill="none" stroke="#CC0000" strokeWidth="4"/>
              <polygon points="50,20 80,78 20,78" fill="none" stroke="#CC0000" strokeWidth="2.5"/>
              <line x1="35" y1="55" x2="65" y2="55" stroke="#CC0000" strokeWidth="2"/>
              <line x1="40" y1="45" x2="60" y2="45" stroke="#CC0000" strokeWidth="2"/>
              <line x1="50" y1="30" x2="50" y2="70" stroke="#CC0000" strokeWidth="1.5"/>
            </svg>
          </div>
        </div>

        {/* CLIENT INFO */}
        <div className="mb-[14px] mt-[10px]">
          <div className="grid grid-cols-[80px_1fr] gap-y-1 gap-x-2 text-[12px]">
            <span className="font-bold">CLIENTE:</span>
            <span>{presupuesto.cliente}</span>

            <span className="font-bold">FECHA:</span>
            <span>{presupuesto.fecha}</span>

            <span className="font-bold">R.U.C:</span>
            <span>{presupuesto.ruc}</span>

            <span className="font-bold">OBRA:</span>
            <span>{presupuesto.obra}</span>

            <span className="font-bold">DIRECCIÓN:</span>
            <span>{presupuesto.direccion}</span>
          </div>
        </div>

        {/* SERVICIO */}
        <div className="font-bold text-[13px] mb-2">Servicio de Venta</div>

        {/* TABLE */}
        <table className="w-full border-collapse mb-[14px]">
          <thead>
            <tr>
              <th className="bg-[#003580] text-white font-arial text-[12px] font-bold py-1.5 px-2.5 border border-[#002060] text-center w-[16%]">PRODUCTO</th>
              <th className="bg-[#003580] text-white font-arial text-[12px] font-bold py-1.5 px-2.5 border border-[#002060]">DESCRIPCIÓN</th>
              <th className="bg-[#003580] text-white font-arial text-[12px] font-bold py-1.5 px-2.5 border border-[#002060] text-center w-[10%]">CANT.</th>
              <th className="bg-[#003580] text-white font-arial text-[12px] font-bold py-1.5 px-2.5 border border-[#002060] text-right w-[16%]">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {presupuesto.productos.map((producto, idx) => (
              <tr key={producto.id} className={idx % 2 === 1 ? 'bg-[#f7f7f7]' : ''}>
                <td className="border border-[#bbb] py-1.5 px-2.5 text-[12px] text-center">{producto.producto}</td>
                <td className="border border-[#bbb] py-1.5 px-2.5 text-[12px] font-bold">
                  {producto.descripcion.split('\n').map((line, i) => (
                    <span key={i} className="font-normal block">{line}</span>
                  ))}
                </td>
                <td className="border border-[#bbb] py-1.5 px-2.5 text-[12px] text-center">{producto.cantidad}</td>
                <td className="border border-[#bbb] py-1.5 px-2.5 text-[12px] text-right">S/ {producto.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* COSTOS */}
        <div className="mb-3">
          <div className="font-bold text-[13px] mb-1">Costo del Presupuesto</div>
          <ul className="list-disc pl-[22px] text-[12px] leading-relaxed">
            <li>SUBTOTAL &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;S/ {presupuesto.totalBruto.toFixed(2)}</li>
            <li className="text-[#cc0000]">Descuento comercial (-) S/ {presupuesto.descuento.toFixed(2)}</li>
            {presupuesto.incluyeIgv && (
              <li>I.G.V. (18%) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;S/ {((presupuesto.totalBruto - presupuesto.descuento) * 0.18).toFixed(2)}</li>
            )}
            <li className="font-bold">TOTAL {presupuesto.incluyeIgv ? '(Incluye I.G.V.)' : '(No incluye I.G.V.)'} &nbsp;&nbsp;&nbsp;&nbsp;S/ {presupuesto.totalNeto.toFixed(2)}</li>
          </ul>
        </div>

        {/* TIEMPO */}
        <div className="mb-3">
          <div className="font-bold text-[13px] mb-1">Tiempo de Entrega</div>
          <ul className="list-disc pl-[22px] text-[12px] leading-relaxed">
            <li>Tiempo estimado para instalación: {presupuesto.tiempoEntrega} (*)</li>
          </ul>
        </div>

        {/* FORMA DE PAGO */}
        <div className="mb-3">
          <div className="font-bold text-[13px] mb-1">Forma De Pago</div>
          <ul className="list-disc pl-[22px] text-[12px] leading-relaxed">
            <li><strong>Anticipo:</strong> Para iniciar los trabajos, se deberá abonar un anticipo equivalente al <strong>50% del monto total</strong>.</li>
            <li><strong>Finiquito:</strong> El saldo restante se abonará al finalizar el trabajo.</li>
          </ul>
        </div>

        {/* CONDICIONES */}
        <div className="mb-3">
          <div className="font-bold text-[13px] mb-1">Condiciones y política:</div>
          <ul className="list-disc pl-[22px] text-[12px] leading-relaxed">
            <li><strong>Días hábiles</strong>: Son días hábiles, los comprendidos de lunes a viernes, sin considerar feriados o festivos.</li>
            <li><strong>Plazo de entrega</strong>: El plazo estimado de entrega y/o instalación será especificado en el presupuesto. Este plazo está sujeto a cambios según disponibilidad de materiales y condiciones externas.</li>
            <li><strong>Validez del presupuesto</strong>: La oferta del presupuesto tiene una validez de 2 días hábiles al momento de ser presentado.</li>
          </ul>
        </div>

        {/* FIRMAS */}
        <div className="flex justify-between mt-[30px] pt-2">
          <div className="w-[44%] text-center">
            <div className="border-t border-gray-800 mb-1"></div>
            <div className="text-[10px]">Cliente</div>
          </div>
          <div className="w-[44%] text-center">
            <div className="border-t border-gray-800 mb-1"></div>
            <div className="text-[11px] font-bold">Juan Carlos Cueva Carrasco</div>
            <div className="text-[10px]">Gerente General – G&amp;A Company S.A.C.</div>
          </div>
        </div>

        {/* FOOTER BANK */}
        <div className="mt-[30mm] pt-2 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex font-[Arial] font-[900] text-white text-[14px]">
              <span className="bg-[#004481] px-1">B</span>
              <span className="bg-[#1464a0] px-1">B</span>
              <span className="bg-[#009DE0] px-1">VA</span>
            </div>
            <div className="h-6 w-[1px] bg-gray-300" />
            <div className="text-[10px] leading-relaxed text-black font-serif">
              <strong className="font-[Arial] font-black text-[#003580] uppercase">CHALO REYES</strong><br />
              <div className="grid grid-cols-[50px_1fr] gap-x-2">
                <span>SOLES</span>
                <span>: 0011-0106-0100041622</span>
                <span>C.C.I.</span>
                <span>: 011-106-000100041622-20</span>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
