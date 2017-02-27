import { expect } from 'chai';
import { getJsonHeaders} from './requestUtilities';

describe('Request Utilities', () => {
 
  it('should return Content-Type, "application/json" when requesting the default json headers', () => {

    const expected = 'application/json';
    const actual = getJsonHeaders()
      .headers['Content-Type'];
    
    expect(actual).equals(expected);

  });

  
});
