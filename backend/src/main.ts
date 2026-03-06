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
  console.log('📁 Frontend dist path:', frontendDistPath);
  console.log('✅ Frontend dist exists:', fs.existsSync(frontendDistPath));
  
  app.use(express.static(frontendDistPath));

  const port = process.env.PORT ?? 3000;
  const host = '0.0.0.0';
  await app.listen(port, host);

  // Registrar catch-all route DESPUÉS de que NestJS inicializa sus rutas
  const httpAdapter = app.getHttpAdapter();
  httpAdapter.get('*', (req: Request, res: Response) => {
    // Solo para rutas GET que no son archivos (sin extensión)
    if (!req.path.includes('.')) {
      const indexPath = join(frontendDistPath, 'index.html');
      console.log('🔍 SPA Fallback - Intentando servir:', indexPath);
      console.log('📁 ¿Existe?:', fs.existsSync(indexPath));
      if (fs.existsSync(indexPath)) {
        console.log('✅ Sirviendo index.html');
        res.sendFile(indexPath);
      } else {
        console.log('❌ index.html no encontrado');
        res.status(404).send('Not found');
      }
    } else {
      res.status(404).send('File not found');
    }
  });
  console.log(`EcoTrack API escuchando en http://localhost:${port}`);
}

bootstrap().catch(console.error);
