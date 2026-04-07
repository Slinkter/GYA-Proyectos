import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed...');

  const hashedPasswordAdmin = await bcrypt.hash('admin123', 10);
  const hashedPasswordVendedor = await bcrypt.hash('vendedor123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@gya.com' },
    update: {},
    create: {
      email: 'admin@gya.com',
      password: hashedPasswordAdmin,
      nombre: 'Administrador',
      rol: 'ADMIN',
      activo: true,
    },
  });
  console.log('Usuario Admin creado:', admin.email);

  const vendedor = await prisma.user.upsert({
    where: { email: 'vendedor@gya.com' },
    update: {},
    create: {
      email: 'vendedor@gya.com',
      password: hashedPasswordVendedor,
      nombre: 'Vendedor Inicial',
      rol: 'VENDEDOR',
      activo: true,
    },
  });
  console.log('Usuario Vendedor creado:', vendedor.email);

  const clientes = [
    {
      nombre: 'Constructora ABC S.A.',
      ruc: '20123456789',
      direccion: 'Av. Principal 123, Lima',
    },
    {
      nombre: 'Inmobiliaria Delta',
      ruc: '20567890123',
      direccion: 'Jr. Los Olivos 456, Arequipa',
    },
    {
      nombre: 'Empresa Constructora XYZ',
      ruc: '20678901234',
      direccion: 'Calle Central 789, Trujillo',
    },
  ];

  for (const cliente of clientes) {
    const created = await prisma.cliente.create({
      data: cliente,
    });
    console.log('Cliente creado:', created.nombre);
  }

  console.log('Seed completado exitosamente!');
}

main()
  .catch((e) => {
    console.error('Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });