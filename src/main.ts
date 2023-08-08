import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

(async () => {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    credentials: true,
    origin: ["https://egresadosena-client.vercel.app","http://localhost:3000"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'Content-Type',
      'Accept',
      'Authorization',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Credentials',
      'credentials'
    ],
  });

  // Enable Cookies
  app.use(cookieParser(process.env.COOKIE_SECRET, {}));

  // Enable Validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // Set global prefix
  app.setGlobalPrefix('api');

  // Start listening
  await app.listen(process.env.PORT || 3000);
})();
