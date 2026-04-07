import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { SvgService } from './svg.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('SVG')
@Controller('svg')
@UseGuards(JwtAuthGuard)
export class SvgController {
  constructor(private svgService: SvgService) {}

  @Post('generate')
  @ApiOperation({ summary: 'Generate SVG using Gemini' })
  async generate(@Body('descripcion') descripcion: string) {
    return this.svgService.generateSvg(descripcion);
  }
}
