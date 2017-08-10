import axios from 'axios';

import {
  getHeaders,
  warningApiResponse,
  errorApiResponse,
} from '../../utilities/requestUtilities';
import { CATEGORY_ENDPOINT } from '../../utilities/endpoints';

export async function get(request, response) {
  if (request.params.id && isNaN(request.params.id)) {
    return warningApiResponse(400, 'The resource requires an id')(
      request,
      response,
    );
  }
  try {
    const token = request.headers.authorization;
    const headers = getHeaders(token);

    const categoryEndpoint = request.params.id
      ? `${CATEGORY_ENDPOINT}/${request.params.id}`
      : CATEGORY_ENDPOINT;

    const categoryResponse = await axios.get(categoryEndpoint, headers);

    if (!categoryResponse.data.data) {
      return errorApiResponse(400, 'Bad Request')(request, response);
    }

    const categoriesData = categoryResponse.data.data;
    return response.status(200).json(categoriesData);
  } catch (error) {
    return errorApiResponse(404, 'Resource not found', error)(
      request,
      response,
    );
  }
}

export async function deleteCategory(request, response) {
  const categoryId = request.params.id;

  if (!categoryId) {
    return warningApiResponse(400, 'The resource requires an id')(
      request,
      response,
    );
  }

  try {
    const token = request.headers.authorization;
    const headers = getHeaders(token);
    const categoryEndpoint = `${CATEGORY_ENDPOINT}/${request.params.id}`;

    await axios.delete(categoryEndpoint, headers);

    return response.status(200).send('OK');
  } catch (error) {
    return errorApiResponse(400, 'Bad Request', error)(request, response);
  }
}

export async function put(request, response) {
  const categoryId = request.params.id;
  const categoryBody = request.body;

  if (request.params.id && isNaN(request.params.id)) {
    return warningApiResponse(400, 'The resource requires an id')(
      request,
      response,
    );
  }

  if (!categoryBody) {
    return warningApiResponse(400, 'The request [body] cannot be null')(
      request,
      response,
    );
  }

  try {
    const token = request.headers.authorization;
    const headers = getHeaders(token);
    const endpoint = `${CATEGORY_ENDPOINT}/${categoryId}`;

    const postedResponse = await axios.put(endpoint, categoryBody, headers);
    const updatedCategory = postedResponse.data;

    return response.status(200).json(updatedCategory);
  } catch (error) {
    return errorApiResponse(400, 'Bad Request', error)(request, response);
  }
}

export async function post(request, response) {
  const categoryBody = request.body;
  if (request.params.id) {
    return warningApiResponse(400, 'The resource does not accept an id')(
      request,
      response,
    );
  }

  if (!categoryBody) {
    return warningApiResponse(400, 'The request [body] cannot be null')(
      request,
      response,
    );
  }

  try {
    const token = request.headers.authorization;
    const headers = getHeaders(token);

    const postedResponse = await axios.post(
      CATEGORY_ENDPOINT,
      categoryBody,
      headers,
    );
    const newCategory = postedResponse.data;

    return response.status(200).json(newCategory);
  } catch (error) {
    return errorApiResponse(400, 'Bad Request', error)(request, response);
  }
}

export default {
  get,
  put,
  post,
  deleteCategory,
};
