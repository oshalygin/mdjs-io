import { post, get } from './accountController';
import sinon from 'sinon';
import moxios from 'moxios';
import {
  LOGIN_ENDPOINT,
  LOGIN_TOKEN_ENDPOINT
} from '../../utilities/endpoints';

import { expect } from 'chai';

describe('Account Controller', () => {

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const loginEndpoint = LOGIN_ENDPOINT;
  const loginTokenEndpoint = LOGIN_TOKEN_ENDPOINT;

  const accountPayload = {
    data: {
      token: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e'
    }
  };

  const companyData = {
    companyID: 1,
    receipt: {
      lastUpdatedDate: '2016-07-05T10:44:37.897',
      createdDate: '2016-07-05T10:44:37.897',
      lastUpdatedBy: 1,
      createdBy: 1,
      facilityID: 1,
      website: '',
      photoURL: '',
      name: 'oshalygin@gmail.com',
      phoneNumber: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: 'USA'
    },
    items: [
      {
        itemID: 85,
        itemCategoryID: 0,
        name: 'foobar',
        label: 'foobar',
        color: 0,
        count: 0,
        addedCount: 0,
        barcode: '',
        photoURL: '',
        price: 50.99,
        priceTypeID: 0,
        isShowPhoto: false,
        isTrackInventory: true,
        sku: '',
        modifiers: [],
        itemFlags: 0,
        file: null,
        lastUpdatedDate: '2016-12-12T22:17:12.95',
        createdDate: '2016-12-12T22:17:12.95',
        lastUpdatedBy: 1,
        createdBy: 1,
        isActive: true,
        companyID: 1,
        facilityID: 0
      },
      {
        itemID: 82,
        itemCategoryID: 0,
        name: 'baz',
        label: 'baz',
        color: 0,
        count: 0,
        addedCount: 0,
        barcode: '',
        photoURL: '',
        price: 30.99,
        priceTypeID: 0,
        isShowPhoto: false,
        isTrackInventory: true,
        sku: '',
        modifiers: [],
        itemFlags: 0,
        file: null,
        lastUpdatedDate: '2016-12-12T22:17:12.95',
        createdDate: '2016-12-12T22:17:12.95',
        lastUpdatedBy: 1,
        createdBy: 1,
        isActive: true,
        companyID: 1,
        facilityID: 0
      },
      {
        itemID: 33,
        itemCategoryID: 0,
        name: 'bar',
        label: 'bar',
        color: 0,
        count: 0,
        addedCount: 0,
        barcode: '',
        photoURL: '',
        price: 10.99,
        priceTypeID: 0,
        isShowPhoto: false,
        isTrackInventory: true,
        sku: '',
        modifiers: [],
        itemFlags: 0,
        file: null,
        lastUpdatedDate: '2016-12-12T22:17:12.95',
        createdDate: '2016-12-12T22:17:12.95',
        lastUpdatedBy: 1,
        createdBy: 1,
        isActive: true,
        companyID: 1,
        facilityID: 0
      }
    ],
    categories: [],
    discounts: [],
    taxes: [],
    modifiers: [],
    refundReasons: []
  };

  const user = {
    userID: 1,
    email: 'oshalygin@gmail.com',
    password: 'foobar',
    firstName: '',
    lastName: '',
    referrer: null,
    phoneNumber: null,
    photoURL: '',
    role: 1,
    terminalID: '',
    terminalKey: '',
    roleIdFromModel: null,
    lastUpdatedDate: '2016-07-05T10:44:37.773',
    createdDate: '2016-07-05T10:44:37.773',
    lastUpdatedBy: 0,
    createdBy: 0,
    isActive: true,
    companyID: 1,
    facilityID: 1
  };


  const accountDetailsResponse = {
    companyID: 1,
    token: accountPayload.data.token,
    roleID: 1,
    facilityID: 1,
    refundCode: 1234,
    creditCardStatusID: 7,
    companyData,
    user
  };

  const accountDetailsPayload = {
    data: accountDetailsResponse
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

  it('should return a the token from a successful response on a POST call', () => {

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

  it('should return a the token from a successful response on a GET call', () => {

    moxios.stubRequest(loginTokenEndpoint, {
      status: 200,
      response: accountDetailsPayload
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
      query: {
        token: accountPayload.data.token
      }
    };

    return get(request, response).then(() => {
      const actual = jsonSpy.calledWith(accountDetailsResponse);
      expect(actual).equals(expected);
    });

  });

  it('should return a 400 status code if the token is null', () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy
    });

    const response = {
      status: statusStub
    };

    const request = {
      query: {}
    };

    get(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);

  });

  it('should return a 400 if the account response object has null data on a loginWithToken request', () => {

    const serverResponse = {
      data: null
    };

    moxios.stubRequest(loginTokenEndpoint, {
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
      query: {
        token: accountPayload.data.token
      }
    };

    return get(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).equals(expected);
    });

  });

  it('should return a 400 if an error is thrown through the loginWithToken get request', () => {

    const serverResponse = {
      response: {
        data: {
          message: 'Invalid username or password'
        }
      }
    };

    moxios.stubRequest(loginTokenEndpoint, {
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
      query: {
        token: accountPayload.data.token
      }
    };

    return get(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).equals(expected);
    });

  });

});
