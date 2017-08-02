import { expect } from 'chai';
import sinon from 'sinon';

// import { V0_CATEGORY_CREATE_ENDPOINT } from '../../utilities/endpoints';
import categoryController from './categoryController';

describe('V0 - Category Controller', () => {
  const categoryPostBody = {
    categoryID: 0,
    categoryName: 'fooCategory',
  };

  const responseObject = {
    data: {
      ...categoryPostBody,
    },
  };

  it('should make a post to the category create endpoint', async () => {
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
      body: { ...categoryPostBody },
    };

    await categoryController.create(request, response);

    const actual = jsonSpy.called;
    expect(actual).equals(expected);
  });

  it('should send a 400 status code if the response from the category create endpoint threw an error', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.reject() };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...categoryPostBody },
    };

    await categoryController.create(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });

  it('should return with a 400 if the post body on the category create endpoint is null', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
    };

    await categoryController.create(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });

  it('should return with a 400 if the category create endpoint was called with an id', async () => {
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

    await categoryController.create(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });

  it('should make a post to the category update endpoint', async () => {
    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ json: jsonSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.resolve(responseObject) };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...categoryPostBody },
    };

    await categoryController.update(request, response);

    const actual = jsonSpy.called;
    expect(actual).equals(expected);
  });

  it('should send a 400 status code if the response from the category update endpoint threw an error', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.reject() };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...categoryPostBody },
    };

    await categoryController.update(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });

  it('should return with a 400 if the post body on the category update endpoint is null', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
    };

    await categoryController.update(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });

  it('should return with a 400 if the category update endpoint was called with an id', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: { id: 3 },
    };

    await categoryController.update(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });

  it('should make a post to the category delete endpoint', async () => {
    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ json: jsonSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.resolve(responseObject) };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...categoryPostBody },
    };

    await categoryController.delete(request, response);

    const actual = jsonSpy.called;
    expect(actual).equals(expected);
  });

  it('should send a 400 status code if the response from the category delete endpoint threw an error', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.reject() };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...categoryPostBody },
    };

    await categoryController.delete(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });

  it('should return with a 400 if the post body on the category delete endpoint is null', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
    };

    await categoryController.delete(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });

  it('should return with a 400 if the category delete endpoint was called with an id', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: { id: 3 },
    };

    await categoryController.delete(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });
});
