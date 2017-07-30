import { expect } from 'chai';
import moxios from 'moxios';
import sinon from 'sinon';

import { DISCOUNT_ENDPOINT } from '../../utilities/endpoints';
import DiscountController from './discountController';

describe('Discount Controller', () => {
  const discounts = [
    {
      discountID: 31,
      discountTypeID: 0,
      discountName: 'Neighbor Discount',
      value: 10,
      applyTypeID: 0,
      items: [],
      lastUpdatedDate: '2017-04-13T21:33:36.087',
      createdDate: '2017-04-13T21:33:36.087',
      lastUpdatedBy: 1,
      createdBy: 1,
      isActive: true,
      companyID: 1,
      facilityID: 0,
    },
    {
      discountID: 32,
      discountTypeID: 1,
      discountName: 'Best Friend',
      value: 5,
      applyTypeID: 0,
      items: [],
      lastUpdatedDate: '2017-04-13T21:44:51.023',
      createdDate: '2017-04-13T21:44:51.023',
      lastUpdatedBy: 1,
      createdBy: 1,
      isActive: true,
      companyID: 1,
      facilityID: 0,
    },
  ];

  const listOfDiscountItemsPayload = {
    data: discounts,
  };

  const discountPayload = {
    data: discounts[0],
  };

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
      send: sendSpy,
    });

    const response = {
      status: statusStub,
    };

    const request = {
      params: {
        id: 'foobar',
      },
    };

    DiscountController.get(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });

  it('should return a 200 status code on a successful request', () => {
    moxios.stubRequest(DISCOUNT_ENDPOINT, {
      status: 200,
      response: listOfDiscountItemsPayload,
    });

    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      json: jsonSpy,
    });

    const response = {
      status: statusStub,
    };

    const request = {
      headers: {
        authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e',
      },
      params: {},
    };

    return DiscountController.get(request, response).then(() => {
      const actual = statusStub.calledWith(200);
      expect(actual).equals(expected);
    });
  });

  it('should return a list of discounts on a successful request', () => {
    moxios.stubRequest(DISCOUNT_ENDPOINT, {
      status: 200,
      response: listOfDiscountItemsPayload,
    });

    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      json: jsonSpy,
    });

    const response = {
      status: statusStub,
    };

    const request = {
      headers: {
        authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e',
      },
      params: {},
    };

    return DiscountController.get(request, response).then(() => {
      const actual = jsonSpy.calledWith(discounts);
      expect(actual).equals(expected);
    });
  });

  it('should return a single discount item on a successful request', () => {
    const discountId = 19;
    const discountEndpoint = `${DISCOUNT_ENDPOINT}/${discountId}`;

    moxios.stubRequest(discountEndpoint, {
      status: 200,
      response: discountPayload,
    });

    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      json: jsonSpy,
    });

    const response = {
      status: statusStub,
    };

    const request = {
      headers: {
        authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e',
      },
      params: {
        id: discountId,
      },
    };

    return DiscountController.get(request, response).then(() => {
      const actual = jsonSpy.calledWith(discounts[0]);
      expect(actual).equals(expected);
    });
  });

  it('should return 404 if the request fails on the backend for any reason', () => {
    const serverResponse = {
      response: {
        data: {
          message: 'Invalid username or password',
        },
      },
    };

    moxios.stubRequest(DISCOUNT_ENDPOINT, {
      status: 500,
      response: serverResponse,
    });

    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy,
    });

    const response = {
      status: statusStub,
    };

    const request = {
      headers: {
        authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e',
      },
      params: {},
    };

    return DiscountController.get(request, response).then(() => {
      const actual = statusStub.calledWith(404);
      expect(actual).equals(expected);
    });
  });

  it('should return 404 if the request fell through the backend', () => {
    const serverResponse = {
      response: {
        data: {
          message: 'Invalid username or password',
        },
      },
    };

    moxios.stubRequest(DISCOUNT_ENDPOINT, {
      status: 200,
      response: serverResponse,
    });

    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy,
    });

    const response = {
      status: statusStub,
    };

    const request = {
      headers: {
        authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e',
      },
      params: {},
    };

    return DiscountController.get(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).equals(expected);
    });
  });

  it('should return a 400 status code if discountId is null on a deletion call', () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy,
    });

    const response = {
      status: statusStub,
    };

    const request = {
      params: {},
    };

    DiscountController.deleteDiscount(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });

  it('should return 404 if the request fell through the backend on a deleteDiscount call', () => {
    const discountId = 19;
    const discountEndpoint = `${DISCOUNT_ENDPOINT}/${discountId}`;

    const serverResponse = {
      response: {
        data: {
          message: 'Bad Request',
        },
      },
    };

    moxios.stubRequest(discountEndpoint, {
      status: 500,
      response: serverResponse,
    });

    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy,
    });

    const response = {
      status: statusStub,
    };

    const request = {
      headers: {
        authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e',
      },
      params: {
        id: discountId,
      },
    };

    return DiscountController.deleteDiscount(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).equals(expected);
    });
  });

  it('should respond with a 200 on a successful deletion call', () => {
    const discountId = 3;
    const discountEndpoint = `${DISCOUNT_ENDPOINT}/${discountId}`;

    const serverResponse = {
      response: {
        data: {
          message: 'OK',
        },
      },
    };

    moxios.stubRequest(discountEndpoint, {
      status: 200,
      response: serverResponse,
    });

    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy,
    });

    const response = {
      status: statusStub,
    };

    const request = {
      headers: {
        authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e',
      },
      params: {
        id: discountId,
      },
    };

    return DiscountController.deleteDiscount(request, response).then(() => {
      const actual = statusStub.calledWith(200);
      expect(actual).equals(expected);
    });
  });

  it('should return a 400 status code if the id is not a number on a put request', () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy,
    });

    const response = {
      status: statusStub,
    };

    const request = {
      params: {
        id: 'foobar',
      },
      body: {},
    };

    return DiscountController.put(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).equals(expected);
    });
  });

  it('should return a 400 status code if the body is null on an update request', () => {
    const discountId = 19;

    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy,
    });

    const response = {
      status: statusStub,
    };

    const request = {
      params: {
        id: discountId,
      },
    };

    return DiscountController.put(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).equals(expected);
    });
  });

  it('should return a 200 status code on a successful put call to update a new discount', () => {
    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      json: jsonSpy,
    });

    const response = {
      status: statusStub,
    };

    const discountId = discounts[0].discountID;

    moxios.stubRequest(`${DISCOUNT_ENDPOINT}/${discountId}`, {
      status: 200,
      response: discountPayload,
    });

    const request = {
      headers: {
        authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e',
      },
      params: {
        id: discountId,
      },
      body: {
        ...discounts[0],
      },
    };

    return DiscountController.put(request, response).then(() => {
      const actual = statusStub.calledWith(200);
      expect(actual).equals(expected);
    });
  });

  it('should return 400 if the request fell through the backend on a put update', () => {
    const discountId = discounts[0].discountID;

    const serverResponse = {
      response: {
        data: {
          message: 'Bad Request',
        },
      },
    };

    moxios.stubRequest(`${DISCOUNT_ENDPOINT}/${discountId}`, {
      status: 500,
      response: serverResponse,
    });

    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy,
    });

    const response = {
      status: statusStub,
    };

    const request = {
      headers: {
        authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e',
      },
      params: {
        id: discountId,
      },
      body: {
        ...discounts[0],
      },
    };

    return DiscountController.put(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).equals(expected);
    });
  });

  it('should return 400 if the request fell through the backend on a post update', () => {
    const serverResponse = {
      response: {
        data: {
          message: 'Bad Request',
        },
      },
    };

    moxios.stubRequest(DISCOUNT_ENDPOINT, {
      status: 500,
      response: serverResponse,
    });

    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy,
    });

    const response = {
      status: statusStub,
    };

    const request = {
      headers: {
        authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e',
      },
      params: {},
      body: {
        ...discounts[0],
      },
    };

    return DiscountController.post(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).equals(expected);
    });
  });

  it('should return a 200 status code on a successful post call to create a new discount item', () => {
    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      json: jsonSpy,
    });

    moxios.stubRequest(DISCOUNT_ENDPOINT, {
      status: 200,
      response: discountPayload,
    });

    const response = {
      status: statusStub,
    };

    const request = {
      headers: {
        authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e',
      },
      params: {},
      body: {
        ...discounts[0],
      },
    };

    return DiscountController.post(request, response).then(() => {
      const actual = statusStub.calledWith(200);
      expect(actual).equals(expected);
    });
  });

  it('should return a 400 status code if the body is null on a new discount creation request', () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy,
    });

    const response = {
      status: statusStub,
    };

    const request = {
      params: {},
    };

    return DiscountController.post(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).equals(expected);
    });
  });

  it('should return a 400 status code if the request comes in with an id param', () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy,
    });

    const response = {
      status: statusStub,
    };

    const request = {
      params: {
        id: 3,
      },
      body: {
        ...discounts[0],
      },
    };

    return DiscountController.post(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).equals(expected);
    });
  });
});
