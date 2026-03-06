"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const fs = require("fs");
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
    app.use((req, res, next) => {
        if (req.path.startsWith('/api') || req.path.startsWith('/footprint')) {
            return next();
        }
        if (req.method === 'GET' && !req.path.includes('.')) {
            const indexPath = (0, path_1.join)(__dirname, '..', 'frontend', 'dist', 'index.html');
            if (fs.existsSync(indexPath)) {
                res.sendFile(indexPath);
            }
            else {
                next();
            }
        }
        else {
            next();
        }
    });
    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(`EcoTrack API escuchando en http://localhost:${port}`);
}
bootstrap().catch(console.error);
//# sourceMappingURL=main.js.map