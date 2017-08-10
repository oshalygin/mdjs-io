/* eslint-disable camelcase */
import winston from 'winston';
import is from 'is';
import logging from '@google-cloud/logging';

import configuration from './configuration';

const NPM_OUTPUT_LEVELS = {
  error: 3,
  warn: 4,
  info: 6,
  verbose: 7,
  debug: 7,
  silly: 7,
};

const STACKDRIVER_LOGGING_LEVEL_ENUM = [
  'emergency',
  'alert',
  'critical',
  'error',
  'warning',
  'notice',
  'info',
  'debug',
];

class StackdriverLogger extends winston.Transport {
  constructor(options) {
    super(options);

    this.options = {
      ...options,
      scopes: ['https://www.googleapis.com/auth/logging.write'],
    };

    this.levels = options.levels || NPM_OUTPUT_LEVELS;
    this.resource = {
      type: 'container',
      labels: {
        project_id: configuration.googleProject,
        cluster_name: configuration.clusterName,
        namespace_id: 'default',
        instance_id: '',
        pod_id: configuration.podId,
        container_name: configuration.containerName,
        zone: configuration.clusterZone,
      },
    };

    const logName = options.logName || 'fe-web';
    this.logEntry = logging(options).log(logName);

    winston.Transport.call(this, {
      level: options.level,
      name: logName,
    });

    this.log = this.log.bind(this);
  }

  log(levelName, logMessage, logMetadata, logCallback) {
    try {
      const { levels, logEntry, resource } = this;

      let message = logMessage;
      let callback = logCallback;
      let metadata = logMetadata;

      if (is.function(metadata)) {
        callback = metadata;
        metadata = {};
      }

      if (!levels[levelName]) {
        throw new Error(`Unknown log level: ${levelName}`);
      }

      const levelCode = levels[levelName];
      const stackdriverLevel = STACKDRIVER_LOGGING_LEVEL_ENUM[levelCode];

      const entryMetadata = {
        resource,
        labels: {},
      };

      if (metadata && metadata.stack) {
        const separator = logMessage ? ' ' : '';
        message = `${logMessage}${separator}${metadata.stack}`;
      }

      const data = {
        message,
      };

      if (metadata && metadata.request) {
        data.request = metadata.request;

        entryMetadata.labels.traceId =
          metadata.request.headers &&
          metadata.request.headers['x-cloud-trace-context']
            ? metadata.request.headers['x-cloud-trace-context']
            : '';
      }

      if (metadata && metadata.response) {
        data.response = metadata.response;
        data.executionTimeMillis = metadata.responseTime;
      }

      const entry = logEntry.entry(entryMetadata, data);
      logEntry[stackdriverLevel](entry, callback);
      return entry;
    } catch (error) {
      throw error;
    }
  }
}

winston.transports.StackdriverLogging = StackdriverLogger;

export default StackdriverLogger;
