import { expect } from 'chai';
import { getJsonHeaders, getHeaders } from './requestUtilities';

describe('Request Utilities', () => {
  const token = '15761087-2541-4e23-8050-ebeeb1b0a981';

  it('should return Content-Type, "application/json" when requesting the default json headers', () => {

    const expected = 'application/json';
    const actual = getJsonHeaders()
      .headers['Content-Type'];

    expect(actual).equals(expected);

  });

  it('should return Content-Type, "application/json" when requesting headers with a token', () => {

    const expected = 'application/json';
    const actual = getHeaders(token)
      .headers['Content-Type'];

    expect(actual).equals(expected);

  });

  it('should return Authorization with the token when requesting headers with a token', () => {

    const expected = token;
    const actual = getHeaders(token)
      .headers.Authorization;

    expect(actual).equals(expected);

  });

});
