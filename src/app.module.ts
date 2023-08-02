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
export class AppModule { }
