import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'body-parser';
import { networkInterfaces } from 'os';

const getLocalIp = () =>
  Object.values(networkInterfaces())
    .flat()
    .find(i => i?.family === 'IPv4' && !i.internal)?.address || 'localhost';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      "http://localhost:8081",
      "http://192.168.100.12:8081"
    ],
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS",
    credentials: true
  });
  app.use(json({ limit: "100mb" }));
  app.use(urlencoded({ limit: '100mb', extended: true }));
  app.setGlobalPrefix("api");
  await app.listen(3000);
  console.log(`http://${getLocalIp()}:3000`);
}

bootstrap();
