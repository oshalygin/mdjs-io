import sinon from 'sinon';

import modifierController from './modifierController';

describe('V0 - Modifier Controller', () => {
  const modifierPostBody = {
    modifierID: 0,
    modifierName: 'fooModifier',
    modifierPrice: 33.33,
    items: [],
  };

  const responseObject = {
    data: {
      ...modifierPostBody,
    },
  };

  it('should make a post to the modifier create endpoint', async () => {
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
      body: { ...modifierPostBody },
    };

    await modifierController.create(request, response);

    const actual = jsonSpy.called;
    expect(actual).toEqual(expected);
  });

  it('should send a 400 status code if the response from the modifier create endpoint threw an error', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.reject() };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...modifierPostBody },
    };

    await modifierController.create(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return with a 400 if the post body on the modifier create endpoint is null', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
    };

    await modifierController.create(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return with a 400 if the modifier create endpoint was called with an id', async () => {
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

    await modifierController.create(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should make a post to the modifier update endpoint', async () => {
    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ json: jsonSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.resolve(responseObject) };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...modifierPostBody },
    };

    await modifierController.update(request, response);

    const actual = jsonSpy.called;
    expect(actual).toEqual(expected);
  });

  it('should send a 400 status code if the response from the modifier update endpoint threw an error', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.reject() };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...modifierPostBody },
    };

    await modifierController.update(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return with a 400 if the post body on the modifier update endpoint is null', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
    };

    await modifierController.update(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return with a 400 if the modifier update endpoint was called with an id', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: { id: 3 },
    };

    await modifierController.update(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should make a post to the modifier delete endpoint', async () => {
    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ json: jsonSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.resolve(responseObject) };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...modifierPostBody },
    };

    await modifierController.delete(request, response);

    const actual = jsonSpy.called;
    expect(actual).toEqual(expected);
  });

  it('should send a 400 status code if the response from the modifier delete endpoint threw an error', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.reject() };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...modifierPostBody },
    };

    await modifierController.delete(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return with a 400 if the post body on the modifier delete endpoint is null', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
    };

    await modifierController.delete(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return with a 400 if the modifier delete endpoint was called with an id', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: { id: 3 },
    };

    await modifierController.delete(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });
});
