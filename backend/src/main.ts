import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { join } from 'path';
import * as fs from 'fs';
import type { Request, Response, NextFunction } from 'express';
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
  const indexPath = join(frontendDistPath, 'index.html');
  console.log('📁 Frontend dist path:', frontendDistPath);
  console.log('✅ Frontend dist exists:', fs.existsSync(frontendDistPath));
  console.log('✅ Frontend index exists:', fs.existsSync(indexPath));

  app.use(express.static(frontendDistPath));

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.get('/', (_req: Request, res: Response) => {
    if (fs.existsSync(indexPath)) {
      console.log('✅ Serving root index.html');
      return res.sendFile(indexPath);
    }
    return res.status(404).json({ message: 'Frontend index not found' });
  });

  expressApp.get('*', (req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/footprint') || req.path.includes('.')) {
      return next();
    }

    console.log('🔍 SPA wildcard fallback for:', req.path);
    if (fs.existsSync(indexPath)) {
      return res.sendFile(indexPath);
    }

    return next();
  });

  const port = Number(process.env.PORT) || 3000;
  const host = '0.0.0.0';
  console.log(`🧭 PORT env recibido: ${process.env.PORT ?? 'undefined'}`);
  await app.listen(port, host);
  console.log(`EcoTrack API escuchando en http://${host}:${port}`);
}

bootstrap().catch(console.error);
