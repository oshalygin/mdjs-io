import axios from 'axios';

import {
  getHeaders,
  warningApiResponse,
  errorApiResponse,
} from '../../utilities/requestUtilities';
import { DISCOUNT_ENDPOINT } from '../../utilities/endpoints';

export async function get(request, response) {
  if (request.params.id && isNaN(request.params.id)) {
    return warningApiResponse(400, 'The resource requires an id')(
      request,
      response,
    );
  }
  try {
    const { token } = request;
    const headers = getHeaders(token);

    const discountEndpoint = request.params.id
      ? `${DISCOUNT_ENDPOINT}/${request.params.id}`
      : DISCOUNT_ENDPOINT;

    const discountResponse = await axios.get(discountEndpoint, headers);

    if (!discountResponse.data.data) {
      return errorApiResponse(400, 'Bad Request')(request, response);
    }

    const discountData = discountResponse.data.data;

    return response.status(200).json(discountData);
  } catch (error) {
    return errorApiResponse(404, 'Resource not found', error)(
      request,
      response,
    );
  }
}

export async function deleteDiscount(request, response) {
  const discountId = request.params.id;

  if (!discountId) {
    return warningApiResponse(400, 'The resource requires an id')(
      request,
      response,
    );
  }

  try {
    const { token } = request;
    const headers = getHeaders(token);
    const discountEndpoint = `${DISCOUNT_ENDPOINT}/${request.params.id}`;

    await axios.delete(discountEndpoint, headers);

    return response.status(200).send('OK');
  } catch (error) {
    return errorApiResponse(400, 'Bad Request')(request, response);
  }
}

export async function put(request, response) {
  const discountId = request.params.id;
  const discountBody = request.body;

  if (request.params.id && isNaN(request.params.id)) {
    return warningApiResponse(400, 'The resource requires an id')(
      request,
      response,
    );
  }

  if (!discountBody) {
    return warningApiResponse(400, 'The request [body] cannot be null')(
      request,
      response,
    );
  }

  try {
    const { token } = request;
    const headers = getHeaders(token);
    const endpoint = `${DISCOUNT_ENDPOINT}/${discountId}`;

    const postedResponse = await axios.put(endpoint, discountBody, headers);
    const updatedDiscount = postedResponse.data;

    return response.status(200).json(updatedDiscount);
  } catch (error) {
    return errorApiResponse(400, 'Bad Request', error)(request, response);
  }
}

export async function post(request, response) {
  const discountBody = request.body;
  if (request.params.id) {
    return warningApiResponse(400, 'The resource does not accept an id')(
      request,
      response,
    );
  }

  if (!discountBody) {
    return warningApiResponse(400, 'The request [body] cannot be null')(
      request,
      response,
    );
  }

  try {
    const { token } = request;
    const headers = getHeaders(token);

    const postedResponse = await axios.post(
      DISCOUNT_ENDPOINT,
      discountBody,
      headers,
    );
    const newDiscount = postedResponse.data;

    return response.status(200).json(newDiscount);
  } catch (error) {
    return errorApiResponse(400, 'Bad Request', error)(request, response);
  }
}

export default {
  get,
  put,
  post,
  deleteDiscount,
};
