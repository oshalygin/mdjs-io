/* eslint-disable max-nested-callbacks */
import { deactivateItem } from './itemActions';
import {
  ITEM_DEACTIVATED_SUCCESS,
  ITEM_DEACTIVATED
} from './actionTypes';
import {
  ITEM_ENDPOINT
} from './httpEndpoints';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { expect } from 'chai';

describe('MenuState Actions', () => {

  let store;
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  beforeEach(() => {
    store = mockStore({});
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const item = {
    itemID: 1,
    name: 'Foo',
    label: 'Foo',
    price: 30.99,
    color: 5,
    photoURL: 'http//foobar.com/images/foo.jpg',
    file: null,
    itemCategoryID: 2,
    isActive: 1,
    priceTypeID: 1
  };

  const endpoint = `${ITEM_ENDPOINT}/${item.itemID}`;

  it('should dispatch the "ITEM_DEACTIVATED" action on a deactivateItem(item) call', () => {

    const expected = ITEM_DEACTIVATED;

    moxios.stubRequest(endpoint, {
      status: 200,
      response: {}
    });

    return store.dispatch(deactivateItem(item))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[0];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "ITEM_DEACTIVATED_SUCCESS" action on a successful deactivateItem(item) call', () => {

    const expected = ITEM_DEACTIVATED_SUCCESS;

    moxios.stubRequest(endpoint, {
      status: 200,
      response: {}
    });

    return store.dispatch(deactivateItem(item))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[1];
        expect(actual).equals(expected);
      });

  });
});
