import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePresupuestoDto } from './dto/create-presupuesto.dto';
import { Prisma } from '@prisma/client';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class PresupuestosService {
  constructor(private prisma: PrismaService) {}

  async getNextCorrelativo(serie: string): Promise<number> {
    const ultimo = await this.prisma.presupuesto.findFirst({
      where: { serie },
      orderBy: { correlativo: 'desc' },
    });
    return (ultimo?.correlativo ?? 0) + 1;
  }

  formatNumero(serie: string, correlativo: number): string {
    return `${serie}-${String(correlativo).padStart(6, '0')}`;
  }

  async create(dto: CreatePresupuestoDto, vendedorId: string) {
    const serie = '03';
    const correlativo = await this.getNextCorrelativo(serie);
    const numero = this.formatNumero(serie, correlativo);

    let cliente = await this.prisma.cliente.findFirst({
      where: dto.clienteRuc ? { ruc: dto.clienteRuc } : { nombre: dto.clienteNombre },
    });

    if (!cliente) {
      cliente = await this.prisma.cliente.create({
        data: {
          nombre: dto.clienteNombre,
          ruc: dto.clienteRuc,
          direccion: dto.clienteDireccion,
        },
      });
    }

    return this.prisma.presupuesto.create({
      data: {
        numero,
        serie,
        correlativo,
        obraNombre: dto.obraNombre,
        obraDireccion: dto.obraDireccion,
        tiempoEntrega: dto.tiempoEntrega,
        subtotal: dto.subtotal,
        descuento: dto.descuento,
        total: dto.total,
        incluyeIgv: dto.incluyeIgv,
        notas: dto.notas,
        clienteId: cliente.id,
        vendedorId: vendedorId,
        items: {
          create: dto.items.map((item, index) => ({
            orden: index,
            producto: item.producto,
            sistema: item.sistema,
            descripcion: item.descripcion,
            altura: item.altura,
            ancho: item.ancho,
            cantidad: item.cantidad,
            precioUnitario: item.precioUnitario,
            subtotal: item.subtotal,
          })),
        },
        diagramas: {
          create: dto.diagramas.map((diag, index) => ({
            orden: index,
            titulo: diag.titulo,
            subtitulo: diag.subtitulo,
            svgCode: diag.svgCode,
            precio: diag.precio,
            prompt: diag.promptOriginal,
          })),
        },
      },
      include: { cliente: true, items: true, diagramas: true },
    });
  }

  async findAll(filters: any) {
    return this.prisma.presupuesto.findMany({
      where: filters,
      include: { cliente: true, vendedor: true, items: true, diagramas: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.presupuesto.findUnique({
      where: { id },
      include: { cliente: true, vendedor: true, items: true, diagramas: true },
    });
  }

  async updateStatus(id: string, estado: string) {
    return this.prisma.presupuesto.update({
      where: { id },
      data: { estado: estado as any },
    });
  }

  async delete(id: string, userRol: string) {
    const p = await this.findOne(id);
    if (!p) throw new ForbiddenException('Presupuesto not found');
    if (userRol !== 'ADMIN') throw new ForbiddenException('Only admin can delete');
    if (p.estado !== 'BORRADOR') throw new ForbiddenException('Only drafts can be deleted');
    
    return this.prisma.presupuesto.delete({ where: { id } });
  }
}
