import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './swagger';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);

  const port = process.env.PORT || 3000; // Gunakan nilai default jika PORT tidak di-set atau string kosong
  console.log(`Starting server on port: ${port}`); // Log port untuk debugging
  await app.listen(port);
}
bootstrap();