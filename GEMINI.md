# GYA-Proyectos (Sistema de Presupuestos)

## Project Overview

GYA-Proyectos is a comprehensive budget management system designed for **Glass & Aluminum Company S.A.C.** It handles the creation, management, and printing of budgets for glass and aluminum work. The project features an AI-powered technical SVG diagram generator using the Gemini API. 

The repository is structured as a monorepo with two main applications:
- **my-frontend-gya**: A web application built with **Next.js 16**, **React 19**, and **Tailwind CSS v4**. State management is handled by Zustand, forms by React Hook Form + Zod, and API requests via Axios and TanStack React Query.
- **my-backend-gya**: A RESTful API built with **NestJS 10**. It uses **Prisma ORM** to connect to a **PostgreSQL** database. Authentication is implemented using JWT and Passport. It integrates with the Gemini API (`@google/generative-ai`) to generate technical SVG diagrams.

## Building and Running

### Prerequisites
- Node.js (v18 or higher recommended)
- `pnpm` (package manager used across the project)
- Docker & Docker Compose (for the PostgreSQL database)

### Backend (`my-backend-gya`)
Runs on port **3002** by default.

1. **Environment Setup:**
   Navigate to `my-backend-gya` and create a `.env` file based on `.env.example`.
   Ensure you provide `DATABASE_URL`, `JWT_SECRET`, and `GEMINI_API_KEY`.
2. **Start Database:**
   ```bash
   docker-compose up -d
   ```
3. **Install Dependencies:**
   ```bash
   pnpm install
   ```
4. **Database Migrations & Seed:**
   ```bash
   npx prisma migrate dev --name init
   pnpm run seed
   ```
5. **Run the Server:**
   ```bash
   pnpm run start:dev
   ```
   *Swagger documentation is available at `http://localhost:3002/api`.*

### Frontend (`my-frontend-gya`)
Runs on port **3001** by default.

1. **Environment Setup:**
   Navigate to `my-frontend-gya` and create a `.env.local` based on `.env.example`.
2. **Install Dependencies:**
   ```bash
   pnpm install
   ```
3. **Run the Development Server:**
   ```bash
   pnpm run dev
   ```

## Development Conventions

- **Architecture Rules:** The project follows a strict separation of concerns. Frontend context is maintained in `FRONTEND.md` and Backend context in `BACKEND.md`. Gemini CLI acts as an orchestrator that analyzes user tasks and delegates to the appropriate agent context.
- **Frontend Stack:** 
  - Strictly use **Tailwind v4** for styling.
  - Utilize **Zustand** for global state.
  - Use App Router structure (`src/app`).
  - Keep features modularized in the `src/features/` directory.
- **Backend Stack:** 
  - Use **NestJS** decorators and modules.
  - Expose API endpoints strictly through Controllers.
  - Secure endpoints using the `JwtAuthGuard`.
  - Validate payloads using `class-validator` and `class-transformer`.
  - Handle business logic, including Gemini API interactions for SVG generation, in Services.
- **Testing & Tooling:** 
  - The project uses `eslint` and `typescript` strictly. Run `pnpm run lint` or `pnpm run build` in the frontend to ensure type safety.
  - Ensure all database changes are reflected via Prisma migrations (`npx prisma migrate dev`).
- **Commits & Git:** Follow standard commit message guidelines. Do not commit `.env` files or secrets.