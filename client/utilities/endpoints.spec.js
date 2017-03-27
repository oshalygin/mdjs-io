import { expect } from 'chai';
import { DOMAIN_ENDPOINT } from './endpoints';


describe('http endpoints', () => {

  it('should set the DOMAIN_ENDPOINT to the environment variable if it is set', () => {

    const expected = 'http://www.foobar.com';

    const actual = DOMAIN_ENDPOINT;
    expect(actual).equals(expected);

  });

});
