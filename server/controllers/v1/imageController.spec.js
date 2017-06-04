import { get } from './imageController';
import sinon from 'sinon';

import { expect } from 'chai';

describe('Image Controller', () => {

  it('should return a 400 status code if imageId is null', () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy
    });

    const response = {
      status: statusStub
    };

    const request = {
      params: {}
    };

    get(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);

  });

});
