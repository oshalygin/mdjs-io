import { get } from './configurationController';
import sinon from 'sinon';

describe('Configuration Controller', () => {
  it('should return 200 with a configuration object', () => {
    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      json: jsonSpy,
    });

    const request = {
      params: {},
    };
    const response = {
      status: statusStub,
    };

    return get(request, response).then(() => {
      const actual = statusStub.calledWith(200);
      expect(actual).toEqual(expected);
    });
  });
});
