import { expect } from 'chai';
import sinon from 'sinon';

import messageController from './messageController';

describe('V0 - Message Controller', () => {
  const messagePostBody = {
    messageID: 0,
    title: 'Welcome!',
    body: 'Hello there and welcome to the merchant dashboard',
    isHtml: false,
    isRead: true,
  };

  const responseObject = {
    data: {
      ...messagePostBody,
    },
  };

  it('should make a post to the message get endpoint', async () => {
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
      body: { ...messagePostBody },
    };

    await messageController.get(request, response);

    const actual = jsonSpy.called;
    expect(actual).equals(expected);
  });

  it('should send a 400 status code if the response from the message get endpoint threw an error', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.reject() };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...messagePostBody },
    };

    await messageController.get(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });

  it('should return with a 400 if the post body on the message get endpoint is null', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
    };

    await messageController.get(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });

  it('should return with a 400 if the message get endpoint was called with an id', async () => {
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

    await messageController.get(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });

  it('should make a post to the message markRead endpoint', async () => {
    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ json: jsonSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.resolve(responseObject) };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...messagePostBody },
    };

    await messageController.markRead(request, response);

    const actual = jsonSpy.called;
    expect(actual).equals(expected);
  });

  it('should send a 400 status code if the response from the message markRead endpoint threw an error', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.reject() };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...messagePostBody },
    };

    await messageController.markRead(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });

  it('should return with a 400 if the post body on the message markRead endpoint is null', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
    };

    await messageController.markRead(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });

  it('should return with a 400 if the message markRead endpoint was called with an id', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: { id: 3 },
    };

    await messageController.markRead(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });

  it('should make a post to the message delete endpoint', async () => {
    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ json: jsonSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.resolve(responseObject) };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...messagePostBody },
    };

    await messageController.delete(request, response);

    const actual = jsonSpy.called;
    expect(actual).equals(expected);
  });

  it('should send a 400 status code if the response from the message delete endpoint threw an error', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.reject() };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...messagePostBody },
    };

    await messageController.delete(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });

  it('should return with a 400 if the post body on the message delete endpoint is null', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
    };

    await messageController.delete(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });

  it('should return with a 400 if the message delete endpoint was called with an id', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: { id: 3 },
    };

    await messageController.delete(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });
});
