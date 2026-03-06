"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const fs = require("fs");
const express = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: true,
        methods: 'GET,POST',
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    const frontendDistPath = (0, path_1.join)(__dirname, '..', '..', 'frontend', 'dist');
    console.log('📁 Frontend dist path:', frontendDistPath);
    console.log('✅ Frontend dist exists:', fs.existsSync(frontendDistPath));
    app.use(express.static(frontendDistPath));
    const port = process.env.PORT ?? 3000;
    const host = '0.0.0.0';
    await app.listen(port, host);
    const httpAdapter = app.getHttpAdapter();
    httpAdapter.get('*', (req, res) => {
        if (!req.path.includes('.')) {
            const indexPath = (0, path_1.join)(frontendDistPath, 'index.html');
            console.log('🔍 SPA Fallback - Intentando servir:', indexPath);
            console.log('📁 ¿Existe?:', fs.existsSync(indexPath));
            if (fs.existsSync(indexPath)) {
                console.log('✅ Sirviendo index.html');
                res.sendFile(indexPath);
            }
            else {
                console.log('❌ index.html no encontrado');
                res.status(404).send('Not found');
            }
        }
        else {
            res.status(404).send('File not found');
        }
    });
    console.log(`EcoTrack API escuchando en http://localhost:${port}`);
}
bootstrap().catch(console.error);
//# sourceMappingURL=main.js.map