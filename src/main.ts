import { NestFactory } from '@nestjs/core';
import { NestResponseLoggerService } from '@app/nest-response-logger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new NestResponseLoggerService(),
  });
  await app.listen(3000);
}
bootstrap();
