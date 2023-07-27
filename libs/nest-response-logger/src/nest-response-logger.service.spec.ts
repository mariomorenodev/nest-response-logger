import { Test, TestingModule } from '@nestjs/testing';
import { NestResponseLoggerService } from './nest-response-logger.service';

describe('NestResponseLoggerService', () => {
  let loggerService: NestResponseLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NestResponseLoggerService],
    }).compile();

    loggerService = module.get<NestResponseLoggerService>(
      NestResponseLoggerService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Registrar logger console log', () => {
    const message = 'This is a log message';
    const logSpy = jest.spyOn(console, 'log');

    loggerService.log(message);

    const regex = /\[LOG\] This is a log message/;
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringMatching(regex),
      expect.any(Array),
    );
  });

  it('Registrar logger console error', () => {
    const message = 'This is a error message';
    const errorSpy = jest.spyOn(console, 'error');

    loggerService.error(message);

    const regex = /\[ERROR\] This is a error message/;
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringMatching(regex),
      expect.any(Array),
    );
  });

  it('Registrar logger console warn', () => {
    const message = 'This is a warn message';
    const warnSpy = jest.spyOn(console, 'warn');

    loggerService.warn(message);

    const regex = /\[WARN\] This is a warn message/;
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringMatching(regex),
      expect.any(Array),
    );
  });

  it('Registrar logger console debug', () => {
    const message = 'This is a debug message';
    const debugSpy = jest.spyOn(console, 'debug');

    loggerService.debug(message);

    const regex = /\[DEBUG\] This is a debug message/;
    expect(debugSpy).toHaveBeenCalledWith(
      expect.stringMatching(regex),
      expect.any(Array),
    );
  });
});
