/* eslint-disable max-nested-callbacks */
import { deactivateTax, createTax, updateTax } from './taxActions';
import {
  TAX_DEACTIVATED_SUCCESS,
  TAX_DEACTIVATED,
  LOADING_TAX_UPDATE,
  LOADING_TAX_CREATION,
  TAX_CREATED,
  LOADING_TAX_CREATION_SUCCESS,
  LOADING_TAX_UPDATE_SUCCESS,
  TAX_UPDATED,
  TAX_UPDATE_FAILURE,
  TAX_CREATION_FAILURE
} from './actionTypes';
import {
  TAXES_ENDPOINT
} from '../utilities/endpoints';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { expect } from 'chai';

describe('Tax Actions', () => {

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

  const existingTax = {
    taxID: 19,
    taxName: 'Texas',
    taxTypeID: 0,
    items: [],
    value: 80,
    lastUpdatedDate: '2017-04-01T13:35:21.583',
    createdDate: '2017-04-01T13:35:21.583',
    lastUpdatedBy: 1,
    createdBy: 1,
    isActive: true,
    companyID: 1,
    facilityID: 0
  };

  const newTax = {
    taxID: 0,
    taxName: 'baz'
  };

  const updatedTax = {
    taxID: 19,
    taxName: 'California',
    taxTypeID: 0,
    items: [],
    value: 80,
    lastUpdatedDate: '2017-04-01T16:35:21.583',
    createdDate: '2017-04-01T13:35:21.583',
    lastUpdatedBy: 1,
    createdBy: 1,
    isActive: true,
    companyID: 1,
    facilityID: 0
  };

  const endpoint = `${TAXES_ENDPOINT}/${existingTax.taxID}`;

  it('should dispatch the "TAX_DEACTIVATED" action on a deactivateTax(tax) call', () => {

    const expected = TAX_DEACTIVATED;

    moxios.stubRequest(endpoint, {
      status: 200,
      response: {}
    });

    return store.dispatch(deactivateTax(existingTax))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[0];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "TAX_DEACTIVATED_SUCCESS" action on a successful deactivateTax(tax) call', () => {

    const expected = TAX_DEACTIVATED_SUCCESS;

    moxios.stubRequest(endpoint, {
      status: 200,
      response: {}
    });

    return store.dispatch(deactivateTax(existingTax))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[1];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "LOADING_TAX_CREATION" action on a createTax(newTax) call', () => {

    const expected = LOADING_TAX_CREATION;
    moxios.stubRequest(TAXES_ENDPOINT, {
      status: 200,
      response: {}
    });

    return store.dispatch(createTax(newTax))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[0];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "LOADING_TAX_CREATION_SUCCESS" action on a completed createTax(newTax) call', () => {

    const expected = LOADING_TAX_CREATION_SUCCESS;
    moxios.stubRequest(TAXES_ENDPOINT, {
      status: 200,
      response: {}
    });

    return store.dispatch(createTax(newTax))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[2];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "TAX_CREATED" action on a completed createTax(newTax) call', () => {

    const expected = TAX_CREATED;
    moxios.stubRequest(TAXES_ENDPOINT, {
      status: 200,
      response: {}
    });

    return store.dispatch(createTax(newTax))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[1];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "TAX_CREATED" action with the new tax on a completed createTax(newTax) call', () => {

    const newlyCreatedTax = { ...newTax, taxID: 300 };
    const expected = newlyCreatedTax;

    moxios.stubRequest(TAXES_ENDPOINT, {
      status: 200,
      response: newlyCreatedTax
    });

    return store.dispatch(createTax(newTax))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.tax)[1];
        expect(actual).deep.equals(expected);
      });

  });

  it('should dispatch the "LOADING_TAX_UPDATE" action on a updateTax(existingTax) call', () => {

    const expected = LOADING_TAX_UPDATE;
    const updateEndpoint = `${TAXES_ENDPOINT}/${existingTax.taxID}`;

    moxios.stubRequest(updateEndpoint, {
      status: 200,
      response: {}
    });

    return store.dispatch(updateTax(existingTax))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[0];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "LOADING_TAX_UPDATE_SUCCESS" action on a completed updateTax(existingTax) call', () => {

    const expected = LOADING_TAX_UPDATE_SUCCESS;
    const updateEndpoint = `${TAXES_ENDPOINT}/${existingTax.taxID}`;

    moxios.stubRequest(updateEndpoint, {
      status: 200,
      response: {}
    });

    return store.dispatch(updateTax(existingTax))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[2];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "TAX_UPDATE_FAILURE" action on a failed updateTax(existingTax) call', () => {

    const expected = TAX_UPDATE_FAILURE;
    const updateEndpoint = `${TAXES_ENDPOINT}/${existingTax.taxID}`;

    moxios.stubRequest(updateEndpoint, {
      status: 500,
      response: {}
    });

    return store.dispatch(updateTax(existingTax))
      .catch(() => {
        const actual = store.getActions()
          .map(action => action.type)[1];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "TAX_CREATION_FAILURE" action on a failed createTax(newTax) call', () => {

    const expected = TAX_CREATION_FAILURE;
    moxios.stubRequest(TAXES_ENDPOINT, {
      status: 500,
      response: {}
    });

    return store.dispatch(createTax(newTax))
      .catch(() => {
        const actual = store.getActions()
          .map(action => action.type)[1];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "TAX_UPDATED" action on a completed updateTax(updatedTax) call', () => {

    const expected = TAX_UPDATED;
    const updateEndpoint = `${TAXES_ENDPOINT}/${existingTax.taxID}`;

    moxios.stubRequest(updateEndpoint, {
      status: 200,
      response: {}
    });

    return store.dispatch(updateTax(updatedTax))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[1];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "TAX_UPDATED" action with the updated tax on a completed updateTax(updatedTax) call', () => {

    const partiallyUpdatedTax = { ...existingTax, taxName: 'foobar' };
    const expected = partiallyUpdatedTax;
    const updateEndpoint = `${TAXES_ENDPOINT}/${existingTax.taxID}`;

    moxios.stubRequest(updateEndpoint, {
      status: 200,
      response: partiallyUpdatedTax
    });

    return store.dispatch(updateTax(updatedTax))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.tax)[1];
        expect(actual).deep.equals(expected);
      });

  });

});
