import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'body-parser';
import { networkInterfaces } from 'os';

const getLocalIp = () =>
  Object.values(networkInterfaces())
    .flat()
    .find(i => i?.family === 'IPv4' && !i.internal)?.address || 'localhost';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS
  app.enableCors({
    origin: ['http://localhost:8081', 'http://localhost:3000', 'exp://192.168.100.132:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Configuración de límites de payload
  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ limit: '100mb', extended: true }));

  // Prefijo global para la API
  app.setGlobalPrefix('api');

  // Iniciar el servidor
  await app.listen(3000);
  console.log(`Server running on http://${getLocalIp()}:3000`);
}

bootstrap();