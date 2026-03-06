import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FootprintModule } from './footprint/footprint.module';

@Module({
  imports: [
    FootprintModule,

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../frontend/dist'),
    }),
  ],
})
export class AppModule {}