import { WSAEDESTADDRREQ } from 'constants';
import winston from 'winston';
import DailyRotateFile = require("winston-daily-rotate-file");

export default class AppLogger {

  private static instance: AppLogger;
  private logger: winston.Logger;

  private constructor() {

    const transport = new DailyRotateFile({
      filename: 'application-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d'
    });

    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: 'user-service'},
      transports: [
        new winston.transports.File({filename: 'error.log', level: 'error'}),
        transport
      ]
    });
    this.initLogger();
  }

  private initLogger() {
    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(new winston.transports.Console({
        format: winston.format.simple(),
      }));
    };
  }

  public static getInstance(): AppLogger {
    if (!AppLogger.instance) {
      AppLogger.instance = new AppLogger();
    }
    return AppLogger.instance;
  }

  public info(message: string, data? : any) {
    this.logger.info(message, data);
  }

  public error(message: string, err? : any) {
    this.logger.error(message, err);
  }
}