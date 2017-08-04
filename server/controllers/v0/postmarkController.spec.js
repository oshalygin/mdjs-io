import { expect } from 'chai';
import sinon from 'sinon';

import postmarkController from './postmarkController';

describe('V0 - Postmark Controller', () => {
  const postmarkPostBody = {
    from: 'oshalygin@gmail.com',
    htmlBody: '<p>Hello World</p>',
    subject: 'This is the email subject',
  };

  const responseObject = {
    data: {
      ...postmarkPostBody,
    },
  };

  it('should make a post to the postmark email creation endpoint', async () => {
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
      body: { ...postmarkPostBody },
    };

    await postmarkController.post(request, response);

    const actual = jsonSpy.called;
    expect(actual).equals(expected);
  });

  it('should send a 400 status code if the response from the postmark email creation endpoint threw an error', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const api = require('../../utilities/api');
    api.default = { post: () => () => Promise.reject() };

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
      body: { ...postmarkPostBody },
    };

    await postmarkController.post(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });

  it('should return with a 400 if the post body on the postmark email creation endpoint is null', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      params: {},
    };

    await postmarkController.post(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });

  it('should return with a 400 if the postmark email creation endpoint was called with an id', async () => {
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

    await postmarkController.post(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });
});
