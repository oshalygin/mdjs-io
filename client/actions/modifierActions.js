import axios from 'axios';

import * as actionTypes from './actionTypes';
import { getHeaders } from '../utilities/requestUtilities';
import { MODIFIER_ENDPOINT } from '../utilities/endpoints';
import { loadUserToken } from '../utilities/localStorage';

export function loadModifiersSuccess(modifiers) {
  return {
    type: actionTypes.LOAD_MODIFIERS_SUCCESS,
    modifiers
  };
}


export function modifierDeactivated() {
  return {
    type: actionTypes.MODIFIER_DEACTIVATED
  };
}

export function modifierDeactivatedSuccess(modifier) {
  return {
    type: actionTypes.MODIFIER_DEACTIVATED_SUCCESS,
    modifier
  };
}

export function loadingModifierCreationSuccess() {
  return {
    type: actionTypes.LOADING_MODIFIER_CREATION_SUCCESS
  };
}

export function loadingModifierCreation() {
  return {
    type: actionTypes.LOADING_MODIFIER_CREATION
  };
}

export function modifierCreatedSuccess(modifier) {

  return {
    type: actionTypes.MODIFIER_CREATED,
    modifier
  };
}

export function modifierCreationFailure() {
  return {
    type: actionTypes.MODIFIER_CREATION_FAILURE
  };
}

export function loadingModifierUpdate() {
  return {
    type: actionTypes.LOADING_MODIFIER_UPDATE
  };
}

export function modifierUpdatedSuccess(modifier) {
  return {
    type: actionTypes.MODIFIER_UPDATED,
    modifier
  };
}

export function loadingModifierUpdateSuccess() {
  return {
    type: actionTypes.LOADING_MODIFIER_UPDATE_SUCCESS
  };
}

export function modifierUpdateFailure() {
  return {
    type: actionTypes.MODIFIER_UPDATE_FAILURE
  };
}

export function createModifier(modifier) {
  return async function (dispatch) {

    dispatch(loadingModifierCreation());

    try {

      const token = loadUserToken();

      const headers = getHeaders(token);
      const createdModifierResponse = await axios.post(MODIFIER_ENDPOINT, modifier, headers);
      const createdModifier = createdModifierResponse.data;

      dispatch(modifierCreatedSuccess(createdModifier));
      dispatch(loadingModifierCreationSuccess());

    } catch (error) {
      dispatch(modifierCreationFailure());
      throw (error);
    }
  };
}

export function updateModifier(modifier) {
  return async function (dispatch) {

    dispatch(loadingModifierUpdate());

    try {

      const token = loadUserToken();
      const headers = getHeaders(token);
      const endpoint = `${MODIFIER_ENDPOINT}/${modifier.modifierID}`;

      const updatedModifierResponse = await axios.put(endpoint, modifier, headers);
      const updatedModifier = updatedModifierResponse.data;

      dispatch(modifierUpdatedSuccess(updatedModifier));
      dispatch(loadingModifierUpdateSuccess());

    } catch (error) {
      dispatch(modifierUpdateFailure());
      throw (error);
    }
  };
}

export function deactivateModifier(modifier) {
  return async function (dispatch) {

    const deactivatedModifier = {
      ...modifier,
      isActive: false,
      disabled: true
    };

    dispatch(modifierDeactivated());

    const token = loadUserToken();
    const endpoint = `${MODIFIER_ENDPOINT}/${deactivatedModifier.modifierID}`;

    try {
      const headers = getHeaders(token);
      await axios.delete(endpoint, headers);

      dispatch(modifierDeactivatedSuccess(deactivatedModifier));

    } catch (error) {
      throw (error);
    }

  };
}
