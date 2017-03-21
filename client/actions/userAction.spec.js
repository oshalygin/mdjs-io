/* eslint-disable max-nested-callbacks */
import {
  loginValidationErrors,
  logout,
  login,
  loginWithToken
} from './userActions';
import {
  LOADED_USER_FAILURE,
  LOGOUT_SUCCESS,
  LOADING_USER,
  LOADED_USER_SUCCESS,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_DISCOUNTS_SUCCESS,
  LOAD_TAXES_SUCCESS,
  LOAD_REFUNDREASONS_SUCCESS,
  LOAD_ITEMS_SUCCESS,
  LOAD_MODIFIERS_SUCCESS
} from './actionTypes';

import { ACCOUNT_ENDPOINT } from './httpEndpoints';

import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import sinon from 'sinon';
import { expect } from 'chai';

describe('User Actions', () => {

  let store;
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const tokenResponse = {
    token: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e'
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
    token: tokenResponse.token,
    roleID: 1,
    facilityID: 1,
    refundCode: 1234,
    creditCardStatusID: 7,
    companyData,
    user
  };

  const accountEndpointWithToken = `${ACCOUNT_ENDPOINT}?token=${tokenResponse.token}`;

  beforeEach(() => {
    store = mockStore({});
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should dispatch the "LOADED_USER_FAILURE" action on validation errors when logging in', () => {

    const expected = LOADED_USER_FAILURE;

    return store.dispatch(loginValidationErrors())
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[0];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch "LOGOUT_SUCCESS" when logging out', () => {

    const expected = LOGOUT_SUCCESS;

    return store.dispatch(logout())
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[0];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch "LOADING_USER" when making a call to login', () => {

    moxios.stubRequest(ACCOUNT_ENDPOINT, {
      status: 200,
      response: tokenResponse
    });

    moxios.stubRequest(accountEndpointWithToken, {
      status: 200,
      response: accountDetailsResponse
    });

    const postedUser = {
      email: 'oshalygin@gmail.com',
      password: 'Password12345!'
    };

    const expected = LOADING_USER;

    return store.dispatch(login(postedUser))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[0];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch "LOADED_USER_FAILURE" when making a call to login fails', () => {

    moxios.stubRequest(ACCOUNT_ENDPOINT, {
      status: 400,
      response: {}
    });

    moxios.stubRequest(accountEndpointWithToken, {
      status: 200,
      response: {}
    });

    const postedUser = {
      email: 'oshalygin@gmail.com',
      password: ''
    };

    const expected = LOADED_USER_FAILURE;

    return store.dispatch(login(postedUser))
      .catch(() => {
        const actual = store.getActions()
          .map(action => action.type)[1];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch "LOADING_USER" when making a call to loginWithToken', () => {

    moxios.stubRequest(accountEndpointWithToken, {
      status: 200,
      response: accountDetailsResponse
    });

    const dispatchSpy = sinon.spy();

    const expected = true;

    return loginWithToken(dispatchSpy, tokenResponse.token)
      .then(() => {

        const actual = dispatchSpy.calledWith({
          type: LOADING_USER
        });

        expect(actual).equals(expected);
      });
  });

  it('should dispatch "LOAD_CATEGORIES_SUCCESS" when making a call to loginWithToken', () => {

    moxios.stubRequest(accountEndpointWithToken, {
      status: 200,
      response: accountDetailsResponse
    });

    const dispatchSpy = sinon.spy();

    const expected = true;

    return loginWithToken(dispatchSpy, tokenResponse.token)
      .then(() => {

        const actual = dispatchSpy.calledWith({
          type: LOAD_CATEGORIES_SUCCESS,
          categories: companyData.categories
        });

        expect(actual).equals(expected);
      });
  });

  it('should dispatch "LOAD_DISCOUNTS_SUCCESS" when making a call to loginWithToken', () => {

    moxios.stubRequest(accountEndpointWithToken, {
      status: 200,
      response: accountDetailsResponse
    });

    const dispatchSpy = sinon.spy();

    const expected = true;

    return loginWithToken(dispatchSpy, tokenResponse.token)
      .then(() => {

        const actual = dispatchSpy.calledWith({
          type: LOAD_DISCOUNTS_SUCCESS,
          discounts: companyData.discounts
        });

        expect(actual).equals(expected);
      });
  });

  it('should dispatch "LOAD_ITEMS_SUCCESS" when making a call to loginWithToken', () => {

    moxios.stubRequest(accountEndpointWithToken, {
      status: 200,
      response: accountDetailsResponse
    });

    const dispatchSpy = sinon.spy();

    const expected = true;

    return loginWithToken(dispatchSpy, tokenResponse.token)
      .then(() => {

        const actual = dispatchSpy.calledWith({
          type: LOAD_ITEMS_SUCCESS,
          items: companyData.items
        });

        expect(actual).equals(expected);
      });
  });

  it('should dispatch "LOAD_TAXES_SUCCESS" when making a call to loginWithToken', () => {

    moxios.stubRequest(accountEndpointWithToken, {
      status: 200,
      response: accountDetailsResponse
    });

    const dispatchSpy = sinon.spy();

    const expected = true;

    return loginWithToken(dispatchSpy, tokenResponse.token)
      .then(() => {

        const actual = dispatchSpy.calledWith({
          type: LOAD_TAXES_SUCCESS,
          taxes: companyData.taxes
        });

        expect(actual).equals(expected);
      });
  });

  it('should dispatch "LOAD_MODIFIERS_SUCCESS" when making a call to loginWithToken', () => {

    moxios.stubRequest(accountEndpointWithToken, {
      status: 200,
      response: accountDetailsResponse
    });

    const dispatchSpy = sinon.spy();

    const expected = true;

    return loginWithToken(dispatchSpy, tokenResponse.token)
      .then(() => {

        const actual = dispatchSpy.calledWith({
          type: LOAD_MODIFIERS_SUCCESS,
          modifiers: companyData.modifiers
        });

        expect(actual).equals(expected);
      });
  });

  it('should dispatch "LOAD_REFUNDREASONS_SUCCESS" when making a call to loginWithToken', () => {

    moxios.stubRequest(accountEndpointWithToken, {
      status: 200,
      response: accountDetailsResponse
    });

    const dispatchSpy = sinon.spy();

    const expected = true;

    return loginWithToken(dispatchSpy, tokenResponse.token)
      .then(() => {

        const actual = dispatchSpy.calledWith({
          type: LOAD_REFUNDREASONS_SUCCESS,
          refundReasons: companyData.refundReasons
        });

        expect(actual).equals(expected);
      });
  });

  it('should dispatch "LOADED_USER_SUCCESS" when making a call to loginWithToken', () => {

    moxios.stubRequest(accountEndpointWithToken, {
      status: 200,
      response: accountDetailsResponse
    });

    const dispatchSpy = sinon.spy();

    const expected = true;

    return loginWithToken(dispatchSpy, tokenResponse.token)
      .then(() => {

        const actual = dispatchSpy.calledWith({
          type: LOADED_USER_SUCCESS
        });

        expect(actual).equals(expected);
      });
  });

  it('should dispatch "LOADED_USER_FAILURE" when making a call to loginWithToken that fails', () => {

    moxios.stubRequest(ACCOUNT_ENDPOINT, {
      status: 400,
      response: {}
    });

    moxios.stubRequest(accountEndpointWithToken, {
      status: 200,
      response: {}
    });

    const dispatchSpy = sinon.spy();

    const expected = true;

    return loginWithToken(dispatchSpy, tokenResponse.token)
      .catch(() => {
        const actual = dispatchSpy.calledWith({
          type: LOADED_USER_FAILURE
        });

        expect(actual).equals(expected);
      });

  });

});
