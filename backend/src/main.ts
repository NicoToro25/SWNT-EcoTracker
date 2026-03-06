import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { join } from 'path';
import * as fs from 'fs';
import * as path from 'path';

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

  // Middleware para SPA fallback: servir index.html para rutas no encontradas
  app.use((req, res, next) => {
    // Si la ruta comienza con /api o /footprint, pasar al siguiente middleware
    if (req.path.startsWith('/api') || req.path.startsWith('/footprint')) {
      return next();
    }
    
    // Para cualquier otra ruta GET, servir index.html
    if (req.method === 'GET' && !req.path.includes('.')) {
      const indexPath = join(__dirname, '..', 'frontend', 'dist', 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        next();
      }
    } else {
      next();
    }
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`EcoTrack API escuchando en http://localhost:${port}`);
}

bootstrap().catch(console.error);
