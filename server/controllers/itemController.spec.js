import { expect } from 'chai';
import moxios from 'moxios';

import itemController from './itemController';

describe('Item Controller: /api/item', () => {

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should return the item from the root api route', (done) => {
    const expectedStatusCode = 200;
    const mockData = [
      {
        itemId: 5,
        itemName: 'Apples',
        itemPrice: 35
      },
      {
        itemId: 10,
        itemName: 'Oranges',
        itemPrice: 4
      }
    ];

    const request = {
      params: {
        id: 5
      }
    };
    const response = {
      send(actualStatusCode) {
        expect(actualStatusCode).equals(expectedStatusCode);
        return {
          json(result) {
            const actual = result.data;
            expect(actual).deep.equals(mockData);
          }
        };
      }
    };

    moxios.wait(() => {
      moxios.requests.mostRecent()
        .respondWith({
          status: 200,
          response: mockData
        })
        .then(() => {
          done();
        });
    });

    itemController.get(request, response);

  });

});
