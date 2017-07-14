import api from './api';

import sinon from 'sinon';
import { expect } from 'chai';

jest.dontMock('axios');

describe('Api Utilities', () => {

  const endpoint = 'https://www.mdjs.io/api/v1/categories/5';
  const token = 'abcd-efg-123';

  it('should make a GET request when calling the get property with an endpoint', () => {

    const expected = true;
    const getSpy = sinon.spy();

    const axios = require('axios');
    axios.get = getSpy;

    api.get(endpoint);

    const actual = getSpy.called;
    expect(actual).equals(expected);

  });

  it('should make a PUT request when calling the put property with an endpoint and data', () => {

    const expected = true;
    const putSpy = sinon.spy();

    const axios = require('axios');
    axios.put = putSpy;

    api.put(endpoint, {});

    const actual = putSpy.called;
    expect(actual).equals(expected);

  });

  it('should make a POST request when calling the post property with an endpoint and data', () => {

    const expected = true;
    const postSpy = sinon.spy();

    const axios = require('axios');
    axios.post = postSpy;

    api.post(endpoint, {});

    const actual = postSpy.called;
    expect(actual).equals(expected);

  });

  it('should make a PATCH request when calling the post property with an endpoint and data', () => {

    const expected = true;
    const patchSpy = sinon.spy();

    const axios = require('axios');
    axios.patch = patchSpy;

    api.patch(endpoint, {});

    const actual = patchSpy.called;
    expect(actual).equals(expected);

  });

  it('should make a DELETE request when calling the post property with an endpoint', () => {

    const expected = true;
    const deleteSpy = sinon.spy();

    const axios = require('axios');
    axios.delete = deleteSpy;

    api.delete(endpoint);

    const actual = deleteSpy.called;
    expect(actual).equals(expected);

  });

  it('should set the request headers to include content-type and accept as "application/json" on a GET request', () => {

    const expected = true;
    const localStorage = require('../utilities/localStorage');
    localStorage.loadUserToken = () => token;

    const requestHeaders = {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: undefined //eslint-disable-line no-undefined
      }
    };

    const getSpy = sinon.spy();

    const axios = require('axios');
    axios.get = getSpy;

    api.get(endpoint);

    const actual = getSpy.calledWith(endpoint, requestHeaders);
    expect(actual).equals(expected);

  });

});
