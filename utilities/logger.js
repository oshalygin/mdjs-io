import winston from 'winston';
import expressWinston from 'express-winston';
import configuration from '../utilities/configuration';

const colorize = configuration.environment !== 'production'; //eslint-disable-line no-process-env

// Logger to capture all requests and output them to the console.
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: false,
      colorize
    })
  ],
  expressFormat: true,
  meta: false
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize
    })
  ]
});

const logger = {
  requestLogger,
  errorLogger,
  error: winston.error,
  warn: winston.warn,
  info: winston.info,
  log: winston.log,
  verbose: winston.verbose,
  debug: winston.debug,
  silly: winston.silly
};

export default logger;
