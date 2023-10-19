## Description

Logger global interceptor library for Nest apps

## Installation

```bash
$ npm install @mariomorenodev/nest-response-logger
```

Copy the variables from the `.env.example` file to the `.env` file

```bash
$ cp .env.example .env
```

Or add variables to the environment 

```bash
TZ=UTC

LOG_FILE_PATH=./logs/app.log
LOG_FILE_ENABLED=false
```
## Usage

Add the NestResponseLogger service globally in the `main.ts` file:

```typescript
import { NestResponseLoggerService } from '@mariomorenodev/nest-response-logger';

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
import { LoggerInterceptor } from '@mariomorenodev/nest-response-logger';
import { NestResponseLoggerModule } from '@mariomorenodev/nest-response-logger';

@Module({
  imports: [NestResponseLoggerModule],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
```

## License

Nest response logger [MIT licensed](LICENSE.md).

```

```
