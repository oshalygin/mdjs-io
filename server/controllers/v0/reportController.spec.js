import { expect } from 'chai';
import sinon from 'sinon';

import reportController from './reportController';

describe('V0 - Report Controller', () => {
  const reportPostBody = {
    startDate: '06-01-2017',
    endDate: '07-01-2017',
  };

  const responseObject = {
    data: {
      ...reportPostBody,
    },
  };

  it('should make a post to the email report endpoint', async () => {
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
      body: { ...reportPostBody },
    };

    await reportController.emailSalesReport(request, response);

    const actual = jsonSpy.called;
    expect(actual).equals(expected);
  });

  it('should send a 400 status code if the response from the email report endpoint threw an error', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.reject() };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...reportPostBody },
    };

    await reportController.emailSalesReport(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });

  it('should return with a 400 if the post body on the email report endpoint is null', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
    };

    await reportController.emailSalesReport(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });

  it('should return with a 400 if the email report endpoint was called with an id', async () => {
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

    await reportController.emailSalesReport(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });

  it('should make a post to the sales report endpoint', async () => {
    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ json: jsonSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.resolve(responseObject) };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...reportPostBody },
    };

    await reportController.salesReport(request, response);

    const actual = jsonSpy.called;
    expect(actual).equals(expected);
  });

  it('should send a 400 status code if the response from the sales report endpoint threw an error', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.reject() };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...reportPostBody },
    };

    await reportController.salesReport(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });

  it('should return with a 400 if the post body on the sales report endpoint is null', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
    };

    await reportController.salesReport(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });

  it('should return with a 400 if the sales report endpoint was called with an id', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: { id: 3 },
    };

    await reportController.salesReport(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });
});
