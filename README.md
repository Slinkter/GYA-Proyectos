# GYA - Sistema de Presupuestos

Sistema de gestión de presupuestos para **Glass & Aluminum Company S.A.C.** especializado en trabajos con vidrios y aluminios.

## 🚀 Tech Stack

| Componente | Tecnología |
|------------|-------------|
| **Frontend** | Next.js 16, React 19, Tailwind CSS v4 |
| **Backend** | NestJS 10, Prisma ORM, PostgreSQL |
| **Auth** | JWT con bcryptjs |
| **AI** | Gemini API para generación de SVGs técnicos |
| **UI** | Design System G&A (#003580, #CC0000) |

## 📁 Estructura del Proyecto

```
GYA-Proyectos/
├── my-frontend-gya/     # Frontend Next.js (Puerto 3001)
│   ├── src/
│   │   ├── app/         # App Router pages
│   │   ├── features/    # Componentes de presupuestos
│   │   ├── shared/      # UI compartida
│   │   └── store/       # Zustand stores
│   └── docs/            # Documentación específica
│
├── my-backend-gya/      # Backend NestJS (Puerto 3002)
│   ├── src/
│   │   ├── auth/        # Módulo de autenticación
│   │   ├── presupuestos/ # CRUD de presupuestos
│   │   ├── svg/         # Generador de SVGs
│   │   └── prisma/      # Configuración de BD
│   └── prisma/
│       ├── schema.prisma
│       └── seed.ts
│
└── docker-compose.yml   # PostgreSQL 16
```

## 🛠️ Configuración Inicial

### Prerrequisitos
- Node.js 18+
- Docker Desktop
- pnpm

### 1. Clonar y Configurar

```bash
# Clonar repositorio
git clone <repo-url> GYA-Proyectos
cd GYA-Proyectos
```

### 2. Frontend

```bash
cd my-frontend-gya
cp .env.example .env.local
pnpm install
pnpm dev
# Acceder: http://localhost:3001
```

### 3. Backend

```bash
cd my-backend-gya
cp .env.example .env

# Configurar variables en .env:
# DATABASE_URL, JWT_SECRET, GEMINI_API_KEY, PORT=3002

# Levantar PostgreSQL
docker-compose up -d

# Ejecutar migraciones
npx prisma migrate dev --name init

# Crear usuarios de prueba
pnpm run seed

# Iniciar servidor
pnpm run start:dev
# API: http://localhost:3002
# Swagger: http://localhost:3002/api
```

## 🔐 Credenciales (Seed)

| Rol | Email | Contraseña |
|-----|-------|------------|
| Admin | admin@gya.com | admin123 |
| Vendedor | vendedor@gya.com | vendedor123 |

## 📡 Endpoints API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/auth/login` | Iniciar sesión |
| GET | `/presupuestos` | Listar presupuestos |
| GET | `/presupuestos/:id` | Ver detalle |
| POST | `/presupuestos` | Crear presupuesto |
| PATCH | `/presupuestos/:id/estado` | Cambiar estado |
| DELETE | `/presupuestos/:id` | Eliminar (Admin) |
| POST | `/svg/generate` | Generar SVG técnico |

## 🖨️ Características

- **Presupuestos**: Creación con items, precios y cliente
- **Diagramas SVG**: Generación automática de esquemas técnicos con IA
- **Impresión A4**: Formato optimizado para impresión
- **Diseño G&A**: Identidad visual con colores corporativos

## 📄 Licencia

Proprietario - Glass & Aluminum Company S.A.C.