import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { PresupuestosService } from './presupuestos.service';
import { CreatePresupuestoDto } from './dto/create-presupuesto.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Presupuestos')
@Controller('presupuestos')
@UseGuards(JwtAuthGuard)
export class PresupuestosController {
  constructor(private service: PresupuestosService) {}

  @Get()
  @ApiOperation({ summary: 'List presupuestos' })
  async findAll(@Query() filters: any) {
    return this.service.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get presupuesto detail' })
  async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create presupuesto' })
  async create(@Body() dto: CreatePresupuestoDto, @Request() req: any) {
    const vendedorId = req.user.id;
    return this.service.create(dto, vendedorId);
  }

  @Patch(':id/estado')
  @ApiOperation({ summary: 'Update status' })
  async updateStatus(@Param('id') id: string, @Body('estado') estado: string) {
    return this.service.updateStatus(id, estado);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete presupuesto' })
  async delete(@Param('id') id: string, @Request() req: any) {
    const userRol = req.user.rol;
    return this.service.delete(id, userRol);
  }
}
