# Plan Maestro: Web App Generadora de Presupuestos (G&A Company)

Este documento define la visión arquitectónica, la estrategia UX/UI y el marco técnico de integración con Inteligencia Artificial para el desarrollo interactivo de presupuestos de la compañía. Se enfoca en mitigar errores humanos y respetar de forma absoluta las reglas institucionales.

## 1. Experiencia de Usuario (UX) e Interfaz (UI)

- **Ruta principal de origen:** `/presupuesto/nuevo`
- **Estilo de Diseño:** Moderno, veloz y limpio. Implementaremos **Tailwind CSS v4** usando componentes modulares tipo tarjeta (Bento Grid) o formularios segmentados para evitar el agotamiento cognitivo tipo "hoja de cálculo".
- **Flujo Operativo Lineal:**
    1. **Datos de Cabecera:** Interfaz compacta para ingresar (Cliente, RUC, Obra, Dirección). La fecha de generación se bloquea asumiendo la actual por defecto.
    2. **El "Input Mágico" (Product Builder):** Descartamos docenas de minúsculos inputs. El usuario dispondrá de:
        - Un `<select>` rápido (Ventana, Mampara, Ducha, Cristal, Otros).
        - Un `textarea` (prompt) grande donde volcar el requerimiento sin importar su formato (ej: _"ventana de 1500x1200 cristal incoloro 6mm nova 2 hojas corredizas con paño fijo superior"_).
    3. **Digestión de IA:** Un botón de "Agregar / Analizar" hace la magia usando LLM y baja esto al sistema en formato paramétrico para renderizar instantáneamente el diagrama en pantalla.
    4. **Tarjetas de Modificación Continua:** Los productos validados se enfilan verticalmente. Cada tarjeta permite ajustar el diagrama y sobre todo, poner el **Precio Unitario Final**.
    5. **Panel Contable y Cierre:** Editores enriquecidos para inyectar Descuentos, editar Tiempos de Entrega y Formas de Pago. Todo se autocalcula (Subtotal, IGV, Total) sin intervención del usuario.
    6. **Aprobación Final:** Botón masivo para "Previsualizar/Imprimir" que expone la obra generada.

---

## 2. Estrategia Algorítmica para los Diagramas 2D (SVG + IA)

**El Problema:** Que un modelo LLM (Gemma) escriba las coordenadas puras de un SVG `<rect x... y...>` es propenso a errores (alucinaciones), destruye la consistencia de estilos y usualmente no respetará normativas como el `viewBox="0 0 2000 1600"`.

**La Solución Híbrida Inteligente:**

1. **La IA como Analista de Lenguaje Natural (NLP):** Usaremos a Gemma 3/4 únicamente como procesador de datos a través de una API. La IA procesará en milisegundos el "texto desordenado" devolviendo un `Objeto JSON estricto`:
    ```json
    {
        "producto": "ventana",
        "sistema": "nova",
        "medidas": { "ancho": 1500, "alto": 1200 },
        "configuracion": {
            "hojasCorredizas": 2,
            "panosFijos": 1
        },
        "cristal": "incoloro 6mm"
    }
    ```
2. **React como Motor Algorítmico Gráfico ("El Dibujante"):** Tomamos ese JSON y lo inyectamos a componentes vectoriales programados por nosotros (`<DiagramaReactSVGVentana {...parametrosJSON} />`).
    - Estos componentes trazan vectores paramétricos exactos con matemáticas de React.
    - **Garantías:** Cumplimiento del grosor estricto de marco (`strokeWidth={50}`), textos azules exigidos, opacidades del cristal y reglas del manual `docs/PRESUPUESTO_MASTER.md`.

---

## 3. Arquitectura del Código a Implementar (Next.js 16)

La modularización será Clave (Feature-Sliced Design):

- **`/src/app/presupuesto/nuevo/page.tsx`**: Contenedor cliente principal, que mantiene en memoria el estado íntegro del Presupuesto (Contexto o Zustand).
- **`/src/features/presupuesto/components/`**:
    - `FormCabecera.tsx` (Datos del contratante).
    - `GeneradorProductos.tsx` (Contiene Textarea + Botón Invocación a API Gemma).
    - `ListadoItems.tsx` (Muestra las tarjetas con Precio Unitario Modificable + Diagramas renderizados).
    - `PanelTotales.tsx` (Lógica matemática).
- **`/src/features/presupuesto/diagrams/`**: Los componentes React Paramétricos `<DiagramaVentana />`, `<DiagramaMampara />`.
- **`/src/shared/components/PrevisualizadorPDF.tsx`**: El clon de la arquitectura actual `budge.html` preparado para consumir el Context y enlazado a la librería `react-to-print` u otra equivalente, para inyectarle de fondo `p1.svg` y disparar a preselección de la Impresora A4.
- **`/src/app/api/parse-product/route.ts`**: El puente de Backend con la IA Gemma.

---

## 4. Fases Sugeridas para Agentes y Desarrollador

- ✅ **Fase 1 (Fundamentación y UX Frontal):** Construcción visual con Tailwind CSS de la página de ingesta de datos (`/presupuesto/nuevo`). Construcción sin lógica de cálculo, únicamente maquetas responsivas puras. _[Listo a ser ejecutado bajo demanda]_
- 🏗️ **Fase 2 (El Motor Genético SVG):** Desarrollo matemático de los componentes SVG React que absorben props de Alto/Ancho/Divisores y se acoplan a las reglas de marca.
- 🔗 **Fase 3 (El Cerebro IA + Estado Global):** Integrar la gestión de estado de los ítems con el Prompt de extracción utilizando el SDK o API correspondiente para Gemma / LLM.
- 🖨️ **Fase 4 (Exportación y Cierre de Ciclo):** Trasladar el prototipo aislado de `budge.html` en Next.js, conectarle el Estado Global completo y habilitar Impresión Nativa (Export a PDF).

2026
