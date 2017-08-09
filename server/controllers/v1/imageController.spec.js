import imageController from './imageController';

import { expect } from 'chai';
import sinon from 'sinon';

jest.mock('../../services/imageService', () => {
  return {
    upload: () => ['foobar.jpg'],
  };
});

describe('Image Controller', () => {
  const file = {
    fieldname: 'file',
    originalname: 'profile.png',
    encoding: '7bit',
    mimetype: 'image/png',
    destination: '/Users/oshalygin/dev/mdjs/temp-images',
    filename: 'profile.png',
    path: '/Users/oshalygin/dev/mdjs/temp-images/profile.png',
    size: 432401,
  };

  it('should return a 400 status code if imageId is null', async () => {
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

    await imageController.get(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });

  it('should return a 400 status code if posting an image without a file', async () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ send: sendSpy });

    const response = { status: statusStub };

    const request = { params: {} };

    await imageController.post(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);
  });

  it('should return a 200 status code if posting an image successfully', async () => {
    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({ json: jsonSpy });

    const response = { status: statusStub };

    const request = {
      headers: { authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e' },
      file,
    };

    await imageController.post(request, response);

    const actual = statusStub.calledWith(200);
    expect(actual).equals(expected);
  });
});
