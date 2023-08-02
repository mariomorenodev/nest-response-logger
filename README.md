## Description

Logger global interceptor library for Nest apps

## Installation

```bash
$ npm install @mariomorenodev/nest-response-logger
```

## Usage

Add the NestResponseLogger service globally in the `main.ts` file:

```typescript
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
```

Add the interceptor globally in the `app.module.ts` file:

```typescript
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from '@app/nest-response-logger';
import { NestResponseLoggerModule } from '@app/nest-response-logger';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [NestResponseLoggerModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
```

## License

Nest is [MIT licensed](LICENSE).

```

```
