import { parseSuccessfulHealthChecks } from './logger';
import { expect } from 'chai';

describe('Logger Middleware', () => {
  it('should NOT log the message if the healthcheck returns a 200 status', () => {
    const request = {
      url: '/healthz',
    };
    const response = {
      statusCode: 200,
    };

    const expected = true;
    const actual = parseSuccessfulHealthChecks(request, response);

    expect(actual).equals(expected);
  });

  it('should log the message if the healthcheck returns a 400 status', () => {
    const request = {
      url: '/healthz',
    };
    const response = {
      statusCode: 400,
    };

    const expected = false;
    const actual = parseSuccessfulHealthChecks(request, response);

    expect(actual).equals(expected);
  });

  it('should log the message if the url is not /healthz', () => {
    const request = {
      url: '/foo',
    };
    const response = {
      statusCode: 200,
    };

    const expected = false;
    const actual = parseSuccessfulHealthChecks(request, response);

    expect(actual).equals(expected);
  });
});
