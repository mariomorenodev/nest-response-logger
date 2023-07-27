import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { NestResponseLoggerService } from './nest-response-logger.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly logger = new NestResponseLoggerService();

  intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const { originalUrl, ip, method, params, query, body } = req;
    const controllers = context.getClass().name;
    const methodName = context.getHandler().name;

    return next.handle().pipe(
      // Registra la información de la petición en los logs
      tap((data) => {
        const statusCode: number = context
          .switchToHttp()
          .getResponse().statusCode;
        const enableLog: boolean = data.enableLog ?? false;

        if (enableLog) {
          this.logger.log(
            `statusCode: ${statusCode} - IP: ${ip} - originalUrl: ${originalUrl} - methodHttp: ${method} - params: ${JSON.stringify(
              params,
            )} - query: ${JSON.stringify(query)} - body: ${JSON.stringify(
              body,
            )} - controllers: ${controllers} - method: ${methodName} - response: ${JSON.stringify(
              data,
            )}`,
          );
        }

        return data;
      }),
      // Maneja el error capturado en el servicio si ocurre y registrarlo en los logs
      catchError((error) => {
        const statusCode: number = error.getStatus() ?? 500;
        const message = error.message ?? 'Internal server error';
        const stack = error.stack ?? 'No stack trace';

        this.logger.error(
          `statusCode: ${statusCode} - IP: ${ip} - originalUrl: ${originalUrl} - methodHttp: ${method} - params: ${JSON.stringify(
            params,
          )} - query: ${JSON.stringify(query)} - body: ${JSON.stringify(
            body,
          )} - controllers: ${controllers} - method: ${methodName} - Error: ${message} - ${stack}`,
        );

        return throwError(() => error);
      }),
    );
  }
}
