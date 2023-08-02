import { Module } from '@nestjs/common';
import { NestResponseLoggerService } from './nest-response-logger.service';
import { LoggerInterceptor } from './logger.interceptor';

@Module({
  providers: [NestResponseLoggerService, LoggerInterceptor],
  exports: [NestResponseLoggerService, LoggerInterceptor],
})
export class NestResponseLoggerModule { }
