import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import {
  BadRequestExceptionFilter,
  HttpExceptionFilter,
  MongoExceptionFilter,
  UnauthorizedExceptionFilter,
} from './filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new MongoExceptionFilter(),
    new UnauthorizedExceptionFilter(),
  );

  await app.listen(8000);
}
bootstrap();
