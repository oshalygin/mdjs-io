import is from 'is';

import {
  getJsonHeaders,
  getHeaders,
  errorApiResponse,
  warningApiResponse,
} from './requestUtilities';

import sinon from 'sinon';

describe('Request Utilities', () => {
  const token = '15761087-2541-4e23-8050-ebeeb1b0a981';

  it('should return Content-Type, "application/json" when requesting the default json headers', () => {
    const expected = 'application/json';
    const actual = getJsonHeaders().headers['Content-Type'];

    expect(actual).toEqual(expected);
  });

  it('should return Content-Type, "application/json" when requesting headers with a token', () => {
    const expected = 'application/json';
    const actual = getHeaders(token).headers['Content-Type'];

    expect(actual).toEqual(expected);
  });

  it('should return Authorization with the token when requesting headers with a token', () => {
    const expected = token;
    const actual = getHeaders(token).headers.Authorization;

    expect(actual).toEqual(expected);
  });

  it('should curry the api error response with a function that contains the status, message and error', () => {
    const expected = true;

    const response = errorApiResponse(400, 'Bad Request', {});
    const actual = is.function(response);

    expect(actual).toEqual(expected);
  });

  it('should curry the api warning response with a function that contains the status, message and error', () => {
    const expected = true;

    const response = warningApiResponse(404, 'Bad Request', {});
    const actual = is.function(response);

    expect(actual).toEqual(expected);
  });

  it('should return the response object with the error status code that was passed in', () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const request = {};

    const response = { status: statusStub };

    errorApiResponse(400, 'Bad Request', {})(request, response);
    const actual = statusStub.calledWith(400);

    expect(actual).toEqual(expected);
  });

  it('should send the response message that was sent on an error response', () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const request = {};

    const response = { status: statusStub };

    errorApiResponse(400, 'Bad Request', {})(request, response);
    const actual = sendSpy.calledWith('Bad Request');

    expect(actual).toEqual(expected);
  });

  it('should return the response object with the warning status code that was passed in', () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const request = {};

    const response = { status: statusStub };

    warningApiResponse(404, 'Not found', {})(request, response);
    const actual = statusStub.calledWith(404);

    expect(actual).toEqual(expected);
  });

  it('should send the response message that was sent on a warning response', () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const request = {};

    const response = { status: statusStub };

    warningApiResponse(404, 'Not Found', {})(request, response);
    const actual = sendSpy.calledWith('Not Found');

    expect(actual).toEqual(expected);
  });
});
