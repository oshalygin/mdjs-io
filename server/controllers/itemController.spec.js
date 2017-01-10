import itemController from './itemController';
import { expect } from 'chai';

describe('Item Controller', () => {

  it('status of 200 is returned when a successful get is made', () => {
    const expected = 200;
    const dataAccessMock = {
      getAllItems(query, callback) {
        const item = {
          type: 'Mexican'
        };
        callback(null, item);
      }
    };

    const sut = itemController(dataAccessMock);

    const request = {
      body: {
        type: 'Mexican'
      }
    };
    const response = {
      status(statusCode) {
        expect(statusCode).equals(expected);
        return this;
      },
      json() { }
    };

    sut.get(request, response);

  });
});
