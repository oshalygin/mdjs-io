/* eslint-disable max-nested-callbacks */
import { deactivateCategory, createCategory, updateCategory } from './categoryActions';
import {
  CATEGORY_DEACTIVATED_SUCCESS,
  CATEGORY_DEACTIVATED,
  LOADING_CATEGORY_UPDATE,
  LOADING_CATEGORY_CREATION,
  CATEGORY_CREATED,
  LOADING_CATEGORY_CREATION_SUCCESS,
  LOADING_CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATED,
  CATEGORY_UPDATE_FAILURE,
  CATEGORY_CREATION_FAILURE
} from './actionTypes';
import {
  CATEGORIES_ENDPOINT
} from '../utilities/endpoints';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { expect } from 'chai';

describe('Category Actions', () => {

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

  const existingCategory = {
    categoryID: 1,
    categoryName: 'Foo',
    companyID: 1,
    createdBy: 1,
    createdDate: '2017-03-31T01:09:34.3905613-07:00',
    facilityID: 0,
    isActive: true,
    items: [],
    lastUpdatedBy: 1,
    lastUpdatedDate: '2017-03-31T01:09:34.3905613-07:00'
  };

  const newCategory = {
    categoryID: 0,
    categoryName: 'baz'
  };

  const updatedCategory = {
    categoryID: 1,
    categoryName: 'Foozz',
    companyID: 1,
    createdBy: 1,
    createdDate: '2017-03-31T01:09:34.3905613-07:00',
    facilityID: 0,
    isActive: true,
    items: [],
    lastUpdatedBy: 1,
    lastUpdatedDate: '2017-03-31T01:09:34.3905613-07:00'
  };

  const endpoint = `${CATEGORIES_ENDPOINT}/${existingCategory.categoryID}`;

  it('should dispatch the "CATEGORY_DEACTIVATED" action on a deactivateCategory(category) call', () => {

    const expected = CATEGORY_DEACTIVATED;

    moxios.stubRequest(endpoint, {
      status: 200,
      response: {}
    });

    return store.dispatch(deactivateCategory(existingCategory))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[0];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "CATEGORY_DEACTIVATED_SUCCESS" action on a successful deactivateCategory(category) call', () => {

    const expected = CATEGORY_DEACTIVATED_SUCCESS;

    moxios.stubRequest(endpoint, {
      status: 200,
      response: {}
    });

    return store.dispatch(deactivateCategory(existingCategory))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[1];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "LOADING_CATEGORY_CREATION" action on a createCategory(newCategory) call', () => {

    const expected = LOADING_CATEGORY_CREATION;
    moxios.stubRequest(CATEGORIES_ENDPOINT, {
      status: 200,
      response: {}
    });

    return store.dispatch(createCategory(newCategory))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[0];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "LOADING_CATEGORY_CREATION_SUCCESS" action on a completed createCategory(newCategory) call', () => {

    const expected = LOADING_CATEGORY_CREATION_SUCCESS;
    moxios.stubRequest(CATEGORIES_ENDPOINT, {
      status: 200,
      response: {}
    });

    return store.dispatch(createCategory(newCategory))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[2];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "CATEGORY_CREATED" action on a completed createCategory(newCategory) call', () => {

    const expected = CATEGORY_CREATED;
    moxios.stubRequest(CATEGORIES_ENDPOINT, {
      status: 200,
      response: {}
    });

    return store.dispatch(createCategory(newCategory))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[1];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "CATEGORY_CREATED" action with the new category on a completed createCategory(newCategory) call', () => {

    const newlyCreatedCategory = { ...newCategory, categoryID: 300 };
    const expected = newlyCreatedCategory;

    moxios.stubRequest(CATEGORIES_ENDPOINT, {
      status: 200,
      response: newlyCreatedCategory
    });

    return store.dispatch(createCategory(newCategory))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.category)[1];
        expect(actual).deep.equals(expected);
      });

  });

  it('should dispatch the "LOADING_CATEGORY_UPDATE" action on a updateCategory(existingCategory) call', () => {

    const expected = LOADING_CATEGORY_UPDATE;
    const updateEndpoint = `${CATEGORIES_ENDPOINT}/${existingCategory.categoryID}`;

    moxios.stubRequest(updateEndpoint, {
      status: 200,
      response: {}
    });

    return store.dispatch(updateCategory(existingCategory))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[0];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "LOADING_CATEGORY_UPDATE_SUCCESS" action on a completed updateCategory(existingCategory) call', () => {

    const expected = LOADING_CATEGORY_UPDATE_SUCCESS;
    const updateEndpoint = `${CATEGORIES_ENDPOINT}/${existingCategory.categoryID}`;

    moxios.stubRequest(updateEndpoint, {
      status: 200,
      response: {}
    });

    return store.dispatch(updateCategory(existingCategory))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[2];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "CATEGORY_UPDATE_FAILURE" action on a failed updateCategory(existingCategory) call', () => {

    const expected = CATEGORY_UPDATE_FAILURE;
    const updateEndpoint = `${CATEGORIES_ENDPOINT}/${existingCategory.categoryID}`;

    moxios.stubRequest(updateEndpoint, {
      status: 500,
      response: {}
    });

    return store.dispatch(updateCategory(existingCategory))
      .catch(() => {
        const actual = store.getActions()
          .map(action => action.type)[1];
        expect(actual).equals(expected);
      });
    
  });

  it('should dispatch the "CATEGORY_CREATION_FAILURE" action on a failed createCategory(newCategory) call', () => {

    const expected = CATEGORY_CREATION_FAILURE;
    moxios.stubRequest(CATEGORIES_ENDPOINT, {
      status: 500,
      response: {}
    });

    return store.dispatch(createCategory(newCategory))
      .catch(() => {
        const actual = store.getActions()
          .map(action => action.type)[1];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "CATEGORY_UPDATED" action on a completed updateCategory(updatedCategory) call', () => {

    const expected = CATEGORY_UPDATED;
    const updateEndpoint = `${CATEGORIES_ENDPOINT}/${existingCategory.categoryID}`;

    moxios.stubRequest(updateEndpoint, {
      status: 200,
      response: {}
    });

    return store.dispatch(updateCategory(updatedCategory))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[1];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "CATEGORY_UPDATED" action with the updated category on a completed updateCategory(updatedCategory) call', () => {

    const partiallyUpdatedCategory = { ...existingCategory, categoryName: 'foobar' };
    const expected = partiallyUpdatedCategory;
    const updateEndpoint = `${CATEGORIES_ENDPOINT}/${existingCategory.categoryID}`;

    moxios.stubRequest(updateEndpoint, {
      status: 200,
      response: partiallyUpdatedCategory
    });

    return store.dispatch(updateCategory(updatedCategory))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.category)[1];
        expect(actual).deep.equals(expected);
      });

  });

});
