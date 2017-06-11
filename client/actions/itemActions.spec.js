/* eslint-disable max-nested-callbacks */
import { deactivateItem, createItem, updateItem } from './itemActions';
import {
  ITEM_DEACTIVATED_SUCCESS,
  ITEM_DEACTIVATED,
  LOADING_ITEM_UPDATE,
  LOADING_ITEM_CREATION,
  ITEM_CREATED,
  LOADING_ITEM_CREATION_SUCCESS,
  LOADING_ITEM_UPDATE_SUCCESS,
  ITEM_UPDATED,
  ITEM_UPDATE_FAILURE,
  ITEM_CREATION_FAILURE
} from './actionTypes';
import {
  ITEM_ENDPOINT
} from '../utilities/endpoints';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { expect } from 'chai';

describe('Item Actions', () => {

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

  const existingItem = {
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

  const newItem = {
    itemID: 0,
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

  const updatedItem = {
    itemID: 250,
    name: 'Baz',
    label: 'Foo',
    price: 30.99,
    color: 5,
    photoURL: 'http//foobar.com/images/foo.jpg',
    file: null,
    itemCategoryID: 2,
    isActive: 1,
    priceTypeID: 1
  };

  const endpoint = `${ITEM_ENDPOINT}/${existingItem.itemID}`;

  it('should dispatch the "ITEM_DEACTIVATED" action on a deactivateItem(item) call', () => {

    const expected = ITEM_DEACTIVATED;

    moxios.stubRequest(endpoint, {
      status: 200,
      response: {}
    });

    return store.dispatch(deactivateItem(existingItem))
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

    return store.dispatch(deactivateItem(existingItem))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[1];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "LOADING_ITEM_CREATION" action on a createItem(item) call', () => {

    const expected = LOADING_ITEM_CREATION;
    moxios.stubRequest(ITEM_ENDPOINT, {
      status: 200,
      response: {}
    });

    return store.dispatch(createItem(newItem))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[0];
        expect(actual).equals(expected);
      });
    
  });

  it('should dispatch the "LOADING_ITEM_CREATION_SUCCESS" action on a completed createItem(item) call', () => {

    const expected = LOADING_ITEM_CREATION_SUCCESS;
    moxios.stubRequest(ITEM_ENDPOINT, {
      status: 200,
      response: {}
    });

    return store.dispatch(createItem(newItem))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[2];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "ITEM_CREATED" action on a completed createItem(item) call', () => {

    const expected = ITEM_CREATED;
    moxios.stubRequest(ITEM_ENDPOINT, {
      status: 200,
      response: {}
    });

    return store.dispatch(createItem(newItem))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[1];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "ITEM_CREATED" action with the new item on a completed createItem(item) call', () => {

    const newlyCreatedItem = { ...newItem, itemID: 300 };
    const expected = newlyCreatedItem;
  
    moxios.stubRequest(ITEM_ENDPOINT, {
      status: 200,
      response: newlyCreatedItem
    });

    return store.dispatch(createItem(newItem))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.item)[1];
        expect(actual).deep.equals(expected);
      });

  });


  it('should dispatch the "LOADING_ITEM_UPDATE" action on a updateItem(item) call', () => {

    const expected = LOADING_ITEM_UPDATE;
    
    const itemEndpoint = `${ITEM_ENDPOINT}/${updatedItem.itemID}`;
    moxios.stubRequest(itemEndpoint, {
      status: 200,
      response: {}
    });

    return store.dispatch(updateItem(updatedItem))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[0];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "LOADING_ITEM_UPDATE_SUCCESS" action on a completed updateItem(item) call', () => {

    const expected = LOADING_ITEM_UPDATE_SUCCESS;

    const itemEndpoint = `${ITEM_ENDPOINT}/${updatedItem.itemID}`;
    moxios.stubRequest(itemEndpoint, {
      status: 200,
      response: {}
    });

    return store.dispatch(updateItem(updatedItem))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[2];
        expect(actual).equals(expected);
      });

  });


  it('should dispatch the "ITEM_UPDATE_FAILURE" action on a failed updateItem(item) call', () => {

    const expected = ITEM_UPDATE_FAILURE;

    const itemEndpoint = `${ITEM_ENDPOINT}/${updatedItem.itemID}`;
    moxios.stubRequest(itemEndpoint, {
      status: 500,
      response: {}
    });

    return store.dispatch(updateItem(updatedItem))
      .catch(() => {
        const actual = store.getActions()
          .map(action => action.type)[1];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "ITEM_CREATION_FAILURE" action on a failed createItem(item) call', () => {

    const expected = ITEM_CREATION_FAILURE;
    moxios.stubRequest(ITEM_ENDPOINT, {
      status: 500,
      response: {}
    });

    return store.dispatch(createItem(newItem))
      .catch(() => {
        const actual = store.getActions()
          .map(action => action.type)[1];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "ITEM_UPDATED" action on a completed updateItem(item) call', () => {

    const expected = ITEM_UPDATED;

    const itemEndpoint = `${ITEM_ENDPOINT}/${updatedItem.itemID}`;
    moxios.stubRequest(itemEndpoint, {
      status: 200,
      response: {}
    });

    return store.dispatch(updateItem(updatedItem))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[1];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "ITEM_UPDATED" action with the updated item on a completed updateItem(item) call', () => {

    const partiallyUpdatedItem = { ...existingItem, name: 'foobar' };
    const expected = partiallyUpdatedItem;

    const itemEndpoint = `${ITEM_ENDPOINT}/${updatedItem.itemID}`;   
    moxios.stubRequest(itemEndpoint, {
      status: 200,
      response: partiallyUpdatedItem
    });

    return store.dispatch(updateItem(updatedItem))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.item)[1];
        expect(actual).deep.equals(expected);
      });

  });

  it('should dispatch the "ITEM_UPDATED" action with the updated item on a completed updateItem(item) call with a file', () => {

    const partiallyUpdatedItem = { ...existingItem, name: 'foobar' };
    
    const updatedItemWithFile = {
      ...updatedItem,
      file: {
        fileName: 'my-awesome-new-file.jpg'
      }
    };
    
    const expected = partiallyUpdatedItem;

    const itemEndpoint = `${ITEM_ENDPOINT}/${updatedItem.itemID}`;    
    moxios.stubRequest(itemEndpoint, {
      status: 200,
      response: partiallyUpdatedItem
    });

    return store.dispatch(updateItem(updatedItemWithFile))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.item)[1];
        expect(actual).deep.equals(expected);
      });

  });
});
