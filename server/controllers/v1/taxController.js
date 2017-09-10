import axios from 'axios';

import {
  getHeaders,
  errorApiResponse,
  warningApiResponse,
} from '../../utilities/requestUtilities';
import { TAX_ENDPOINT } from '../../utilities/endpoints';

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

    const taxEndpoint = request.params.id
      ? `${TAX_ENDPOINT}/${request.params.id}`
      : TAX_ENDPOINT;

    const taxResponse = await axios.get(taxEndpoint, headers);

    if (!taxResponse.data.data) {
      return errorApiResponse(400, 'Bad Request')(request, response);
    }

    const taxData = taxResponse.data.data;

    return response.status(200).json(taxData);
  } catch (error) {
    return errorApiResponse(404, 'Resource not found', error)(
      request,
      response,
    );
  }
}

export async function deleteTax(request, response) {
  const taxId = request.params.id;

  if (!taxId) {
    return warningApiResponse(400, 'The resource requires an id')(
      request,
      response,
    );
  }

  try {
    const { token } = request;
    const headers = getHeaders(token);
    const taxEndpoint = `${TAX_ENDPOINT}/${request.params.id}`;

    await axios.delete(taxEndpoint, headers);

    return response.status(200).send('OK');
  } catch (error) {
    return errorApiResponse(400, 'Bad Request', error)(request, response);
  }
}

export async function put(request, response) {
  const taxId = request.params.id;
  const taxBody = request.body;

  if (request.params.id && isNaN(request.params.id)) {
    return warningApiResponse(400, 'The resource requires an id')(
      request,
      response,
    );
  }

  if (!taxBody) {
    return warningApiResponse(400, 'The request [body] cannot be null')(
      request,
      response,
    );
  }

  try {
    const { token } = request;
    const headers = getHeaders(token);
    const endpoint = `${TAX_ENDPOINT}/${taxId}`;

    const postedResponse = await axios.put(endpoint, taxBody, headers);
    const updatedTax = postedResponse.data;

    return response.status(200).json(updatedTax);
  } catch (error) {
    return errorApiResponse(400, 'Bad Request', error)(request, response);
  }
}

export async function post(request, response) {
  const taxBody = request.body;
  if (request.params.id) {
    return warningApiResponse(400, 'The resource does not accept an id')(
      request,
      response,
    );
  }

  if (!taxBody) {
    return warningApiResponse(400, 'The request [body] cannot be null')(
      request,
      response,
    );
  }

  try {
    const { token } = request;
    const headers = getHeaders(token);

    const postedResponse = await axios.post(TAX_ENDPOINT, taxBody, headers);
    const newTax = postedResponse.data;

    return response.status(200).json(newTax);
  } catch (error) {
    return errorApiResponse(400, 'Bad Request', error)(request, response);
  }
}

export default {
  get,
  put,
  post,
  deleteTax,
};
