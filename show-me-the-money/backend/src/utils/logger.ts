import { createLogger, format, Logger, transports } from 'winston';

const logger: Logger = createLogger({
  level: 'debug',
  format: format.combine(
    format.errors({ stack: true }),
    format.timestamp(),
    format.splat(),
    format.printf(info => {
      const log: string = `${info.timestamp} ${info.level} - ${info.message}`;

      return info.stack
        ? `${log}\n${info.stack}`
        : log;
    }),
  ),
  transports: [
    new transports.Console(),
  ],
});

export default logger;
