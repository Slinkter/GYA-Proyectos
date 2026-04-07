# Agent Guidelines for GYA-Proyectos

Compact instructions for working on the Glass & Aluminum Company S.A.C. budget system.

## ⚠️ Critical Setup

- **Ports**: Frontend=3001, Backend=3002, PostgreSQL=5432
- **Package Manager**: Always use `pnpm` (not npm/yarn)
- **Environment**: Copy `.env.example` to `.env` in each project before running

## 🛠 Core Commands

### Frontend (`my-frontend-gya/`)
```bash
pnpm install
pnpm dev          # Starts at http://localhost:3001
pnpm build        # Production build
pnpm lint         # ESLint check
```

### Backend (`my-backend-gya/`)
```bash
pnpm install
docker-compose up -d           # Start PostgreSQL
npx prisma migrate dev         # Run migrations
pnpm run seed                  # Create test users
pnpm run start:dev             # Starts at http://localhost:3002
```

### Verification Order
`pnpm lint` → `pnpm build` (both for frontend and backend)

## 🎨 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16 (App Router), React 19, Tailwind CSS v4 (CSS-first) |
| Backend | NestJS 10, Prisma 5, PostgreSQL 16 |
| Auth | JWT + bcryptjs |
| AI | Gemini API (SVG generation) |

## 📁 Project Structure

```
GYA-Proyectos/
├── my-frontend-gya/          # Next.js frontend
│   ├── src/app/              # App Router pages
│   ├── src/features/         # Feature components
│   └── src/shared/           # UI shared components
├── my-backend-gya/           # NestJS backend
│   ├── src/auth/             # JWT authentication
│   ├── src/presupuestos/     # Budget CRUD
│   ├── src/svg/              # SVG generator
│   └── prisma/               # Database schema + seed
└── docker-compose.yml        # PostgreSQL
```

## 🔐 Credentials (Seed)
- Admin: `admin@gya.com` / `admin123`
- Vendor: `vendedor@gya.com` / `vendedor123`

## 💰 Presupuesto G&A Module

When working on budget components, follow `my-frontend-gya/docs/PRESUPUESTO_MASTER.md`:

### Visual Identity
- Colors: `--color-gna-blue: #003580`, `--color-gna-red: #CC0000`
- Fonts: Arial (900) for headers, Times New Roman for body

### SVG Rules
- ViewBox: `viewBox="0 0 2000 1600"`
- Frame stroke: 50, Glass stroke: 25, fill-opacity: 0.6

## 🚫 Common Pitfalls
- Don't use `any` in TypeScript—use `unknown` + narrowing
- Don't hardcode API URLs—use `NEXT_PUBLIC_API_URL` from env
- Don't use Tailwind config file—Tailwind v4 uses `globals.css` only
- Don't run backend without PostgreSQL running (`docker-compose up -d`)