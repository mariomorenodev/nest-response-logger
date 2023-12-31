import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, HttpStatus, HttpException } from '@nestjs/common';
import { of, firstValueFrom } from 'rxjs';

import { LoggerInterceptor } from './logger.interceptor';

describe('LoggerInterceptor', () => {
  let interceptor: LoggerInterceptor;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [LoggerInterceptor],
    }).compile();

    interceptor = moduleRef.get<LoggerInterceptor>(LoggerInterceptor);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Record log when response is correct and enableLog is true', async () => {
    const value = { enableLog: true };
    const context = createMockContext(HttpStatus.OK);
    const next = createMockNext({ enableLog: true });

    const result = await firstValueFrom(
      interceptor.intercept(context as any, next as any),
    );

    expect(result).toEqual(value);
  });

  it('Don not log when response is correct and enableLog log es false', async () => {
    const value = { enableLog: false };
    const context = createMockContext(HttpStatus.OK);
    const next = createMockNext({ enableLog: false });

    const result = await firstValueFrom(
      interceptor.intercept(context as any, next as any),
    );

    expect(result).toEqual(value);
  });

  it('Record log when response is error', async () => {
    const value = new HttpException('Internal server error', HttpStatus.OK);
    const context = createMockContext(HttpStatus.OK);
    const next = createMockNext(
      new HttpException('Internal server error', HttpStatus.OK),
    );

    const result = await firstValueFrom(
      interceptor.intercept(context as any, next as any),
    );

    expect(result).toEqual(value);
  });

  function createMockContext(statusCode: number): ExecutionContext {
    return {
      switchToHttp: () => ({
        getRequest: () => ({
          method: 'GET',
          originalUrl: '/',
          ip: '::1',
          params: {},
          query: {},
          body: {},
        }),
        getResponse: () => ({
          statusCode,
        }),
      }),
      getClass: () => ({
        name: 'AppController',
      }),
      getHandler: () => ({
        name: 'getHello',
      }),
    } as ExecutionContext;
  }

  function createMockNext(result: any): any {
    return {
      handle: () => of(result),
    };
  }
});
