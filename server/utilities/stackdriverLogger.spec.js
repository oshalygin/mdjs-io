/* eslint-disable camelcase */
import StackdriverLogger from './stackdriverLogger';

import { expect } from 'chai';

describe('Stackdriver Logger - Winston Transport', () => {
  const baseOptions = {
    inspectMetadata: true,
    resource: {
      type: 'container',
      labels: {
        project_id: 'mdjs-io',
        cluster_name: '',
        namespace_id: 'default',
        instance_id: '',
        pod_id: '',
        container_name: '',
        zone: '',
      },
    },
  };

  it('should set the scopes to include logging.write', () => {
    const expected = {
      ...baseOptions,
      scopes: ['https://www.googleapis.com/auth/logging.write'],
    };

    const logger = new StackdriverLogger(baseOptions);
    const actual = logger.options;

    expect(actual).deep.equals(expected);
  });

  it('should set the metadata on logEntry to include the default logName as "fe-web"', () => {
    const expected = 'fe-web';

    const logger = new StackdriverLogger(baseOptions);
    const actual = logger.logEntry.name;

    expect(actual).equals(expected);
  });

  it('should set the message from the log message on the data object', () => {
    const levelName = 'warn';
    const logMessage = 'HTTP 302 /api/v1/item';
    const logMetadata = () => {};
    const callback = () => {};

    const expected = logMessage;

    const logger = new StackdriverLogger(baseOptions);
    const actual = logger.log(levelName, logMessage, logMetadata, callback).data
      .message;

    expect(actual).equals(expected);
  });

  it('should set the request headers on the data request object', () => {
    const levelName = 'warn';
    const logMessage = 'HTTP 302 /api/v1/item';
    const logMetadata = {
      request: {
        headers: {
          'content-type': 'application/json',
        },
      },
      response: {
        status: 200,
      },
    };

    const callback = () => {};

    const expected = logMetadata.request.headers['content-type'];

    const logger = new StackdriverLogger(baseOptions);
    const actual = logger.log(levelName, logMessage, logMetadata, callback).data
      .request.headers['content-type'];

    expect(actual).equals(expected);
  });

  it('should set the request body on the data request object', () => {
    const levelName = 'warn';
    const logMessage = 'HTTP 302 /api/v1/item';
    const logMetadata = {
      request: {
        headers: {
          'content-type': 'application/json',
        },
        body: {
          id: 'fc170f7b-268f-485d-befe-dfa00421e3c1',
          name: 'test',
          updatedBy: 'fc170f7b-268f-485d-befe-dfa00421e3c1',
        },
      },
      response: {
        status: 200,
      },
    };

    const callback = () => {};

    const expected = logMetadata.request.body;

    const logger = new StackdriverLogger(baseOptions);
    const actual = logger.log(levelName, logMessage, logMetadata, callback).data
      .request.body;

    expect(actual).deep.equals(expected);
  });

  it('should set the response body on the data response object', () => {
    const levelName = 'warn';
    const logMessage = 'HTTP 302 /api/v1/item';
    const logMetadata = {
      request: {
        headers: {
          'content-type': 'application/json',
        },
      },
      response: {
        status: 200,
        body: {
          id: 'fc170f7b-268f-485d-befe-dfa00421e3c1',
          name: 'test',
          updatedBy: 'fc170f7b-268f-485d-befe-dfa00421e3c1',
        },
      },
    };

    const callback = () => {};

    const expected = logMetadata.response.body;

    const logger = new StackdriverLogger(baseOptions);
    const actual = logger.log(levelName, logMessage, logMetadata, callback).data
      .response.body;

    expect(actual).deep.equals(expected);
  });

  it('should set the executionTimeMillis of the data object off of the metadata responseTime', () => {
    const levelName = 'warn';
    const logMessage = 'HTTP 302 /api/v1/item';
    const logMetadata = {
      request: {
        headers: {
          'content-type': 'application/json',
        },
      },
      response: {
        status: 200,
      },
      responseTime: 300,
    };

    const callback = () => {};

    const expected = logMetadata.responseTime;

    const logger = new StackdriverLogger(baseOptions);
    const actual = logger.log(levelName, logMessage, logMetadata, callback).data
      .executionTimeMillis;

    expect(actual).equals(expected);
  });

  it('should persist the stacktrace space separated from the message if it was included with the metadata', () => {
    const stackTrace =
      'Failed to run compilers on server/utilities/stackdriverLogger.spec.js, SyntaxError: server/ut';
    const levelName = 'warn';
    const logMessage = 'HTTP 302 /api/v1/item';
    const logMetadata = {
      stack: stackTrace,
      request: {
        headers: {
          'content-type': 'application/json',
        },
      },
      response: {
        status: 200,
        body: {
          id: 'fc170f7b-268f-485d-befe-dfa00421e3c1',
          name: 'test',
          updatedBy: 'fc170f7b-268f-485d-befe-dfa00421e3c1',
        },
      },
    };
    const callback = () => {};

    const expected = `${logMessage} ${stackTrace}`;

    const logger = new StackdriverLogger(baseOptions);

    const actual = logger.log(levelName, logMessage, logMetadata, callback).data
      .message;

    expect(actual).equals(expected);
  });

  it('should persist the stacktrace if it was included with the metadata', () => {
    const stackTrace =
      'Failed to run compilers on server/utilities/stackdriverLogger.spec.js, SyntaxError: server/ut';
    const levelName = 'warn';
    const logMessage = '';
    const logMetadata = {
      stack: stackTrace,
      request: {
        headers: {
          'content-type': 'application/json',
        },
      },
      response: {
        status: 200,
        body: {
          id: 'fc170f7b-268f-485d-befe-dfa00421e3c1',
          name: 'test',
          updatedBy: 'fc170f7b-268f-485d-befe-dfa00421e3c1',
        },
      },
    };
    const callback = () => {};

    const expected = stackTrace;

    const logger = new StackdriverLogger(baseOptions);

    const actual = logger.log(levelName, logMessage, logMetadata, callback).data
      .message;

    expect(actual).equals(expected);
  });

  it('should set the "x-cloud-trace-context" http header on the request metadata as a label', () => {
    const levelName = 'warn';
    const logMessage = 'HTTP 302 /api/v1/item';
    const logMetadata = {
      request: {
        headers: {
          'content-type': 'application/json',
          'x-cloud-trace-context': 'abcd-1234',
        },
      },
      response: {
        status: 200,
      },
    };

    const callback = () => {};

    const expected = logMetadata.request.headers['x-cloud-trace-context'];

    const logger = new StackdriverLogger(baseOptions);
    const actual = logger.log(levelName, logMessage, logMetadata, callback)
      .metadata.labels.traceId;

    expect(actual).deep.equals(expected);
  });

  it('should set the "x-cloud-trace-context" header value to an empty string if it was not set', () => {
    const levelName = 'warn';
    const logMessage = 'HTTP 302 /api/v1/item';
    const logMetadata = {
      request: {
        headers: {
          'content-type': 'application/json',
        },
      },
      response: {
        status: 200,
      },
    };

    const callback = () => {};

    const expected = '';

    const logger = new StackdriverLogger(baseOptions);
    const actual = logger.log(levelName, logMessage, logMetadata, callback)
      .metadata.labels.traceId;

    expect(actual).deep.equals(expected);
  });
});
