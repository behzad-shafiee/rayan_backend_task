import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from './function/swagger.function';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  SwaggerConfig(app);
  const config = app.get(ConfigService);
  const port = config.get<string>('PORT');
  const host = config.get<string>('HOST');
  await app.listen(port, () => {
    console.log(`Server is running on: ${host}:${port}`);
    console.log(`Swagger url ===> ${host}:${port}/doc`);
  });
}
bootstrap();
