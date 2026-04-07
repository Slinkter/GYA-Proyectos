import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

export class CreateItemDto {
  @IsString() @IsNotEmpty() producto: string;
  @IsString() @IsOptional() sistema?: string;
  @IsString() @IsNotEmpty() descripcion: string;
  @IsNumber() @IsOptional() altura?: number;
  @IsNumber() @IsOptional() ancho?: number;
  @IsNumber() cantidad: number;
  @IsDecimal() precioUnitario: number;
  @IsDecimal() subtotal: number;
}

export class CreateDiagramaDto {
  @IsString() @IsNotEmpty() titulo: string;
  @IsString() @IsOptional() subtitulo?: string;
  @IsString() @IsNotEmpty() svgCode: string;
  @IsDecimal() @IsOptional() precio?: number;
  @IsString() @IsOptional() promptOriginal?: string;
}

export class CreatePresupuestoDto {
  @IsString() @IsNotEmpty() obraNombre: string;
  @IsString() @IsNotEmpty() obraDireccion: string;
  @IsString() @IsOptional() tiempoEntrega?: string;
  
  @IsString() @IsNotEmpty() clienteNombre: string;
  @IsString() @IsOptional() clienteRuc?: string;
  @IsString() @IsOptional() clienteDireccion?: string;
  
  @IsBoolean() incluyeIgv: boolean;
  @IsNumber() subtotal: number;
  @IsNumber() descuento: number;
  @IsNumber() total: number;
  @IsString() @IsOptional() notas?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemDto)
  items: CreateItemDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDiagramaDto)
  diagramas: CreateDiagramaDto[];
}
