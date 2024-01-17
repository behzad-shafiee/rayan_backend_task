import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerConfig } from './function/swagger.function';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerConfig(app);
  const config = app.get(ConfigService);
  const port = config.get<string>('PORT');
  const host = config.get<string>('HOST');
  await app.listen(port, () => {
    console.log(`Server is running on :${host}:${port}`);
  });
}
bootstrap();
