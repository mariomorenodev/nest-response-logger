import { Injectable, LoggerService } from '@nestjs/common';
import * as moment from 'moment';

@Injectable()
export class NestResponseLoggerService implements LoggerService {
  private now: string;
  constructor() {
    this.now = moment(new Date()).format('DD/MM/YYYY HH:mm:ss');
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(`[${this.now}] [LOG] ${message}`, optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(`[${this.now}] [ERROR] ${message}`, optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(`[${this.now}] [WARN] ${message}`, optionalParams);
  }

  debug?(message: any, ...optionalParams: any[]) {
    console.debug(`[${this.now}] [DEBUG] ${message}`, optionalParams);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    console.info(`[${this.now}] [VERBOSE] ${message}`, optionalParams);
  }
}
