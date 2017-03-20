import { post } from './accountController';
import sinon from 'sinon';
import moxios from 'moxios';
import { LOGIN_ENDPOINT } from '../utilities/endpoints';

import { expect } from 'chai';

describe('Account Controller', () => {

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const loginEndpoint = LOGIN_ENDPOINT;

  const accountPayload = {
    data: {
      token: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e'
    }
  };

  it('should return a 400 status code if the username is null', () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy
    });

    const response = {
      status: statusStub
    };

    const request = {
      params: {},
      body: {
        password: 'password12345!'
      }
    };

    post(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);

  });

  it('should return a 400 status code if the password is null', () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy
    });

    const response = {
      status: statusStub
    };

    const request = {
      params: {},
      body: {
        username: 'oshalygin@gmail.com'
      }
    };

    post(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);

  });

  it('should return a 200 status code if both the username and password were passed', () => {


    moxios.stubRequest(loginEndpoint, {
      status: 200,
      response: accountPayload
    });

    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      json: jsonSpy
    });

    const response = {
      status: statusStub
    };

    const request = {
      params: {},
      body: {
        username: 'oshalygin@gmail.com',
        password: 'password12345!'
      }
    };

    return post(request, response).then(() => {
      const actual = statusStub.calledWith(200);
      expect(actual).equals(expected);
    });

  });

  it('should return a 400 if an error is thrown through the request', () => {

    const serverResponse = {
      response: {
        data: {
          message: 'Invalid username or password'
        }
      }
    };

    moxios.stubRequest(loginEndpoint, {
      status: 405,
      response: serverResponse
    });

    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy
    });

    const response = {
      status: statusStub
    };

    const request = {
      params: {},
      body: {
        username: 'oshalygin@gmail.com',
        password: 'password12345!'
      }
    };

    return post(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).equals(expected);
    });

  });

  it('should return a 400 if the response object has null data', () => {

    const serverResponse = {
      response: {
        data: null
      }
    };

    moxios.stubRequest(loginEndpoint, {
      status: 200,
      response: serverResponse
    });

    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy
    });

    const response = {
      status: statusStub
    };

    const request = {
      params: {},
      body: {
        username: 'oshalygin@gmail.com',
        password: 'password12345!'
      }
    };

    return post(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).equals(expected);
    });

  });

  it('should return a the token from a successful response', () => {

    moxios.stubRequest(loginEndpoint, {
      status: 200,
      response: accountPayload
    });

    const tokenResponse = {
      token: accountPayload.data.token
    };

    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      json: jsonSpy
    });

    const response = {
      status: statusStub
    };

    const request = {
      params: {},
      body: {
        username: 'oshalygin@gmail.com',
        password: 'password12345!'
      }
    };

    return post(request, response).then(() => {
      const actual = jsonSpy.calledWith(tokenResponse);
      expect(actual).equals(expected);
    });

  });


});
