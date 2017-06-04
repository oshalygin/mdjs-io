import { expect } from 'chai';
import moxios from 'moxios';
import sinon from 'sinon';

import { CATEGORY_ENDPOINT } from '../../utilities/endpoints';
import CategoriesController from './categoriesController';

describe('Categories Controller', () => {

  const categories = [
    {
      categoryID: 1,
      categoryName: 'Foo',
      companyID: 1,
      createdBy: 1,
      createdDate: '2017-03-31T01:09:34.3905613-07:00',
      facilityID: 0,
      isActive: true,
      items: [],
      lastUpdatedBy: 1,
      lastUpdatedDate: '2017-03-31T01:09:34.3905613-07:00'
    },
    {
      categoryID: 2,
      categoryName: 'Qux',
      companyID: 1,
      createdBy: 1,
      createdDate: '2017-03-31T01:09:34.3905613-07:00',
      facilityID: 0,
      isActive: true,
      items: [],
      lastUpdatedBy: 1,
      lastUpdatedDate: '2017-03-31T01:09:34.3905613-07:00'
    },
    {
      categoryID: 3,
      categoryName: 'Bar',
      companyID: 1,
      createdBy: 1,
      createdDate: '2017-03-31T01:09:34.3905613-07:00',
      facilityID: 0,
      isActive: true,
      items: [],
      lastUpdatedBy: 1,
      lastUpdatedDate: '2017-03-31T01:09:34.3905613-07:00'
    }
  ];

  const listOfCategoriesPayload = {
    data: categories
  };

  const categoryPayload = {
    data: categories[0]
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

    CategoriesController.get(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);

  });

  it('should return a 200 status code on a successful request', () => {

    moxios.stubRequest(CATEGORY_ENDPOINT, {
      status: 200,
      response: listOfCategoriesPayload
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

    return CategoriesController.get(request, response).then(() => {
      const actual = statusStub.calledWith(200);
      expect(actual).equals(expected);
    });

  });

  it('should return a list of categories on a successful request', () => {

    moxios.stubRequest(CATEGORY_ENDPOINT, {
      status: 200,
      response: listOfCategoriesPayload
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

    return CategoriesController.get(request, response).then(() => {
      const actual = jsonSpy.calledWith(categories);
      expect(actual).equals(expected);
    });

  });

  it('should return a single category on a successful request', () => {

    const categoryId = 3;
    const categoryEndpoint = `${CATEGORY_ENDPOINT}/${categoryId}`;

    moxios.stubRequest(categoryEndpoint, {
      status: 200,
      response: categoryPayload
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
        id: categoryId
      }
    };

    return CategoriesController.get(request, response).then(() => {
      const actual = jsonSpy.calledWith(categories[0]);
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

    moxios.stubRequest(CATEGORY_ENDPOINT, {
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

    return CategoriesController.get(request, response).then(() => {
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

    moxios.stubRequest(CATEGORY_ENDPOINT, {
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

    return CategoriesController.get(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).equals(expected);
    });

  });

  it('should return a 400 status code if categoryId is null on a deletion call', () => {
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

    CategoriesController.deleteCategory(request, response);

    const actual = statusStub.calledWith(400);
    expect(actual).equals(expected);

  });

  it('should return 404 if the request fell through the backend on a deleteCategory call', () => {

    const categoryId = 3;
    const categoryEndpoint = `${CATEGORY_ENDPOINT}/${categoryId}`;

    const serverResponse = {
      response: {
        data: {
          message: 'Bad Request'
        }
      }
    };

    moxios.stubRequest(categoryEndpoint, {
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
        id: categoryId
      }
    };

    return CategoriesController.deleteCategory(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).equals(expected);
    });

  });

  it('should respond with a 200 on a successful deletion call', () => {

    const categoryId = 3;
    const categoryEndpoint = `${CATEGORY_ENDPOINT}/${categoryId}`;

    const serverResponse = {
      response: {
        data: {
          message: 'OK'
        }
      }
    };

    moxios.stubRequest(categoryEndpoint, {
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
        id: categoryId
      }
    };

    return CategoriesController.deleteCategory(request, response).then(() => {
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

    return CategoriesController.put(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).equals(expected);
    });

  });

  it('should return a 400 status code if the body is null on an update request', () => {

    const categoryId = 3;

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
        id: categoryId
      }
    };


    return CategoriesController.put(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).equals(expected);
    });

  });

  it('should return a 200 status code on a successful put call to update a new category', () => {

    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      json: jsonSpy
    });

    const response = {
      status: statusStub
    };

    const categoryId = categories[0].categoryID;

    moxios.stubRequest(`${CATEGORY_ENDPOINT}/${categoryId}`, {
      status: 200,
      response: categoryPayload
    });

    const request = {
      headers: {
        authorization: 'e9d9317c-2ccb-4f1c-8bb7-87417d38544e'
      },
      params: {
        id: categoryId
      },
      body: {
        ...categories[0]
      }
    };

    return CategoriesController.put(request, response).then(() => {
      const actual = statusStub.calledWith(200);
      expect(actual).equals(expected);
    });

  });

  it('should return 400 if the request fell through the backend on a put update', () => {

    const categoryId = categories[0].categoryID;

    const serverResponse = {
      response: {
        data: {
          message: 'Bad Request'
        }
      }
    };

    moxios.stubRequest(`${CATEGORY_ENDPOINT}/${categoryId}`, {
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
        id: categoryId
      },
      body: {
        ...categories[0]
      }
    };

    return CategoriesController.put(request, response).then(() => {
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

    moxios.stubRequest(CATEGORY_ENDPOINT, {
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
        ...categories[0]
      }
    };

    return CategoriesController.post(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).equals(expected);
    });

  });

  it('should return a 200 status code on a successful post call to create a new category', () => {

    const expected = true;

    const jsonSpy = sinon.spy();
    const statusStub = sinon.stub().returns({
      json: jsonSpy
    });

    moxios.stubRequest(CATEGORY_ENDPOINT, {
      status: 200,
      response: categoryPayload
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
        ...categories[0]
      }
    };

    return CategoriesController.post(request, response).then(() => {
      const actual = statusStub.calledWith(200);
      expect(actual).equals(expected);
    });

  });

  it('should return a 400 status code if the body is null on a new category creation request', () => {

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


    return CategoriesController.post(request, response).then(() => {
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
        ...categories[0]
      }
    };

    return CategoriesController.post(request, response).then(() => {
      const actual = statusStub.calledWith(400);
      expect(actual).equals(expected);
    });

  });

});
