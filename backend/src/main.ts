import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { join } from 'path';
import * as fs from 'fs';
import type { Request, Response } from 'express';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para que el frontend pueda consumir la API
  app.enableCors({
    origin: true,
    methods: 'GET,POST',
  });

  // Validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Servir archivos estáticos del frontend
  const frontendDistPath = join(__dirname, '..', '..', 'frontend', 'dist');
  console.log('📁 Frontend dist path:', frontendDistPath);
  console.log('✅ Frontend dist exists:', fs.existsSync(frontendDistPath));
  
  app.use(express.static(frontendDistPath));

  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.get(/^\/(?!api|footprint).*/, (req: Request, res: Response) => {
    if (req.path.includes('.')) {
      return res.status(404).send('File not found');
    }

    const indexPath = join(frontendDistPath, 'index.html');
    console.log('🔍 SPA Fallback - Intentando servir:', indexPath);
    console.log('📁 ¿Existe?:', fs.existsSync(indexPath));

    if (fs.existsSync(indexPath)) {
      return res.sendFile(indexPath);
    }

    return res.status(404).send('Not found');
  });

  const port = Number(process.env.PORT) || 5000;
  const host = '0.0.0.0';
  await app.listen(port, host);
  console.log(`EcoTrack API escuchando en http://${host}:${port}`);
}

bootstrap().catch(console.error);
