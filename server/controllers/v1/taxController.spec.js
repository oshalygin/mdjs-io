import { expect } from 'chai';
import moxios from 'moxios';
import sinon from 'sinon';

import { TAX_ENDPOINT } from '../../utilities/endpoints';
import TaxController from './taxController';

describe('Tax Controller', () => {

  const taxes = [
    {
      taxID: 19,
      taxName: 'Texas',
      taxTypeID: 0,
      items: [],
      value: 80,
      lastUpdatedDate: '2017-04-01T13:35:21.583',
      createdDate: '2017-04-01T13:35:21.583',
      lastUpdatedBy: 1,
      createdBy: 1,
      isActive: true,
      companyID: 1,
      facilityID: 0
    },
    {
      taxID: 20,
      taxName: 'CA',
      taxTypeID: 0,
      items: [],
      value: 10,
      lastUpdatedDate: '2017-04-01T13:35:21.583',
      createdDate: '2017-04-01T13:35:21.583',
      lastUpdatedBy: 1,
      createdBy: 1,
      isActive: true,
      companyID: 1,
      facilityID: 0
    }
  ];

  const listOfTaxItemsPayload = {
    data: taxes
  };

  const taxPayload = {
    data: taxes[0]
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
      send: sendSpy
    });

    const response = {
      status: statusStub
    };

    const request = {
      params: {
        id: 'foobar'
      }
    };

    TaxController.get(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);

  });

  it('should return a 200 status code on a successful request', () => {

    moxios.stubRequest(TAX_ENDPOINT, {
      status: 200,
      response: listOfTaxItemsPayload
    });

    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      json: jsonSpy
    });

    const response = {
      status: statusStub
    };

    const request = {
      headers: {
        authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e'
      },
      params: {}
    };

    return TaxController.get(request, response).then(() => {
      const actual = statusStub.calledWith(200);
      expect(actual).equals(expected);
    });

  });

  it('should return a list of taxes on a successful request', () => {

    moxios.stubRequest(TAX_ENDPOINT, {
      status: 200,
      response: listOfTaxItemsPayload
    });

    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      json: jsonSpy
    });

    const response = {
      status: statusStub
    };

    const request = {
      headers: {
        authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e'
      },
      params: {}
    };

    return TaxController.get(request, response).then(() => {
      const actual = jsonSpy.calledWith(taxes);
      expect(actual).equals(expected);
    });

  });

  it('should return a single tax item on a successful request', () => {

    const taxId = 19;
    const taxEndpoint = `${TAX_ENDPOINT}/${taxId}`;

    moxios.stubRequest(taxEndpoint, {
      status: 200,
      response: taxPayload
    });

    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      json: jsonSpy
    });

    const response = {
      status: statusStub
    };

    const request = {
      headers: {
        authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e'
      },
      params: {
        id: taxId
      }
    };

    return TaxController.get(request, response).then(() => {
      const actual = jsonSpy.calledWith(taxes[0]);
      expect(actual).equals(expected);
    });
  });

  it('should return 404 if the request fails on the backend for any reason', () => {

    const serverResponse = {
      response: {
        data: {
          message: 'Invalid username or password'
        }
      }
    };

    moxios.stubRequest(TAX_ENDPOINT, {
      status: 500,
      response: serverResponse
    });

    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy
    });

    const response = {
      status: statusStub
    };

    const request = {
      headers: {
        authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e'
      },
      params: {}
    };

    return TaxController.get(request, response).then(() => {
      const actual = statusStub.calledWith(404);
      expect(actual).equals(expected);
    });

  });

  it('should return 404 if the request fell through the backend', () => {

    const serverResponse = {
      response: {
        data: {
          message: 'Invalid username or password'
        }
      }
    };

    moxios.stubRequest(TAX_ENDPOINT, {
      status: 200,
      response: serverResponse
    });

    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy
    });

    const response = {
      status: statusStub
    };

    const request = {
      headers: {
        authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e'
      },
      params: {}
    };

    return TaxController.get(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).equals(expected);
    });

  });

  it('should return a 400 status code if taxId is null on a deletion call', () => {
    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy
    });

    const response = {
      status: statusStub
    };

    const request = {
      params: {}
    };
    
    TaxController.deleteTax(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);

  });

  it('should return 404 if the request fell through the backend on a deleteTax call', () => {

    const taxId = 19;
    const taxEndpoint = `${TAX_ENDPOINT}/${taxId}`;

    const serverResponse = {
      response: {
        data: {
          message: 'Bad Request'
        }
      }
    };

    moxios.stubRequest(taxEndpoint, {
      status: 500,
      response: serverResponse
    });

    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy
    });
    
    const response = {
      status: statusStub
    };

    const request = {
      headers: {
        authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e'
      },
      params: {
        id: taxId
      }
    };  

    return TaxController.deleteTax(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).equals(expected);
    });
  });

  it('should respond with a 200 on a successful deletion call', () => {

    const taxId = 3;
    const taxEndpoint = `${TAX_ENDPOINT}/${taxId}`;
    
    const serverResponse = {
      response: {
        data: {
          message: 'OK'
        }
      }
    };

    moxios.stubRequest(taxEndpoint, {
      status: 200,
      response: serverResponse
    });

    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy
    });

    const response = {
      status: statusStub
    };

    const request = {
      headers: {
        authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e'
      },
      params: {
        id: taxId
      }
    };

    return TaxController.deleteTax(request, response).then(() => {
      const actual = statusStub.calledWith(200);
      expect(actual).equals(expected);
    });

  });

  it('should return a 400 status code if the id is not a number on a put request', () => {

    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy
    });

    const response = {
      status: statusStub
    };

    const request = {
      params: {
        id: 'foobar'
      },
      body: {}
    };

    return TaxController.put(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).equals(expected);
    });

  });

  it('should return a 400 status code if the body is null on an update request', () => {

    const taxId = 19;

    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy
    });

    const response = {
      status: statusStub
    };

    const request = {
      params: {
        id: taxId
      }
    };


    return TaxController.put(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).equals(expected);
    });

  });

  it('should return a 200 status code on a successful put call to update a new tax', () => {

    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      json: jsonSpy
    });

    const response = {
      status: statusStub
    };

    const taxId = taxes[0].taxID;

    moxios.stubRequest(`${TAX_ENDPOINT}/${taxId}`, {
      status: 200,
      response: taxPayload
    });

    const request = {
      headers: {
        authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e'
      },
      params: {
        id: taxId
      },
      body: {
        ...taxes[0]
      }
    };

    return TaxController.put(request, response).then(() => {
      const actual = statusStub.calledWith(200);
      expect(actual).equals(expected);
    });

  });

  it('should return 400 if the request fell through the backend on a put update', () => {

    const taxId = taxes[0].taxID;

    const serverResponse = {
      response: {
        data: {
          message: 'Bad Request'
        }
      }
    };

    moxios.stubRequest(`${TAX_ENDPOINT}/${taxId}`, {
      status: 500,
      response: serverResponse
    });

    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy
    });

    const response = {
      status: statusStub
    };

    const request = {
      headers: {
        authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e'
      },
      params: {
        id: taxId
      },
      body: {
        ...taxes[0]
      }
    };

    return TaxController.put(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).equals(expected);
    });

  });

  it('should return 400 if the request fell through the backend on a post update', () => {

    const serverResponse = {
      response: {
        data: {
          message: 'Bad Request'
        }
      }
    };

    moxios.stubRequest(TAX_ENDPOINT, {
      status: 500,
      response: serverResponse
    });

    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy
    });

    const response = {
      status: statusStub
    };

    const request = {
      headers: {
        authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e'
      },
      params: {},
      body: {
        ...taxes[0]
      }
    };

    return TaxController.post(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).equals(expected);
    });

  });

  it('should return a 200 status code on a successful post call to create a new tax item', () => {

    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      json: jsonSpy
    });

    moxios.stubRequest(TAX_ENDPOINT, {
      status: 200,
      response: taxPayload
    });

    const response = {
      status: statusStub
    };

    const request = {
      headers: {
        authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e'
      },
      params: {},
      body: {
        ...taxes[0]
      }
    };

    return TaxController.post(request, response).then(() => {
      const actual = statusStub.calledWith(200);
      expect(actual).equals(expected);
    });

  });

  it('should return a 400 status code if the body is null on a new tax creation request', () => {

    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy
    });

    const response = {
      status: statusStub
    };

    const request = {
      params: {}
    };


    return TaxController.post(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).equals(expected);
    });

  });

  it('should return a 400 status code if the request comes in with an id param', () => {

    const expected = true;

    const sendSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      send: sendSpy
    });

    const response = {
      status: statusStub
    };

    const request = {
      params: {
        id: 3
      },
      body: {
        ...taxes[0]
      }
    };

    return TaxController.post(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).equals(expected);
    });

  });

});
