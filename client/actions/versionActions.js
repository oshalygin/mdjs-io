import axios from 'axios';
import {
  VERSION_ENDPOINT
} from '../utilities/endpoints';
import * as actionTypes from './actionTypes';
import { getJsonHeaders } from '../utilities/requestUtilities';

export function loadVersionSuccess(version) {
  return {
    type: actionTypes.LOAD_VERSION_SUCCESS,
    version
  };
}

export function getVersion() {
  return async function (dispatch) {

    try {
      const headers = getJsonHeaders();
      const accountResponse = await axios.get(VERSION_ENDPOINT, headers);

      const version = accountResponse.data;
      dispatch(loadVersionSuccess(version));

    } catch (error) {
      console.log('Could not retrieve the current application version'); //eslint-disable-line no-console
    }
  };
}
