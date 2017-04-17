import { expect } from 'chai';
import moxios from 'moxios';
import sinon from 'sinon';

import { ORDERS_ENDPOINT } from '../utilities/endpoints';
import OrdersController from './ordersController';

describe('Orders Controller', () => {

  const orders = [
    {
      orderID: 4,
      total: 0,
      createdDate: '2017-04-01T00:43:08.577',
      orderStatusID: 110,
      transactionTypeID: 1,
      totalDiscount: 0,
      totalSub: 0,
      totalTax: 0,
      totalTip: 0
    },
    {
      orderID: 5,
      total: 30.99,
      createdDate: '2017-04-01T00:43:08.577',
      orderStatusID: 110,
      transactionTypeID: 1,
      totalDiscount: 0,
      totalSub: 0,
      totalTax: 0,
      totalTip: 0
    }
  ];

  const listOfOrdersPayload = orders;


  const orderPayload = orders[0];


  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should return a 400 status code if the id is not a number', () => {

    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy
    });

    const response = {
      status: statusStub
    };

    const request = {
      params: {
        id: 'foobar'
      }
    };

    OrdersController.get(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);

  });

  it('should return a 200 status code on a successful request', () => {

    moxios.stubRequest(ORDERS_ENDPOINT, {
      status: 200,
      response: listOfOrdersPayload
    });

    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      json: jsonSpy
    });

    const response = {
      status: statusStub
    };

    const request = {
      headers: {
        authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e'
      },
      params: {}
    };

    return OrdersController.get(request, response).then(() => {
      const actual = statusStub.calledWith(200);
      expect(actual).equals(expected);
    });

  });

  it('should return a list of orders on a successful request', () => {

    moxios.stubRequest(ORDERS_ENDPOINT, {
      status: 200,
      response: listOfOrdersPayload
    });

    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      json: jsonSpy
    });

    const response = {
      status: statusStub
    };

    const request = {
      headers: {
        authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e'
      },
      params: {}
    };

    return OrdersController.get(request, response).then(() => {
      const actual = jsonSpy.calledWith(orders);
      expect(actual).equals(expected);
    });

  });

  it('should return the order details on a successful request', () => {

    const orderId = 4;
    const modifierEndpoint = `${ORDERS_ENDPOINT}/${orderId}`;

    moxios.stubRequest(modifierEndpoint, {
      status: 200,
      response: orderPayload
    });

    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      json: jsonSpy
    });

    const response = {
      status: statusStub
    };

    const request = {
      headers: {
        authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e'
      },
      params: {
        id: orderId
      }
    };

    return OrdersController.get(request, response).then(() => {
      const actual = jsonSpy.calledWith(orders[0]);
      expect(actual).equals(expected);
    });
  });

  it('should return 404 if the request fails on the backend for any reason', () => {

    const serverResponse = {
      response: {
        data: {
          message: 'Invalid username or password'
        }
      }
    };

    moxios.stubRequest(ORDERS_ENDPOINT, {
      status: 500,
      response: serverResponse
    });

    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy
    });

    const response = {
      status: statusStub
    };

    const request = {
      headers: {
        authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e'
      },
      params: {}
    };

    return OrdersController.get(request, response).then(() => {
      const actual = statusStub.calledWith(404);
      expect(actual).equals(expected);
    });

  });

});
