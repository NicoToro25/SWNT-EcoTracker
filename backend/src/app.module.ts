import { Module } from '@nestjs/common';
import { FootprintModule } from './footprint/footprint.module';

@Module({
  imports: [FootprintModule],
})
export class AppModule {}
