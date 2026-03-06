import { Module } from '@nestjs/common';
import { FootprintController, FootprintApiController } from './footprint.controller';
import { FootprintService } from './footprint.service';

@Module({
  controllers: [FootprintController, FootprintApiController],
  providers: [FootprintService],
  exports: [FootprintService],
})
export class FootprintModule {}
