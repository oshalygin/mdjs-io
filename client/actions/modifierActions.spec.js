/* eslint-disable max-nested-callbacks */
import { deactivateModifier, createModifier, updateModifier } from './modifierActions';
import {
  MODIFIER_DEACTIVATED_SUCCESS,
  MODIFIER_DEACTIVATED,
  LOADING_MODIFIER_UPDATE,
  LOADING_MODIFIER_CREATION,
  MODIFIER_CREATED,
  LOADING_MODIFIER_CREATION_SUCCESS,
  LOADING_MODIFIER_UPDATE_SUCCESS,
  MODIFIER_UPDATED,
  MODIFIER_UPDATE_FAILURE,
  MODIFIER_CREATION_FAILURE
} from './actionTypes';
import {
  MODIFIER_ENDPOINT
} from '../utilities/endpoints';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { expect } from 'chai';

describe('Modifier Actions', () => {

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

  const existingModifier = {
    modifierID: 3,
    modifierName: 'test',
    modifierPrice: 30.99,
    items: [
      85
    ],
    lastUpdatedDate: '2017-03-27T17:58:37.11',
    createdDate: '2016-12-12T22:16:55.28',
    lastUpdatedBy: 1,
    createdBy: 1,
    isActive: true,
    companyID: 1,
    facilityID: 0
  };

  const newModifier = {
    modifierID: 0,
    modifierName: 'test',
    modifierPrice: 30.99
  };

  const updatedModifier = {
    modifierID: 3,
    modifierName: 'testing',
    modifierPrice: 40.99,
    items: [
      85
    ],
    lastUpdatedDate: '2017-03-27T17:58:37.11',
    createdDate: '2016-12-12T22:16:55.28',
    lastUpdatedBy: 1,
    createdBy: 1,
    isActive: true,
    companyID: 1,
    facilityID: 0
  };

  const endpoint = `${MODIFIER_ENDPOINT}/${existingModifier.modifierID}`;

  it('should dispatch the "MODIFIER_DEACTIVATED" action on a deactivateModifier(modifier) call', () => {

    const expected = MODIFIER_DEACTIVATED;

    moxios.stubRequest(endpoint, {
      status: 200,
      response: {}
    });

    return store.dispatch(deactivateModifier(existingModifier))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[0];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "MODIFIER_DEACTIVATED_SUCCESS" action on a successful deactivateModifier(modifier) call', () => {

    const expected = MODIFIER_DEACTIVATED_SUCCESS;

    moxios.stubRequest(endpoint, {
      status: 200,
      response: {}
    });

    return store.dispatch(deactivateModifier(existingModifier))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[1];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "LOADING_MODIFIER_CREATION" action on a createModifier(newModifier) call', () => {

    const expected = LOADING_MODIFIER_CREATION;
    moxios.stubRequest(MODIFIER_ENDPOINT, {
      status: 200,
      response: {}
    });

    return store.dispatch(createModifier(newModifier))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[0];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "LOADING_MODIFIER_CREATION_SUCCESS" action on a completed createModifier(newModifier) call', () => {

    const expected = LOADING_MODIFIER_CREATION_SUCCESS;
    moxios.stubRequest(MODIFIER_ENDPOINT, {
      status: 200,
      response: {}
    });

    return store.dispatch(createModifier(newModifier))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[2];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "MODIFIER_CREATED" action on a completed createModifier(newModifier) call', () => {

    const expected = MODIFIER_CREATED;
    moxios.stubRequest(MODIFIER_ENDPOINT, {
      status: 200,
      response: {}
    });

    return store.dispatch(createModifier(newModifier))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[1];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "MODIFIER_CREATED" action with the new modifier on a completed createModifier(newModifier) call', () => {

    const newlyCreatedModifier = { ...newModifier, modifierID: 300 };
    const expected = newlyCreatedModifier;

    moxios.stubRequest(MODIFIER_ENDPOINT, {
      status: 200,
      response: newlyCreatedModifier
    });

    return store.dispatch(createModifier(newModifier))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.modifier)[1];
        expect(actual).deep.equals(expected);
      });

  });

  it('should dispatch the "LOADING_MODIFIER_UPDATE" action on a updateModifier(existingModifier) call', () => {

    const expected = LOADING_MODIFIER_UPDATE;
    const updateEndpoint = `${MODIFIER_ENDPOINT}/${existingModifier.modifierID}`;

    moxios.stubRequest(updateEndpoint, {
      status: 200,
      response: {}
    });

    return store.dispatch(updateModifier(existingModifier))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[0];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "LOADING_MODIFIER_UPDATE_SUCCESS" action on a completed updateModifier(existingModifier) call', () => {

    const expected = LOADING_MODIFIER_UPDATE_SUCCESS;
    const updateEndpoint = `${MODIFIER_ENDPOINT}/${existingModifier.modifierID}`;

    moxios.stubRequest(updateEndpoint, {
      status: 200,
      response: {}
    });

    return store.dispatch(updateModifier(existingModifier))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[2];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "MODIFIER_UPDATE_FAILURE" action on a failed updateModifier(existingModifier) call', () => {

    const expected = MODIFIER_UPDATE_FAILURE;
    const updateEndpoint = `${MODIFIER_ENDPOINT}/${existingModifier.modifierID}`;

    moxios.stubRequest(updateEndpoint, {
      status: 500,
      response: {}
    });

    return store.dispatch(updateModifier(existingModifier))
      .catch(() => {
        const actual = store.getActions()
          .map(action => action.type)[1];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "MODIFIER_CREATION_FAILURE" action on a failed createModifier(newModifier) call', () => {

    const expected = MODIFIER_CREATION_FAILURE;
    moxios.stubRequest(MODIFIER_ENDPOINT, {
      status: 500,
      response: {}
    });

    return store.dispatch(createModifier(newModifier))
      .catch(() => {
        const actual = store.getActions()
          .map(action => action.type)[1];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "MODIFIER_UPDATED" action on a completed updateModifier(updatedModifier) call', () => {

    const expected = MODIFIER_UPDATED;
    const updateEndpoint = `${MODIFIER_ENDPOINT}/${existingModifier.modifierID}`;

    moxios.stubRequest(updateEndpoint, {
      status: 200,
      response: {}
    });

    return store.dispatch(updateModifier(updatedModifier))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.type)[1];
        expect(actual).equals(expected);
      });

  });

  it('should dispatch the "MODIFIER_UPDATED" action with the updated modifier on a completed updateModifier(updatedModifier) call', () => {

    const partiallyupdatedModifier = { ...existingModifier, modifierName: 'foobar' };
    const expected = partiallyupdatedModifier;
    const updateEndpoint = `${MODIFIER_ENDPOINT}/${existingModifier.modifierID}`;

    moxios.stubRequest(updateEndpoint, {
      status: 200,
      response: partiallyupdatedModifier
    });

    return store.dispatch(updateModifier(updatedModifier))
      .then(() => {
        const actual = store.getActions()
          .map(action => action.modifier)[1];
        expect(actual).deep.equals(expected);
      });

  });

});
