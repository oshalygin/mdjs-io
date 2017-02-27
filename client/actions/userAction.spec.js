/* eslint-disable max-nested-callbacks */
import {
  loginValidationErrors,
  logout
} from './userActions';
import {
  LOADED_USER_FAILURE,
  LOGOUT_SUCCESS
} from './actionTypes';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { expect } from 'chai';

describe('User Actions', () => {

  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  it('should dispatch the "LOADED_USER_FAILURE" action on validation errors when logging in', () => {

    const store = mockStore({});
    const expected = LOADED_USER_FAILURE;

    return store.dispatch(loginValidationErrors())
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[0];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch "LOGOUT_SUCCESS" when logging out', () => {

    const store = mockStore({});
    const expected = LOGOUT_SUCCESS;

    return store.dispatch(logout())
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[0];
        expect(actual).equals(expected);
      });

  });
});
