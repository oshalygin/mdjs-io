import sinon from 'sinon';

import ordersController from './ordersController';

describe('V0 - Orders Controller', () => {
  const ordersPostBody = {
    orderID: 0,
    companyID: 8,
    orderStatusID: 1,
    phoneNumber: '123-345-1133',
    email: 'oshalygin@gmail.com',
    latitude: 13.11,
    longitude: 113.33,
    notes: 'Great order',
    totalSub: 12.22,
    totalDiscount: 3.0,
    totalTax: 0.0,
    total: 40.88,
    createdDate: '07-1-2017',
    createdBy: 4,
    customerName: 'Brian',
    dueDate: '07-2-2017',
    customerID: 0,
    items: [],
    transactions: [],
    giftCards: [],
    customer: {},
  };

  const responseObject = {
    data: {
      ...ordersPostBody,
    },
  };

  it('should make a post to the order headers endpoint', async () => {
    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ json: jsonSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.resolve(responseObject) };

    const response = {
      status: statusStub,
    };

    const request = {
      headers: {
        authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e',
      },
      params: {},
      body: { ...ordersPostBody },
    };

    await ordersController.headers(request, response);

    const actual = jsonSpy.called;
    expect(actual).toEqual(expected);
  });

  it('should send a 400 status code if the response from the order headers endpoint threw an error', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.reject() };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...ordersPostBody },
    };

    await ordersController.headers(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return with a 400 if the post body on the order headers endpoint is null', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
    };

    await ordersController.headers(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return with a 400 if the order headers endpoint was called with an id', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {
        id: 3,
      },
    };

    await ordersController.headers(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should make a post to the order headers V2 endpoint', async () => {
    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ json: jsonSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.resolve(responseObject) };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...ordersPostBody },
    };

    await ordersController.headersV2(request, response);

    const actual = jsonSpy.called;
    expect(actual).toEqual(expected);
  });

  it('should send a 400 status code if the response from the order headers V2 endpoint threw an error', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.reject() };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...ordersPostBody },
    };

    await ordersController.headersV2(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return with a 400 if the post body on the order headers V2 endpoint is null', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
    };

    await ordersController.headersV2(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return with a 400 if the order headers V2 endpoint was called with an id', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: { id: 3 },
    };

    await ordersController.headersV2(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should make a post to the orders gift card check endpoint', async () => {
    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ json: jsonSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.resolve(responseObject) };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...ordersPostBody },
    };

    await ordersController.giftCardCheck(request, response);

    const actual = jsonSpy.called;
    expect(actual).toEqual(expected);
  });

  it('should send a 400 status code if the response from the orders gift card check endpoint threw an error', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.reject() };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...ordersPostBody },
    };

    await ordersController.giftCardCheck(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return with a 400 if the post body on the orders gift card check endpoint is null', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
    };

    await ordersController.giftCardCheck(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return with a 400 if the orders gift card check endpoint was called with an id', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: { id: 3 },
    };

    await ordersController.giftCardCheck(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should make a post to the orders select endpoint', async () => {
    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ json: jsonSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.resolve(responseObject) };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...ordersPostBody },
    };

    await ordersController.select(request, response);

    const actual = jsonSpy.called;
    expect(actual).toEqual(expected);
  });

  it('should send a 400 status code if the response from the orders select endpoint threw an error', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.reject() };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...ordersPostBody },
    };

    await ordersController.select(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return with a 400 if the post body on the orders select endpoint is null', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
    };

    await ordersController.select(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return with a 400 if the orders select endpoint was called with an id', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: { id: 3 },
    };

    await ordersController.select(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should make a post to the orders refund endpoint', async () => {
    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ json: jsonSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.resolve(responseObject) };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...ordersPostBody },
    };

    await ordersController.refund(request, response);

    const actual = jsonSpy.called;
    expect(actual).toEqual(expected);
  });

  it('should send a 400 status code if the response from the orders refund endpoint threw an error', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.reject() };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...ordersPostBody },
    };

    await ordersController.refund(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return with a 400 if the post body on the orders refund endpoint is null', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
    };

    await ordersController.refund(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return with a 400 if the orders refund endpoint was called with an id', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: { id: 3 },
    };

    await ordersController.refund(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should make a post to the orders create endpoint', async () => {
    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ json: jsonSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.resolve(responseObject) };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...ordersPostBody },
    };

    await ordersController.create(request, response);

    const actual = jsonSpy.called;
    expect(actual).toEqual(expected);
  });

  it('should send a 400 status code if the response from the orders create endpoint threw an error', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.reject() };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...ordersPostBody },
    };

    await ordersController.create(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return with a 400 if the post body on the orders create endpoint is null', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
    };

    await ordersController.create(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return with a 400 if the orders create endpoint was called with an id', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: { id: 3 },
    };

    await ordersController.create(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should make a post to the orders complete endpoint', async () => {
    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ json: jsonSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.resolve(responseObject) };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...ordersPostBody },
    };

    await ordersController.complete(request, response);

    const actual = jsonSpy.called;
    expect(actual).toEqual(expected);
  });

  it('should send a 400 status code if the response from the orders complete endpoint threw an error', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.reject() };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...ordersPostBody },
    };

    await ordersController.complete(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return with a 400 if the post body on the orders complete endpoint is null', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
    };

    await ordersController.complete(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return with a 400 if the orders complete endpoint was called with an id', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: { id: 3 },
    };

    await ordersController.complete(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should make a post to the orders cancel endpoint', async () => {
    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ json: jsonSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.resolve(responseObject) };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...ordersPostBody },
    };

    await ordersController.cancel(request, response);

    const actual = jsonSpy.called;
    expect(actual).toEqual(expected);
  });

  it('should send a 400 status code if the response from the orders cancel endpoint threw an error', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.reject() };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...ordersPostBody },
    };

    await ordersController.cancel(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return with a 400 if the post body on the orders cancel endpoint is null', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
    };

    await ordersController.cancel(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return with a 400 if the orders cancel endpoint was called with an id', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: { id: 3 },
    };

    await ordersController.cancel(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should make a post to the orders update endpoint', async () => {
    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ json: jsonSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.resolve(responseObject) };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...ordersPostBody },
    };

    await ordersController.update(request, response);

    const actual = jsonSpy.called;
    expect(actual).toEqual(expected);
  });

  it('should send a 400 status code if the response from the orders update endpoint threw an error', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.reject() };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...ordersPostBody },
    };

    await ordersController.update(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return with a 400 if the post body on the orders update endpoint is null', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
    };

    await ordersController.update(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return with a 400 if the orders update endpoint was called with an id', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: { id: 3 },
    };

    await ordersController.update(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should make a post to the orders pay endpoint', async () => {
    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ json: jsonSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.resolve(responseObject) };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...ordersPostBody },
    };

    await ordersController.pay(request, response);

    const actual = jsonSpy.called;
    expect(actual).toEqual(expected);
  });

  it('should send a 400 status code if the response from the orders pay endpoint threw an error', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.reject() };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...ordersPostBody },
    };

    await ordersController.pay(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return with a 400 if the post body on the orders pay endpoint is null', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
    };

    await ordersController.pay(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return with a 400 if the orders pay endpoint was called with an id', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: { id: 3 },
    };

    await ordersController.pay(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });
});
