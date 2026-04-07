import { Module } from '@nestjs/common';
import { SvgController } from './svg.controller';
import { SvgService } from './svg.service';

@Module({
  controllers: [SvgController],
  providers: [SvgService],
})
export class SvgModule {}
