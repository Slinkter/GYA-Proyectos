# Agent Guidelines for my-frontend-gya

This document provide high-signal instructions for agents working on the Glass & Aluminum Company S.A.C. budget system.

## 🛠 Core Commands
- **Dev Server**: `npm run dev` (http://localhost:3000)
- **Build Project**: `npm run build`
- **Linting**: `npm run lint` (ESLint 9)
- **Verification Order**: `npm run lint` -> `npm run build`

## 📚 Tech Stack & Quirks
- **Framework**: Next.js 16 (App Router) - Be aware of v16 breaking changes.
- **Styling**: Tailwind CSS v4 (**CSS-First**: No `tailwind.config.js`, use `globals.css` for configuration).
- **Printing**: `react-to-print` used for A4 document generation.
- **Types**: TypeScript 5 (Strict). Avoid `any`; use `unknown`.

## 🎨 Coding Standards
- **Import Order**: 1. React/Next → 2. Third-party → 3. Internal aliases (`@/`) → 4. Relative.
- **Path Aliases**: Always use `@/` for internal references.
- **Components**: Server Components by default; use `'use client'` only for interactivity.

## 💰 Presupuesto G&A Module (Critical)
When working on the budget system, you **MUST** adhere to `docs/PRESUPUESTO_MASTER.md`.

### Visual Identity
- **Colors**: Use CSS variables: `--color-gna-blue: #003580`, `--color-gna-red: #CC0000`, `--color-gna-black: #000000`, `--color-gna-gray: #F7F7F7`.
- **Typography**: Titles: Arial (900); Body: 'Times New Roman' (13px).
- **Mandatory Elements**: Every printed page must have the specific Header (Company info + Logo SVG) and Footer (BBVA bank details).

### Technical SVG Rules
- **ViewBox**: Always `viewBox="0 0 2000 1600"`.
- **Styling**: Outer frame stroke-width="50", Glass stroke-width="25" with `fill-opacity="0.6"`.
- **Annotations**: Fixed text size="120", color `#003580`, bold. Cota text size="80".

### Data Models
- Use the `Presupuesto` and `ProductoItem` interfaces defined in `docs/PRESUPUESTO_MASTER.md`.

## 📁 Structure
- `src/app/`: App Router pages and layouts.
- `src/components/ui/`: Base UI components.
- `src/components/features/`: Feature-specific components.
- `src/lib/`: Utilities and custom hooks.
- `src/types/`: Global type definitions.
