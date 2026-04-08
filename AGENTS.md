# Agent Guidelines for GYA-Proyectos

Compact instructions for the Glass & Aluminum Company S.A.C. budget system.

## ⚠️ Critical Setup

- **Ports**: Frontend=3001, Backend=3002, PostgreSQL=5432
- **Package Manager**: Always use `pnpm` (not npm/yarn)
- **Environment**: Copy `.env.example` to `.env` before running each project

## 🛠 Core Commands

### Frontend (`my-frontend-gya/`)
```bash
pnpm install
pnpm dev          # http://localhost:3001
pnpm lint && pnpm build
```

### Backend (`my-backend-gya/`)
```bash
cd my-backend-gya
docker-compose up -d           # PostgreSQL 16
cp .env.example .env
npx prisma migrate dev
pnpm run seed
pnpm run start:dev              # http://localhost:3002
```

### Verification Order
`pnpm lint` → `pnpm build` (both projects)

## 🎨 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, React 19, Tailwind CSS v4 |
| Backend | NestJS 10, Prisma 5, PostgreSQL 16 |
| Auth | JWT + bcryptjs |
| AI | Gemini API (SVG generation) |

## 📁 Project Structure

```
GYA-Proyectos/
├── my-frontend-gya/          # Next.js (port 3001)
│   └── docs/PRESUPUESTO_MASTER.md  # Budget module rules
├── my-backend-gya/           # NestJS (port 3002)
│   ├── docker-compose.yml    # PostgreSQL config
│   └── prisma/              # Schema + seed
```

## 🔐 Credentials (Seed)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@gya.com | admin123 |
| Vendor | vendedor@gya.com | vendedor123 |

**Database**: `gya_user:gya_password@gya-db:5432/gya_db`

## 💰 Presupuesto Module

Follow `my-frontend-gya/docs/PRESUPUESTO_MASTER.md`:

- **Colors**: `--color-gna-blue: #003580`, `--color-gna-red: #CC0000`
- **Fonts**: Arial (900) for headers, Times New Roman for body
- **SVG**: `viewBox="0 0 2000 1600"`, frame stroke=50, glass stroke=25, fill-opacity=0.6

## 🚫 Common Pitfalls

- Don't use `any`—use `unknown` + narrowing
- Don't hardcode API URLs—use `NEXT_PUBLIC_API_URL` from env
- Don't use Tailwind config file—Tailwind v4 uses `globals.css` only
- Don't run backend without PostgreSQL (`docker-compose up -d`)
