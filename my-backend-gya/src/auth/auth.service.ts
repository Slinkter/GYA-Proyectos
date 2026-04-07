import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { UnauthorizedException, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }
    if (!user.activo) {
      throw new ForbiddenException('User account is disabled');
    }
    const token = this.jwtService.sign({ sub: user.id, email: user.email, rol: user.rol });
    return { token, user: { id: user.id, email: user.email, nombre: user.nombre, rol: user.rol } };
  }

  async validateUser(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
