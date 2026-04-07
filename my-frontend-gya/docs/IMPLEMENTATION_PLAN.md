# Plan de Implementación: Sistema de Presupuestos G&A

Este plan detalla las fases para completar el sistema de presupuestos siguiendo el **PLAN_MAESTRO_APP.md** y los estándares de **PRESUPUESTO_MASTER.md**.

## Fase 1: Rediseño UX (Input Mágico) 🏗️
*   **Objetivo**: Sustituir el formulario extendido por una interfaz compacta y potente.
*   **Componentes a crear/modificar**:
    *   `src/app/nuevo/page.tsx`: Implementar layout Bento Grid.
    *   `FormCabecera.tsx`: Datos del cliente compactos.
    *   `AgregadorInteligente.tsx`: El "Input Mágico" (Select + Textarea Prompt).
    *   `ListadoItems.tsx`: Tarjetas de edición rápida.

## Fase 2: Motor Genético SVG 🧬
*   **Objetivo**: Componentes React que dibujan SVGs perfectos basados en parámetros.
*   **Componentes**:
    *   `DiagramaVentana.tsx`: Parametrizar con `ancho`, `alto`, `hojas`, `fijos`.
    *   `DiagramaMampara.tsx`: Nuevo componente para mamparas (3 hojas, etc).
    *   `DiagramaDucha.tsx`: Nuevo componente para puertas de ducha.

## Fase 3: Cerebro IA + Estado Global 🧠
*   **Objetivo**: Conectar el "Input Mágico" con el Backend.
*   **Tareas**:
    *   `src/app/api/parse-product/route.ts`: Endpoint que invoca a la IA.
    *   **Prompt System**: Definición técnica del prompt para extraer JSON de texto natural.
    *   Integración con `usePresupuesto` para inserción instantánea.

## Fase 4: Exportación y Cierre 🖨️
*   **Objetivo**: Generación de documentos listos para imprimir.
*   **Tareas**:
    *   Ajuste final de estilos `@media print`.
    *   Integración de logos y footers obligatorios en todas las páginas.
    *   Pruebas de renderizado en A4.

---

> [!IMPORTANT]
> Se priorizará la estética PREMIUM solicitada, evitando placeholders y usando animaciones sutiles de Tailwind 4.
