import { parseIgnoredRoutes } from './logger';

describe('Logger Middleware', () => {
  it('should NOT log the message if the healthcheck returns a 200 status', () => {
    const request = {
      url: '/healthz',
    };
    const response = {
      statusCode: 200,
    };

    const expected = true;
    const actual = parseIgnoredRoutes(request, response);

    expect(actual).toEqual(expected);
  });

  it('should NOT log the message if the default route returns a 200 status', () => {
    const request = { url: '/' };
    const response = { statusCode: 200 };

    const expected = true;
    const actual = parseIgnoredRoutes(request, response);

    expect(actual).toEqual(expected);
  });

  it('should log the message if the healthcheck returns a 400 status', () => {
    const request = {
      url: '/healthz',
    };
    const response = {
      statusCode: 400,
    };

    const expected = false;
    const actual = parseIgnoredRoutes(request, response);

    expect(actual).toEqual(expected);
  });

  it('should log the message if the default route returns a 400 status', () => {
    const request = { url: '/' };
    const response = { statusCode: 400 };

    const expected = false;
    const actual = parseIgnoredRoutes(request, response);

    expect(actual).toEqual(expected);
  });

  it('should log the message if the url is not /healthz', () => {
    const request = {
      url: '/foo',
    };
    const response = {
      statusCode: 200,
    };

    const expected = false;
    const actual = parseIgnoredRoutes(request, response);

    expect(actual).toEqual(expected);
  });
});
