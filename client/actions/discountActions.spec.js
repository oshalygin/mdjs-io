/* eslint-disable max-nested-callbacks */
import {
  deactivateDiscount,
  createDiscount,
  updateDiscount,
} from './discountActions';
import {
  DISCOUNT_DEACTIVATED_SUCCESS,
  DISCOUNT_DEACTIVATED,
  LOADING_DISCOUNT_UPDATE,
  LOADING_DISCOUNT_CREATION,
  DISCOUNT_CREATED,
  LOADING_DISCOUNT_CREATION_SUCCESS,
  LOADING_DISCOUNT_UPDATE_SUCCESS,
  DISCOUNT_UPDATED,
  DISCOUNT_UPDATE_FAILURE,
  DISCOUNT_CREATION_FAILURE,
} from './actionTypes';
import { DISCOUNTS_ENDPOINT } from '../utilities/endpoints';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

describe('Discount Actions', () => {
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

  const existingDiscount = {
    discountID: 31,
    discountTypeID: 0,
    discountName: 'Neighbor Discount',
    value: 10,
    applyTypeID: 0,
    items: [],
    lastUpdatedDate: '2017-04-13T21:33:36.087',
    createdDate: '2017-04-13T21:33:36.087',
    lastUpdatedBy: 1,
    createdBy: 1,
    isActive: true,
    companyID: 1,
    facilityID: 0,
  };

  const newDiscount = {
    discountID: 0,
    discountName: 'Friends Discount',
  };

  const updatedDiscount = {
    discountID: 31,
    discountTypeID: 0,
    discountName: 'Neighbor Discount',
    value: 15,
    applyTypeID: 0,
    items: [],
    lastUpdatedDate: '2017-04-13T21:33:36.087',
    createdDate: '2017-04-13T21:33:36.087',
    lastUpdatedBy: 1,
    createdBy: 1,
    isActive: true,
    companyID: 1,
    facilityID: 0,
  };

  const endpoint = `${DISCOUNTS_ENDPOINT}/${existingDiscount.discountID}`;

  it('should dispatch the "DISCOUNT_DEACTIVATED" action on a deactivateDiscount(discount) call', () => {
    const expected = DISCOUNT_DEACTIVATED;

    moxios.stubRequest(endpoint, {
      status: 200,
      response: {},
    });

    return store.dispatch(deactivateDiscount(existingDiscount)).then(() => {
      const actual = store.getActions().map(action => action.type)[0];
      expect(actual).toEqual(expected);
    });
  });

  it('should dispatch the "DISCOUNT_DEACTIVATED_SUCCESS" action on a successful deactivateDiscount(discount) call', () => {
    const expected = DISCOUNT_DEACTIVATED_SUCCESS;

    moxios.stubRequest(endpoint, {
      status: 200,
      response: {},
    });

    return store.dispatch(deactivateDiscount(existingDiscount)).then(() => {
      const actual = store.getActions().map(action => action.type)[1];
      expect(actual).toEqual(expected);
    });
  });

  it('should dispatch the "LOADING_DISCOUNT_CREATION" action on a createDiscount(newDiscount) call', () => {
    const expected = LOADING_DISCOUNT_CREATION;
    moxios.stubRequest(DISCOUNTS_ENDPOINT, {
      status: 200,
      response: {},
    });

    return store.dispatch(createDiscount(newDiscount)).then(() => {
      const actual = store.getActions().map(action => action.type)[0];
      expect(actual).toEqual(expected);
    });
  });

  it('should dispatch the "LOADING_DISCOUNT_CREATION_SUCCESS" action on a completed createDiscount(newDiscount) call', () => {
    const expected = LOADING_DISCOUNT_CREATION_SUCCESS;
    moxios.stubRequest(DISCOUNTS_ENDPOINT, {
      status: 200,
      response: {},
    });

    return store.dispatch(createDiscount(newDiscount)).then(() => {
      const actual = store.getActions().map(action => action.type)[2];
      expect(actual).toEqual(expected);
    });
  });

  it('should dispatch the "DISCOUNT_CREATED" action on a completed createDiscount(newDiscount) call', () => {
    const expected = DISCOUNT_CREATED;
    moxios.stubRequest(DISCOUNTS_ENDPOINT, {
      status: 200,
      response: {},
    });

    return store.dispatch(createDiscount(newDiscount)).then(() => {
      const actual = store.getActions().map(action => action.type)[1];
      expect(actual).toEqual(expected);
    });
  });

  it('should dispatch the "DISCOUNT_CREATED" action with the new discount on a completed createDiscount(newDiscount) call', () => {
    const newlyCreatedDiscount = { ...newDiscount, discountID: 31 };
    const expected = newlyCreatedDiscount;

    moxios.stubRequest(DISCOUNTS_ENDPOINT, {
      status: 200,
      response: newlyCreatedDiscount,
    });

    return store.dispatch(createDiscount(newDiscount)).then(() => {
      const actual = store.getActions().map(action => action.discount)[1];
      expect(actual).toEqual(expected);
    });
  });

  it('should dispatch the "LOADING_DISCOUNT_UPDATE" action on a updateDiscount(existingDiscount) call', () => {
    const expected = LOADING_DISCOUNT_UPDATE;
    const updateEndpoint = `${DISCOUNTS_ENDPOINT}/${existingDiscount.discountID}`;

    moxios.stubRequest(updateEndpoint, {
      status: 200,
      response: {},
    });

    return store.dispatch(updateDiscount(existingDiscount)).then(() => {
      const actual = store.getActions().map(action => action.type)[0];
      expect(actual).toEqual(expected);
    });
  });

  it('should dispatch the "LOADING_DISCOUNT_UPDATE_SUCCESS" action on a completed updateDiscount(existingDiscount) call', () => {
    const expected = LOADING_DISCOUNT_UPDATE_SUCCESS;
    const updateEndpoint = `${DISCOUNTS_ENDPOINT}/${existingDiscount.discountID}`;

    moxios.stubRequest(updateEndpoint, {
      status: 200,
      response: {},
    });

    return store.dispatch(updateDiscount(existingDiscount)).then(() => {
      const actual = store.getActions().map(action => action.type)[2];
      expect(actual).toEqual(expected);
    });
  });

  it('should dispatch the "DISCOUNT_UPDATE_FAILURE" action on a failed updateDiscount(existingDiscount) call', () => {
    const expected = DISCOUNT_UPDATE_FAILURE;
    const updateEndpoint = `${DISCOUNTS_ENDPOINT}/${existingDiscount.discountID}`;

    moxios.stubRequest(updateEndpoint, {
      status: 500,
      response: {},
    });

    return store.dispatch(updateDiscount(existingDiscount)).catch(() => {
      const actual = store.getActions().map(action => action.type)[1];
      expect(actual).toEqual(expected);
    });
  });

  it('should dispatch the "DISCOUNT_CREATION_FAILURE" action on a failed createDiscount(newDiscount) call', () => {
    const expected = DISCOUNT_CREATION_FAILURE;
    moxios.stubRequest(DISCOUNTS_ENDPOINT, {
      status: 500,
      response: {},
    });

    return store.dispatch(createDiscount(newDiscount)).catch(() => {
      const actual = store.getActions().map(action => action.type)[1];
      expect(actual).toEqual(expected);
    });
  });

  it('should dispatch the "DISCOUNT_UPDATED" action on a completed updateDiscount(updatedDiscount) call', () => {
    const expected = DISCOUNT_UPDATED;
    const updateEndpoint = `${DISCOUNTS_ENDPOINT}/${existingDiscount.discountID}`;

    moxios.stubRequest(updateEndpoint, {
      status: 200,
      response: {},
    });

    return store.dispatch(updateDiscount(updatedDiscount)).then(() => {
      const actual = store.getActions().map(action => action.type)[1];
      expect(actual).toEqual(expected);
    });
  });

  it('should dispatch the "DISCOUNT_UPDATED" action with the updated discount on a completed updateDiscount(updatedDiscount) call', () => {
    const partiallyUpdatedDiscount = {
      ...existingDiscount,
      discountName: 'foobar',
    };
    const expected = partiallyUpdatedDiscount;
    const updateEndpoint = `${DISCOUNTS_ENDPOINT}/${existingDiscount.discountID}`;

    moxios.stubRequest(updateEndpoint, {
      status: 200,
      response: partiallyUpdatedDiscount,
    });

    return store.dispatch(updateDiscount(updatedDiscount)).then(() => {
      const actual = store.getActions().map(action => action.discount)[1];
      expect(actual).toEqual(expected);
    });
  });
});
