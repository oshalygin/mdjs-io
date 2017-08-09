import { getConfiguration, retrieveConfiguration } from './configurationSagas';
import { put, take, fork } from 'redux-saga/effects';

import { REQUEST_APPLICATION_CONFIGURATION } from '../actions/actionTypes';
import * as configurationActions from '../actions/configurationActions';

import { expect } from 'chai';

describe('Configuration Sagas', () => {
  const configuration = {
    data: {
      googleMapsApiKey: 'baz',
    },
  };

  it('should call the loggedInUser action creator on an successful retrieval of the logged in user', () => {
    const expected = put(
      configurationActions.getConfigurationSuccess(configuration.data),
    );

    const generator = getConfiguration();
    generator.next();

    const actual = generator.next(configuration).value;
    expect(actual).deep.equals(expected);
  });

  it('should call the getConfigurationError action creator on an unsuccessful retrieval of the logged in user', () => {
    const expected = put(configurationActions.getConfigurationError());
    const error = {
      response: {
        status: 400,
      },
    };
    const generator = getConfiguration();
    generator.next();
    const actual = generator.throw(error).value;

    expect(actual).deep.equals(expected);
  });

  it('should call take on the "REQUEST_APPLICATION_CONFIGURATION" action on a retrieveConfiguration watcher', () => {
    const expected = take(REQUEST_APPLICATION_CONFIGURATION);

    const generator = retrieveConfiguration();
    const actual = generator.next().value;

    expect(actual).deep.equals(expected);
  });

  it('should create an effect description that performs a call to getConfiguration', () => {
    const expected = fork(getConfiguration);

    const generator = retrieveConfiguration();
    generator.next();
    const actual = generator.next().value;

    expect(actual).deep.equals(expected);
  });
});
