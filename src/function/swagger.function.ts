import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function SwaggerConfig(app: INestApplication) {
  const config = app.get(ConfigService);
  const swaggerConfig = new DocumentBuilder()
    .setTitle(config.get('SWAGGER_TITLE'))
    .setDescription(config.get('SWAGGER_DESCRIPTION'))
    .setVersion(config.get('SWAGGER_VERSION'))
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('doc', app, document);
}
