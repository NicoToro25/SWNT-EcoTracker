import { Controller, Get, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { join } from 'path';
import * as fs from 'fs';

@Controller()
export class SpaController {
  private indexPath = join(__dirname, '..', '..', 'frontend', 'dist', 'index.html');

  @Get('*')
  serveStaticSPA(@Req() req: Request, @Res() res: Response): void {
    // Permitir que /api y /footprint pasen al siguiente handler
    if (req.path.startsWith('/api') || req.path.startsWith('/footprint')) {
      res.status(404).json({ message: 'Not found' });
      return;
    }

    // No servir archivos estáticos específicos (dejamos que express.static los maneje)
    if (req.path.includes('.')) {
      res.status(404).json({ message: 'File not found' });
      return;
    }

    console.log(`🔍 SPA Fallback (catch-all) - Serving index for: ${req.path}`);
    console.log(`📁 Index exists: ${fs.existsSync(this.indexPath)}`);

    if (fs.existsSync(this.indexPath)) {
      console.log(`✅ Serving ${this.indexPath}`);
      res.sendFile(this.indexPath);
    } else {
      console.log(`❌ Index not found at ${this.indexPath}`);
      res.status(404).json({ message: 'Frontend not found' });
    }
  }
}
