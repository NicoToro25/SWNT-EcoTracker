import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FootprintModule } from './footprint/footprint.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    // Servir archivos estáticos del frontend
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'frontend', 'dist'),
      exclude: ['/api*', '/footprint*'],
    }),
    FootprintModule,
  ],
  controllers: [AppController],
})
export class AppModule {}