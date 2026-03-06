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

  // Middleware para SPA fallback: servir index.html para rutas no encontradas
  app.use((req: Request, res: Response, next: NextFunction) => {
    // Si la ruta comienza con /api o /footprint, pasar al siguiente middleware
    if (req.path.startsWith('/api') || req.path.startsWith('/footprint')) {
      return next();
    }
    
    // Para cualquier otra ruta GET, servir index.html
    if (req.method === 'GET' && !req.path.includes('.')) {
      const indexPath = join(frontendDistPath, 'index.html');
      console.log('🔍 SPA Fallback - Intentando servir:', indexPath);
      console.log('📁 ¿Existe?:', fs.existsSync(indexPath));
      if (fs.existsSync(indexPath)) {
        console.log('✅ Sirviendo index.html');
        res.sendFile(indexPath);
      } else {
        console.log('❌ index.html no encontrado');
        next();
      }
    } else {
      next();
    }
  });

  const port = process.env.PORT ?? 3000;
  const host = '0.0.0.0';
  await app.listen(port, host);
  console.log(`EcoTrack API escuchando en http://localhost:${port}`);
}

bootstrap().catch(console.error);
