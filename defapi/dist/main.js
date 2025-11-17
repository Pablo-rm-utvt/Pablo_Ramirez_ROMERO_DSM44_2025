"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const body_parser_1 = require("body-parser");
const os_1 = require("os");
const getLocalIp = () => Object.values((0, os_1.networkInterfaces)())
    .flat()
    .find(i => i?.family === 'IPv4' && !i.internal)?.address || 'localhost';
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ['http://localhost:8081', 'http://localhost:3000', 'exp://192.168.100.132:3000'],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    app.use((0, body_parser_1.json)({ limit: '100mb' }));
    app.use((0, body_parser_1.urlencoded)({ limit: '100mb', extended: true }));
    app.setGlobalPrefix('api');
    await app.listen(3000);
    console.log(`Server running on http://${getLocalIp()}:3000`);
}
bootstrap();
//# sourceMappingURL=main.js.map