import api from './api';

import sinon from 'sinon';

jest.dontMock('axios');

describe('Api Utilities', () => {
  const endpoint = 'https://www.mdjs.io/api/v1/categories/5';
  const token = 'abcd-efg-123';

  it('should make a GET request when calling the get property with an endpoint', () => {
    const expected = true;
    const getSpy = sinon.spy();

    const axios = require('axios');
    axios.get = getSpy;

    api.get(token)(endpoint);

    const actual = getSpy.called;
    expect(actual).toEqual(expected);
  });

  it('should curry back a get', () => {
    const expected = true;
    const getSpy = sinon.spy();

    const axios = require('axios');
    axios.get = getSpy;

    api.get(token)(endpoint);

    const actual = getSpy.called;
    expect(actual).toEqual(expected);
  });

  it('should make a PUT request when calling the put property with an endpoint and data', () => {
    const expected = true;
    const putSpy = sinon.spy();

    const axios = require('axios');
    axios.put = putSpy;

    api.put(token)(endpoint, {});

    const actual = putSpy.called;
    expect(actual).toEqual(expected);
  });

  it('should make a POST request when calling the post property with an endpoint and data', () => {
    const expected = true;
    const postSpy = sinon.spy();

    const axios = require('axios');
    axios.post = postSpy;

    api.post(token)(endpoint, {});

    const actual = postSpy.called;
    expect(actual).toEqual(expected);
  });

  it('should make a PATCH request when calling the post property with an endpoint and data', () => {
    const expected = true;
    const patchSpy = sinon.spy();

    const axios = require('axios');
    axios.patch = patchSpy;

    api.patch(token)(endpoint, {});

    const actual = patchSpy.called;
    expect(actual).toEqual(expected);
  });

  it('should make a DELETE request when calling the post property with an endpoint', () => {
    const expected = true;
    const deleteSpy = sinon.spy();

    const axios = require('axios');
    axios.delete = deleteSpy;

    api.delete(token)(endpoint);

    const actual = deleteSpy.called;
    expect(actual).toEqual(expected);
  });

  it('should set the request headers to include content-type on a GET request', () => {
    const expected = true;

    const requestHeaders = {
      headers: {
        'content-type': 'application/json',
        authorization: token,
      },
    };

    const getSpy = sinon.spy();

    const axios = require('axios');
    axios.get = getSpy;

    api.get(token)(endpoint);

    const actual = getSpy.calledWith(endpoint, requestHeaders);
    expect(actual).toEqual(expected);
  });
});
