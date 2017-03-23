/* eslint-disable max-nested-callbacks */
import {
  getVersion
} from './versionActions';
import {
  LOAD_VERSION_SUCCESS
} from './actionTypes';

import { VERSION_ENDPOINT } from './httpEndpoints';

import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { expect } from 'chai';

describe('Version Actions', () => {

  let store;
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  const data = {
    version: '1.3.8'
  };

  beforeEach(() => {
    store = mockStore({});
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should dispatch the "LOAD_VERSION_SUCCESS" action on a successful dispatch of getVersion', () => {

    moxios.stubRequest(VERSION_ENDPOINT, {
      status: 200,
      response: data
    });

    const expected = LOAD_VERSION_SUCCESS;

    return store.dispatch(getVersion())
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[0];
        expect(actual).equals(expected);
      });

  });

  it('should not dispatch "LOAD_VERSION_SUCCESS" if an error is thrown', () => {

    moxios.stubRequest(VERSION_ENDPOINT, {
      status: 500,
      response: {}
    });

    const expected = [];

    return store.dispatch(getVersion())
      .then(() => {
        const actual = store.getActions();
        expect(actual).deep.equals(expected); 
      });
  });

});
