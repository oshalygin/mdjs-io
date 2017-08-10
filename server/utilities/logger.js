/* eslint-disable indent */
import winston from 'winston';
import expressWinston from 'express-winston';
import is from 'is';

import stackdriverTransport from './stackdriverLogger';
import configuration from './configuration';

// For more information in regards to whitelisting:
// https://github.com/bithavoc/express-winston#global-whitelists-and-blacklists
expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');
winston.add(stackdriverTransport, { inspectMetadata: true });

let loggerConfiguration;
if (configuration.environment === 'production') {
  winston.remove(winston.transports.Console);
  loggerConfiguration = {
    colorize: false,
    expressFormat: true,
    meta: true,
  };
} else {
  loggerConfiguration = {
    colorize: true,
    expressFormat: true,
    meta: false,
  };
}

export function parseSuccessfulHealthChecks(request, response) {
  const healthCheckUrl = '/healthz';
  const skipLogging =
    request.url === healthCheckUrl && response.statusCode < 400;

  return skipLogging;
}

const logMessage = (statusCode, message, request) =>
  `${statusCode} ${request.method} ${request.originalUrl} - ${message}`;
const metadata = request => ({
  request: {
    body: request.body,
    headers: request.headers,
    originalUrl: request.originalUrl,
    httpVersion: request.httpVersion,
    query: request.query,
    responseTime: request.responseTime,
    method: request.method,
  },
});

const info = (statusCode, message, request) =>
  winston.log(
    'info',
    logMessage(statusCode, message, request),
    metadata(request),
  );
const warn = (statusCode, message, request) =>
  winston.log(
    'warn',
    logMessage(statusCode, message, request),
    metadata(request),
  );
const error = (statusCode, message, request) =>
  winston.log(
    'error',
    logMessage(statusCode, message, request),
    metadata(request),
  );
const debug = (statusCode, message, request) =>
  winston.log(
    'debug',
    logMessage(statusCode, message, request),
    metadata(request),
  );
const log = (statusCode, message, request) =>
  winston.log(
    'info',
    logMessage(statusCode, message, request),
    metadata(request),
  );

const logApiError = errorResponse => {
  winston.log('error', 'Service Error Response', errorResponse);
};

const requestLogger = expressWinston.logger({
  ignoreRoute: parseSuccessfulHealthChecks,
  winstonInstance: winston,
  expressFormat: loggerConfiguration.expressFormat,
  meta: loggerConfiguration.meta,
  colorize: loggerConfiguration.colorize,
  dynamicMeta: (req, res) => {
    const responseHeaders = { ...res._headers }; //eslint-disable-line no-underscore-dangle
    const responseBody = is.array(res.body) ? [...res.body] : { ...res.body };

    return {
      request: {
        body: req.body,
        headers: req.headers,
        originalUrl: req.originalUrl,
        httpVersion: req.httpVersion,
        query: req.query,
        responseTime: req.responseTime,
        method: req.method,
      },
      response: {
        body: responseBody,
        headers: responseHeaders,
      },
    };
  },
});

const errorLogger = expressWinston.errorLogger({
  winstonInstance: winston,
  meta: true,
  showStack: true,
  dumpExceptions: true,
});

export default {
  logApiError,
  requestLogger,
  errorLogger,
  error,
  warn,
  info,
  log,
  debug,
};
