import { Module } from '@nestjs/common';
import { FootprintModule } from './footprint/footprint.module';
import { SpaController } from './spa.controller';

@Module({
  imports: [FootprintModule],
  controllers: [SpaController],
})
export class AppModule {}