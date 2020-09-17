import { createLogger, format, transports } from 'winston';

const { combine, timestamp, label, printf, colorize, align, splat } = format;

const logsFormat = printf(info => {
  const ts = info.timestamp.slice(0, 19).replace('T', ' ');
  return `${ts} ${info.level} ${info.label}: ${info.message}`;
});

const Logger = fileName => {
  let level = 'info';
  if (process.env.DEBUG) {
    level = 'debug';
  }
  const consoleLogger = new transports.Console({
    level,
    format: combine(
      colorize(),
      timestamp(),
      align(),
      label({ label: fileName }),
      splat(),
      logsFormat,
    ),
  });
  const fileLogger = new transports.File({
    filename: `logs/combined.log`,
    level: 'debug',
    maxsize: 5242880, // 5 mb
    maxFiles: 2,
    format: combine(timestamp(), align(), label({ label: fileName }), splat(), logsFormat),
  });
  const transportsArray = [fileLogger];
  if (process.env.NODE_ENV !== 'test') {
    transportsArray.push(consoleLogger);
  }
  const logger = createLogger({
    transports: transportsArray,
  });
  return logger;
};

module.exports = Logger;

// {
//   error: 0,
//   warn: 1,
//   info: 2,
//   verbose: 3,
//   debug: 4,
//   silly: 5
// }
