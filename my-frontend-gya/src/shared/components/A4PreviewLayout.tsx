'use client';

import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Link from 'next/link';

interface A4PreviewProps {
  children: React.ReactNode;
}

export function A4PreviewLayout({ children }: A4PreviewProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: 'Presupuesto',
    pageStyle: `
      @page {
        size: A4;
        margin: 18mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .page-break {
          page-break-before: always;
        }
      }
    `,
  });

  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <div className="min-h-screen bg-[#e8e8e8]">
      {/* Controls Bar */}
      <div className="fixed top-5 right-5 flex flex-col gap-2 z-50">
        <button
          onClick={() => handlePrint()}
          className="px-4 py-2 bg-[#003580] text-white rounded-md font-bold font-arial text-sm hover:bg-[#002060] transition-colors shadow-lg"
        >
          🖨️ Imprimir / PDF
        </button>
      </div>

      {/* Back Link */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
        >
          ← Volver a la lista
        </Link>
      </div>

      {/* Print Content */}
      <div ref={contentRef} className="flex flex-col items-center">
        {childrenArray.map((child, index) => (
          <div 
            key={index}
            className="bg-white w-[210mm] min-h-[297mm] mx-auto mb-4"
            style={{ pageBreakAfter: index < childrenArray.length - 1 ? 'always' : 'auto' }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
