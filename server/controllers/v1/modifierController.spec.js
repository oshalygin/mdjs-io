import moxios from 'moxios';
import sinon from 'sinon';

import { MODIFIER_ENDPOINT } from '../../utilities/endpoints';
import ModifierController from './modifierController';

describe('Modifiers Controller', () => {
  const modifiers = [
    {
      modifierID: 3,
      modifierName: 'test',
      modifierPrice: 30.99,
      items: [85],
      lastUpdatedDate: '2017-03-27T17:58:37.11',
      createdDate: '2016-12-12T22:16:55.28',
      lastUpdatedBy: 1,
      createdBy: 1,
      isActive: true,
      companyID: 1,
      facilityID: 0,
    },
    {
      modifierID: 12,
      modifierName: 'Foobar',
      modifierPrice: 79,
      items: [],
      lastUpdatedDate: '2017-04-01T00:43:08.577',
      createdDate: '2017-04-01T00:43:08.577',
      lastUpdatedBy: 1,
      createdBy: 1,
      isActive: true,
      companyID: 1,
      facilityID: 0,
    },
  ];

  const listOfModifierItemsPayload = {
    modifiers,
  };

  const modifierPayload = {
    data: modifiers[0],
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

    ModifierController.get(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return a 200 status code on a successful request', () => {
    moxios.stubRequest(MODIFIER_ENDPOINT, {
      status: 200,
      response: listOfModifierItemsPayload,
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

    return ModifierController.get(request, response).then(() => {
      const actual = statusStub.calledWith(200);
      expect(actual).toEqual(expected);
    });
  });

  it('should return a list of modifiers on a successful request', () => {
    moxios.stubRequest(MODIFIER_ENDPOINT, {
      status: 200,
      response: listOfModifierItemsPayload,
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

    return ModifierController.get(request, response).then(() => {
      const actual = jsonSpy.called;
      expect(actual).toEqual(expected);
    });
  });

  it('should return a single modifier item on a successful request', () => {
    const modifierId = 19;
    const modifierEndpoint = `${MODIFIER_ENDPOINT}/${modifierId}`;

    moxios.stubRequest(modifierEndpoint, {
      status: 200,
      response: modifierPayload,
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
        id: modifierId,
      },
    };

    return ModifierController.get(request, response).then(() => {
      const actual = jsonSpy.called;
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

    moxios.stubRequest(MODIFIER_ENDPOINT, {
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

    return ModifierController.get(request, response).then(() => {
      const actual = statusStub.calledWith(404);
      expect(actual).toEqual(expected);
    });
  });

  it('should return 404 if the request fell through the backend', () => {
    const serverResponse = {
      response: {},
    };

    moxios.stubRequest(MODIFIER_ENDPOINT, {
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

    return ModifierController.get(request, response).then(() => {
      const actual = statusStub.called;
      expect(actual).toEqual(expected);
    });
  });

  it('should return a 400 status code if modifierId is null on a deletion call', () => {
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

    ModifierController.deleteModifier(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).toEqual(expected);
  });

  it('should return 404 if the request fell through the backend on a deleteModifier call', () => {
    const modifierId = 19;
    const modifierEndpoint = `${MODIFIER_ENDPOINT}/${modifierId}`;

    const serverResponse = {
      response: {
        data: {
          message: 'Bad Request',
        },
      },
    };

    moxios.stubRequest(modifierEndpoint, {
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
        id: modifierId,
      },
    };

    return ModifierController.deleteModifier(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).toEqual(expected);
    });
  });

  it('should respond with a 200 on a successful deletion call', () => {
    const modifierId = 3;
    const modifierEndpoint = `${MODIFIER_ENDPOINT}/${modifierId}`;

    const serverResponse = {
      response: {
        data: {
          message: 'OK',
        },
      },
    };

    moxios.stubRequest(modifierEndpoint, {
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
        id: modifierId,
      },
    };

    return ModifierController.deleteModifier(request, response).then(() => {
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

    return ModifierController.put(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).toEqual(expected);
    });
  });

  it('should return a 400 status code if the body is null on an update request', () => {
    const modifierId = 19;

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
        id: modifierId,
      },
    };

    return ModifierController.put(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).toEqual(expected);
    });
  });

  it('should return a 200 status code on a successful put call to update a new modifier', () => {
    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      json: jsonSpy,
    });

    const response = {
      status: statusStub,
    };

    const modifierId = modifiers[0].modifierId;

    moxios.stubRequest(`${MODIFIER_ENDPOINT}/${modifierId}`, {
      status: 200,
      response: modifierPayload,
    });

    const request = {
      headers: {
        authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e',
      },
      params: {
        id: modifierId,
      },
      body: {
        ...modifiers[0],
      },
    };

    return ModifierController.put(request, response).then(() => {
      const actual = statusStub.calledWith(200);
      expect(actual).toEqual(expected);
    });
  });

  it('should return 400 if the request fell through the backend on a put update', () => {
    const modifierId = modifiers[0].modifierId;

    const serverResponse = {
      response: {
        data: {
          message: 'Bad Request',
        },
      },
    };

    moxios.stubRequest(`${MODIFIER_ENDPOINT}/${modifierId}`, {
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
        id: modifierId,
      },
      body: {
        ...modifiers[0],
      },
    };

    return ModifierController.put(request, response).then(() => {
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

    moxios.stubRequest(MODIFIER_ENDPOINT, {
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
        ...modifiers[0],
      },
    };

    return ModifierController.post(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).toEqual(expected);
    });
  });

  it('should return a 200 status code on a successful post call to create a new modifier item', () => {
    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      json: jsonSpy,
    });

    moxios.stubRequest(MODIFIER_ENDPOINT, {
      status: 200,
      response: modifierPayload,
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
        ...modifiers[0],
      },
    };

    return ModifierController.post(request, response).then(() => {
      const actual = statusStub.calledWith(200);
      expect(actual).toEqual(expected);
    });
  });

  it('should return a 400 status code if the body is null on a new modifier creation request', () => {
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

    return ModifierController.post(request, response).then(() => {
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
        ...modifiers[0],
      },
    };

    return ModifierController.post(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).toEqual(expected);
    });
  });
});
