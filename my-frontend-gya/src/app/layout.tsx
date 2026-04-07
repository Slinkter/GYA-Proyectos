import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "G&A - Glass & Aluminum Company",
  description: "Sistema de Presupuestos - Glass & Aluminum Company S.A.C.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}

