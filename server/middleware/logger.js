import winston from 'winston';
import expressWinston from 'express-winston';
import configuration from '../utilities/configuration';

const colorize = configuration.environment !== 'production'; //eslint-disable-line no-process-env

export function parseIgnoredRoutes(request, response) { //eslint-disable-line
  const healthCheckUrl = '/healthz';
  if (request.url === healthCheckUrl && response.statusCode < 400) {
    return true;
  }

  if (request.url === '/' && response.statusCode === 200) {
    return true;
  }

  return false;
}

// Logger to capture all requests and output them to the console.
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: false,
      colorize,
    }),
  ],
  ignoreRoute: parseIgnoredRoutes,
  expressFormat: true,
  meta: false,
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize,
    }),
  ],
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
  silly: winston.silly,
};

export default logger;
