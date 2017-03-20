/* eslint-disable max-nested-callbacks */
import {
  loginValidationErrors,
  logout,
  login
} from './userActions';
import {
  LOADED_USER_FAILURE,
  LOGOUT_SUCCESS,
  LOADING_USER
} from './actionTypes';

import { ACCOUNT_ENDPOINT, LOGIN_TOKEN_ENDPOINT } from './httpEndpoints';

import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { expect } from 'chai';

describe('User Actions', () => {

  let store;
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const tokenResponse = {
    token: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e'
  };

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

    const user = {
      email: 'oshalygin@gmail.com',
      password: 'Password12345!'
    };

    const expected = LOADING_USER;

    return store.dispatch(login(user))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[0];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch "LOADED_USER_FAILURE" when making a call to login', () => {

    moxios.stubRequest(ACCOUNT_ENDPOINT, {
      status: 400,
      response: {}
    });

    moxios.stubRequest(LOGIN_TOKEN_ENDPOINT, {
      status: 200,
      response: {}
    });

    const user = {
      email: 'oshalygin@gmail.com',
      password: ''
    };

    const expected = LOADED_USER_FAILURE;

    return store.dispatch(login(user))
      .catch(() => {
        const actual = store.getActions()
          .map(action => action.type)[1];
        expect(actual).equals(expected);
      });

  });
});
