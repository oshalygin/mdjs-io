import { post } from './registrationController';
import sinon from 'sinon';
import moxios from 'moxios';
import { REGISTRATION_ENDPOINT } from '../../utilities/endpoints';

describe('Registration Controller', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const registrationEndpoint = REGISTRATION_ENDPOINT;

  const accountPayload = {
    data: {
      data: {
        token: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e',
      },
    },
  };

  const userRegistration = {
    email: 'oshalygin1@gmail.com',
    password: 'olegwin',
    confirmPassword: 'olegwin',
    firstName: 'Oleg',
    lastName: 'Shalygin',
    phoneNumber: '1234567890',
    referrer: 'test',
  };

  it('should return a 400 status code if the email is null', () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy,
    });

    const response = {
      status: statusStub,
    };

    const request = {
      params: {},
      body: {
        ...userRegistration,
        email: null,
      },
    };

    post(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return a 400 status code if the password is null', () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy,
    });

    const response = {
      status: statusStub,
    };

    const request = {
      params: {},
      body: {
        ...userRegistration,
        password: null,
      },
    };

    post(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return a 400 status code if the confirmPassword is null', () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy,
    });

    const response = {
      status: statusStub,
    };

    const request = {
      params: {},
      body: {
        ...userRegistration,
        confirmPassword: null,
      },
    };

    post(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return a 400 status code if the firstName is null', () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy,
    });

    const response = {
      status: statusStub,
    };

    const request = {
      params: {},
      body: {
        ...userRegistration,
        firstName: null,
      },
    };

    post(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return a 400 status code if the referrer is null', () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy,
    });

    const response = {
      status: statusStub,
    };

    const request = {
      params: {},
      body: {
        ...userRegistration,
        referrer: null,
      },
    };

    post(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return a 400 status code if the lastName is null', () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy,
    });

    const response = {
      status: statusStub,
    };

    const request = {
      params: {},
      body: {
        ...userRegistration,
        lastName: null,
      },
    };

    post(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return a 400 status code if the phoneNumber is null', () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy,
    });

    const response = {
      status: statusStub,
    };

    const request = {
      params: {},
      body: {
        ...userRegistration,
        phoneNumber: null,
      },
    };

    post(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return a 400 status code if the password does not match the confirmPassword', () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy,
    });

    const response = {
      status: statusStub,
    };

    const request = {
      params: {},
      body: {
        ...userRegistration,
        password: 'foobar',
        confirmPassword: 'fOobar',
      },
    };

    post(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return a 200 status code if all the required parameters were passed in', () => {
    moxios.stubRequest(registrationEndpoint, {
      status: 200,
      response: accountPayload,
    });

    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      json: jsonSpy,
    });

    const response = {
      status: statusStub,
    };

    const request = {
      params: {},
      body: userRegistration,
    };

    const userDataAccess = require('../../dataAccess/userDataAccess');
    userDataAccess.findOneAndUpdate = () => Promise.resolve();

    return post(request, response).then(() => {
      const actual = statusStub.calledWith(200);
      expect(actual).toEqual(expected);
    });
  });

  it('should return a 400 if an error is thrown through the request', () => {
    const serverResponse = {
      response: {
        data: {
          message: 'Invalid username or password',
        },
      },
    };

    moxios.stubRequest(registrationEndpoint, {
      status: 405,
      response: serverResponse,
    });

    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy,
    });

    const response = {
      status: statusStub,
    };

    const request = {
      params: {},
      body: userRegistration,
    };

    return post(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).toEqual(expected);
    });
  });

  it('should return a 400 if the response object has null data', () => {
    const serverResponse = {
      response: {
        data: null,
      },
    };

    moxios.stubRequest(registrationEndpoint, {
      status: 200,
      response: serverResponse,
    });

    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy,
    });

    const response = {
      status: statusStub,
    };

    const request = {
      params: {},
      body: userRegistration,
    };

    return post(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).toEqual(expected);
    });
  });

  it('should return a the token from a successful response on a POST call', () => {
    moxios.stubRequest(registrationEndpoint, {
      status: 200,
      response: accountPayload,
    });

    const tokenResponse = {
      token: accountPayload.data.token,
    };

    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      json: jsonSpy,
    });

    const response = {
      status: statusStub,
    };

    const request = {
      params: {},
      body: userRegistration,
    };

    const userDataAccess = require('../../dataAccess/userDataAccess');
    userDataAccess.findOneAndUpdate = () => Promise.resolve();

    return post(request, response).then(() => {
      const actual = jsonSpy.calledWith(tokenResponse);
      expect(actual).toEqual(expected);
    });
  });
});
