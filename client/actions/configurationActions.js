import * as actionTypes from './actionTypes';

export const retrieveApplicationConfiguration = () => ({
  type: actionTypes.REQUEST_APPLICATION_CONFIGURATION,
});

export const getConfigurationSuccess = data => ({
  type: actionTypes.GET_CONFIGURATION_SUCCESS,
  data,
});

export const getConfigurationError = () => ({
  type: actionTypes.GET_CONFIGURATION_ERROR,
});
