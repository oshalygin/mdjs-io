import moxios from 'moxios';
import sinon from 'sinon';

import { ITEM_ENDPOINT } from '../../utilities/endpoints';
import ItemController from './itemController';

jest.mock('../../services/imageService', () => {
  return {
    upload: () => ['foobar.jpg'],
  };
});

describe('Item Controller', () => {
  const items = [
    {
      itemID: 85,
      itemCategoryID: 0,
      name: 'foobar',
      label: 'foobar',
      color: 0,
      count: 0,
      addedCount: 0,
      barcode: '',
      photoURL: '',
      price: 50.99,
      priceTypeID: 0,
      isShowPhoto: false,
      isTrackInventory: true,
      sku: '',
      modifiers: [],
      itemFlags: 0,
      file: null,
      lastUpdatedDate: '2016-12-12T22:17:12.95',
      createdDate: '2016-12-12T22:17:12.95',
      lastUpdatedBy: 1,
      createdBy: 1,
      isActive: true,
      companyID: 1,
      facilityID: 0,
    },
    {
      itemID: 82,
      itemCategoryID: 0,
      name: 'baz',
      label: 'baz',
      color: 0,
      count: 0,
      addedCount: 0,
      barcode: '',
      photoURL: '',
      price: 30.99,
      priceTypeID: 0,
      isShowPhoto: false,
      isTrackInventory: true,
      sku: '',
      modifiers: [],
      itemFlags: 0,
      file: null,
      lastUpdatedDate: '2016-12-12T22:17:12.95',
      createdDate: '2016-12-12T22:17:12.95',
      lastUpdatedBy: 1,
      createdBy: 1,
      isActive: true,
      companyID: 1,
      facilityID: 0,
    },
    {
      itemID: 33,
      itemCategoryID: 0,
      name: 'bar',
      label: 'bar',
      color: 0,
      count: 0,
      addedCount: 0,
      barcode: '',
      photoURL: '',
      price: 10.99,
      priceTypeID: 0,
      isShowPhoto: false,
      isTrackInventory: true,
      sku: '',
      modifiers: [],
      itemFlags: 0,
      file: null,
      lastUpdatedDate: '2016-12-12T22:17:12.95',
      createdDate: '2016-12-12T22:17:12.95',
      lastUpdatedBy: 1,
      createdBy: 1,
      isActive: true,
      companyID: 1,
      facilityID: 0,
    },
  ];

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

  const listOfItemsPayload = {
    data: items,
  };

  const itemPayload = {
    data: items[0],
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

    ItemController.get(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return a 200 status code on a successful request', () => {
    moxios.stubRequest(ITEM_ENDPOINT, {
      status: 200,
      response: listOfItemsPayload,
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

    return ItemController.get(request, response).then(() => {
      const actual = statusStub.calledWith(200);
      expect(actual).toEqual(expected);
    });
  });

  it('should return a list of items on a successful request', () => {
    moxios.stubRequest(ITEM_ENDPOINT, {
      status: 200,
      response: listOfItemsPayload,
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

    return ItemController.get(request, response).then(() => {
      const actual = jsonSpy.calledWith(items);
      expect(actual).toEqual(expected);
    });
  });

  it('should return a single item on a successful request', () => {
    const itemId = 3;
    const itemEndpoint = `${ITEM_ENDPOINT}/${itemId}`;

    moxios.stubRequest(itemEndpoint, {
      status: 200,
      response: itemPayload,
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
        id: itemId,
      },
    };

    return ItemController.get(request, response).then(() => {
      const actual = jsonSpy.calledWith(items[0]);
      expect(actual).toEqual(expected);
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

    moxios.stubRequest(ITEM_ENDPOINT, {
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

    return ItemController.get(request, response).then(() => {
      const actual = statusStub.calledWith(404);
      expect(actual).toEqual(expected);
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

    moxios.stubRequest(ITEM_ENDPOINT, {
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

    return ItemController.get(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).toEqual(expected);
    });
  });

  it('should return a 400 status code if itemId is null on a deletion call', () => {
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

    ItemController.deleteItem(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return 404 if the request fell through the backend on a deleteItem call', () => {
    const itemId = 3;
    const itemEndpoint = `${ITEM_ENDPOINT}/${itemId}`;

    const serverResponse = {
      response: {
        data: {
          message: 'Bad Request',
        },
      },
    };

    moxios.stubRequest(itemEndpoint, {
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
        id: itemId,
      },
    };

    return ItemController.deleteItem(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).toEqual(expected);
    });
  });

  it('should respond with a 200 on a successful deletion call', () => {
    const itemId = 3;
    const itemEndpoint = `${ITEM_ENDPOINT}/${itemId}`;

    const serverResponse = {
      response: {
        data: {
          message: 'OK',
        },
      },
    };

    moxios.stubRequest(itemEndpoint, {
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
        id: itemId,
      },
    };

    return ItemController.deleteItem(request, response).then(() => {
      const actual = statusStub.calledWith(200);
      expect(actual).toEqual(expected);
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

    return ItemController.put(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).toEqual(expected);
    });
  });

  it('should return a 400 status code if the body is null on an update request', () => {
    const itemId = 3;

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
        id: itemId,
      },
      body: {},
    };

    return ItemController.put(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).toEqual(expected);
    });
  });

  it('should return a 200 status code on a successful put call to update an item', () => {
    const expected = true;

    const itemId = items[0].itemID;

    const itemEndpoint = `${ITEM_ENDPOINT}/${itemId}`;

    moxios.stubRequest(itemEndpoint, {
      status: 200,
      response: itemPayload,
    });

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
        id: itemId,
      },
      file,
      body: {
        item: JSON.stringify(items[0]),
      },
    };

    return ItemController.put(request, response).then(() => {
      const actual = statusStub.calledWith(200);
      expect(actual).toEqual(expected);
    });
  });

  it('should return 400 if the request fell through the backend on a put update', () => {
    const itemId = 3;
    const itemEndpoint = `${ITEM_ENDPOINT}/${itemId}`;

    const serverResponse = {
      response: {
        data: {
          message: 'Bad Request',
        },
      },
    };

    moxios.stubRequest(itemEndpoint, {
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
        id: itemId,
      },
      body: {
        ...items[0],
      },
    };

    return ItemController.put(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).toEqual(expected);
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

    moxios.stubRequest(ITEM_ENDPOINT, {
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
        ...items[0],
      },
    };

    return ItemController.post(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).toEqual(expected);
    });
  });

  it('should return a 200 status code on a successful post call to create a new item', () => {
    const expected = true;

    moxios.stubRequest(ITEM_ENDPOINT, {
      status: 200,
      response: itemPayload,
    });

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
      file,
      body: {
        item: JSON.stringify(items[0]),
      },
    };

    return ItemController.post(request, response).then(() => {
      const actual = statusStub.calledWith(200);
      expect(actual).toEqual(expected);
    });
  });

  it('should return a 400 status code if the body is null on a new item creation request', () => {
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
      body: {},
    };

    return ItemController.post(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).toEqual(expected);
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
        ...items[0],
      },
    };

    return ItemController.post(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).toEqual(expected);
    });
  });
});
