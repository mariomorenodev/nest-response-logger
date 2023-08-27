import { Injectable, LoggerService } from '@nestjs/common';
import 'moment-timezone';
import * as moment from 'moment';
import { existsSync, mkdirSync, appendFileSync } from 'fs';

@Injectable()
export class NestResponseLoggerService implements LoggerService {
  private timezone: string;
  private readonly logFilePath: string;
  private readonly logFileEnabled: string;

  constructor() {
    this.timezone = process.env.TZ || 'UTC';
    this.logFilePath = process.env.LOG_FILE_PATH || './logs/app.log';
    this.logFileEnabled = process.env.LOG_FILE_ENABLED || 'false';
    this.ensureLogDirectoryExists();
  }

  log(message: any, ...optionalParams: any[]) {
    const now = this.getCurrentTime();
    console.log(`[${now}] [LOG] ${message}`, optionalParams);
    this.writeToFile(`[${now}] [LOG] ${message} ${optionalParams}`);
  }

  error(message: any, ...optionalParams: any[]) {
    const now = this.getCurrentTime();
    console.error(`[${now}] [ERROR] ${message}`, optionalParams);
    this.writeToFile(`[${now}] [LOG] ${message} ${optionalParams}`);
  }

  warn(message: any, ...optionalParams: any[]) {
    const now = this.getCurrentTime();
    console.warn(`[${now}] [WARN] ${message}`, optionalParams);
    this.writeToFile(`[${now}] [LOG] ${message} ${optionalParams}`);
  }

  debug?(message: any, ...optionalParams: any[]) {
    const now = this.getCurrentTime();
    console.debug(`[${now}] [DEBUG] ${message}`, optionalParams);
    this.writeToFile(`[${now}] [LOG] ${message} ${optionalParams}`);
  }

  verbose?(message: any, ...optionalParams: any[]) {
    const now = this.getCurrentTime();
    console.info(`[${now}] [VERBOSE] ${message}`, optionalParams);
    this.writeToFile(`[${now}] [LOG] ${message} ${optionalParams}`);
  }

  private getCurrentTime(): string {
    return moment().tz(this.timezone).format('DD/MM/YYYY HH:mm:ss');
  }

  private ensureLogDirectoryExists(): void {
    const logDirectory = this.logFilePath.substring(
      0,
      this.logFilePath.lastIndexOf('/'),
    );
    if (!existsSync(logDirectory)) {
      mkdirSync(logDirectory, { recursive: true });
    }
  }

  private writeToFile(log: string): void {
    if (this.logFileEnabled === 'true') {
      appendFileSync(this.logFilePath, log + '\n', 'utf8');
    }
  }
}
