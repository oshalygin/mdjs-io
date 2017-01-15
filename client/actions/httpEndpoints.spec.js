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


    const httpEndpoints = require('./httpEndpoints.js');
    const expected = 'http://www.foobar.com';

    const actual = httpEndpoints.DOMAIN_ENDPOINT;

    expect(actual).equals(expected);

  });

  it('should set the LOGIN_ENDPOINT to the full path including the domain', () => {

    const httpEndpoints = require('./httpEndpoints.js');
    const expected = 'http://www.foobar.com/api/dashboard/item';

    const actual = httpEndpoints.ITEM_ENDPOINT;

    expect(actual).equals(expected);
  });

});
