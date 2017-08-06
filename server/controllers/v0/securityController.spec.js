import { expect } from 'chai';
import sinon from 'sinon';

import securityController from './securityController';

describe('V0 - Security Controller', () => {
  const forgotPasswordPostBody = {
    email: 'oshalygin@gmail.com',
  };

  const loginPostBody = {
    email: 'oshalygin@gmail.com',
    password: 'Password1234!',
    rememberMe: false,
  };

  const forgotPasswordPostBodyResponseObject = {
    data: {
      ...forgotPasswordPostBody,
    },
  };

  const loginPostBodyResponseObject = { data: { ...loginPostBody } };

  it('should make a post to the forgot password endpoint', async () => {
    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ json: jsonSpy });

    const api = require('../../utilities/api');
    api.default = {
      post: () => () => Promise.resolve(forgotPasswordPostBodyResponseObject),
    };

    const response = {
      status: statusStub,
    };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...forgotPasswordPostBodyResponseObject },
    };

    await securityController.forgotPassword(request, response);

    const actual = jsonSpy.called;
    expect(actual).equals(expected);
  });

  it('should send a 400 status code if the response from the forgot password endpoint threw an error', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.reject() };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...forgotPasswordPostBodyResponseObject },
    };

    await securityController.forgotPassword(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });

  it('should return with a 400 if the post body on the forgot password endpoint is null', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
    };

    await securityController.forgotPassword(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });

  it('should return with a 400 if the forgot password endpoint was called with an id', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {
        id: 3,
      },
    };

    await securityController.forgotPassword(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });

  it('should make a post to the login endpoint', async () => {
    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ json: jsonSpy });

    const api = require('../../utilities/api');
    api.default = {
      post: () => () => Promise.resolve(loginPostBodyResponseObject),
    };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...loginPostBody },
    };

    await securityController.login(request, response);

    const actual = jsonSpy.called;
    expect(actual).equals(expected);
  });

  it('should send a 400 status code if the response from the login endpoint threw an error', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.reject() };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...loginPostBody },
    };

    await securityController.login(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });

  it('should return with a 400 if the post body on the login endpoint is null', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
    };

    await securityController.login(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });

  it('should return with a 400 if the login endpoint was called with an id', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: { id: 3 },
    };

    await securityController.login(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });
});
