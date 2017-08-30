import hstsMiddleware from './hsts';
import sinon from 'sinon';

describe('HSTS Middleware', () => {
  it('should proceed if the request is secure', () => {
    const request = {
      secure: true,
    };

    const response = {
      status: sinon.stub().returns({
        send() {},
      }),
    };

    const next = sinon.spy();

    const expected = true;
    hstsMiddleware()(request, response, next);

    const actual = next.called;
    expect(actual).toEqual(expected);
  });

  it('should redirect if request was not secure', () => {
    const request = {
      originalUrl: '/',
      headers: {
        host: 'local.com',
      },
      secure: false,
      method: 'GET',
    };

    const response = {
      redirect: sinon.spy(),
      status: sinon.stub().returns({
        send() {},
      }),
    };

    const next = sinon.spy();

    const expected = true;
    hstsMiddleware()(request, response, next);

    const actual = response.redirect.called;
    expect(actual).toEqual(expected);
  });

  it('should redirect to the requested url with https', () => {
    const request = {
      originalUrl: '/foobar',
      headers: {
        host: 'local.com',
      },
      secure: false,
      method: 'GET',
    };

    const response = {
      redirect: sinon.spy(),
      status: sinon.stub().returns({
        send() {},
      }),
    };

    const next = sinon.spy();
    const redirectUri = `https://${request.headers.host}${request.originalUrl}`;

    const expected = true;
    hstsMiddleware()(request, response, next);

    const actual = response.redirect.calledWith(301, redirectUri);
    expect(actual).toEqual(expected);
  });

  it('should send back 403 if the request is not a GET over HTTP', () => {
    const request = {
      originalUrl: '/foobar',
      headers: {
        host: 'local.com',
      },
      secure: false,
      method: 'POST',
    };

    const response = {
      redirect: sinon.spy(),
      status: sinon.stub().returns({
        send() {},
      }),
    };

    const next = sinon.spy();

    const expected = true;
    hstsMiddleware()(request, response, next);

    const actual = response.status.calledWith(403);
    expect(actual).toEqual(expected);
  });

  it('should proceed if the request is from a health readiness check on /healthz', () => {
    const request = {
      secure: false,
      originalUrl: '/healthz',
    };

    const response = {
      status: sinon.stub().returns({
        send() {},
      }),
    };

    const next = sinon.spy();

    const expected = true;
    hstsMiddleware()(request, response, next);

    const actual = next.called;
    expect(actual).toEqual(expected);
  });
});
