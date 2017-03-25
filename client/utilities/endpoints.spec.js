/* eslint-disable no-process-env */
/* eslint-disable dot-notation */

import { expect } from 'chai';

beforeEach(() => {
  process.env['DOMAIN_ENDPOINT'] = 'http://www.foobar.com';
});

afterEach(() => {
  delete process.env['DOMAIN_ENDPOINT'];
});

describe('http endpoints', () => {
  it('should set the DOMAIN_ENDPOINT to the environment variable if it is set', () => {


    const endpoints = require('./endpoints.js');
    const expected = 'http://www.foobar.com';

    const actual = endpoints.DOMAIN_ENDPOINT;

    expect(actual).equals(expected);

  });

  it('should set the LOGIN_ENDPOINT to the full path including the domain', () => {

    const endpoints = require('./endpoints.js');
    const expected = 'http://www.foobar.com/api/dashboard/item';

    const actual = endpoints.ITEM_ENDPOINT;

    expect(actual).equals(expected);
  });

});
