import axios from 'axios';

import {
  getHeaders,
  errorApiResponse,
  warningApiResponse,
} from '../../utilities/requestUtilities';
import { MODIFIER_ENDPOINT } from '../../utilities/endpoints';

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

    const modifierEndpoint = request.params.id
      ? `${MODIFIER_ENDPOINT}/${request.params.id}`
      : MODIFIER_ENDPOINT;

    const modifierResponse = await axios.get(modifierEndpoint, headers);

    if (!modifierResponse.data) {
      return errorApiResponse(400, 'Bad Request')(request, response);
    }

    const modifierData = modifierResponse.data;

    return response.status(200).json(modifierData);
  } catch (error) {
    return errorApiResponse(404, 'Resource not found', error)(
      request,
      response,
    );
  }
}

export async function deleteModifier(request, response) {
  const modifierId = request.params.id;

  if (!modifierId) {
    return warningApiResponse(400, 'The resource requires an id')(
      request,
      response,
    );
  }

  try {
    const { token } = request;
    const headers = getHeaders(token);
    const modifierEndpoint = `${MODIFIER_ENDPOINT}/${request.params.id}`;

    await axios.delete(modifierEndpoint, headers);

    return response.status(200).send('OK');
  } catch (error) {
    return errorApiResponse(400, 'Bad Request', error)(request, response);
  }
}

export async function put(request, response) {
  const modifierId = request.params.id;
  const modifierBody = request.body;

  if (request.params.id && isNaN(request.params.id)) {
    return warningApiResponse(400, 'The resource requires an id')(
      request,
      response,
    );
  }

  if (!modifierBody) {
    return warningApiResponse(400, 'The resource requires an id')(
      request,
      response,
    );
  }

  try {
    const { token } = request;
    const headers = getHeaders(token);
    const endpoint = `${MODIFIER_ENDPOINT}/${modifierId}`;

    const postedResponse = await axios.put(endpoint, modifierBody, headers);
    const updatedModifier = postedResponse.data;

    return response.status(200).json(updatedModifier);
  } catch (error) {
    return errorApiResponse(400, 'Bad Request', error)(request, response);
  }
}

export async function post(request, response) {
  const modifierBody = request.body;
  if (request.params.id) {
    return warningApiResponse(400, 'The resource does not accept an id')(
      request,
      response,
    );
  }

  if (!modifierBody) {
    return warningApiResponse(400, 'The request [body] cannot be null')(
      request,
      response,
    );
  }

  try {
    const { token } = request;
    const headers = getHeaders(token);

    const postedResponse = await axios.post(
      MODIFIER_ENDPOINT,
      modifierBody,
      headers,
    );
    const newModifier = postedResponse.data;

    return response.status(200).json(newModifier);
  } catch (error) {
    return errorApiResponse(400, 'Bad Request', error)(request, response);
  }
}

export default {
  get,
  put,
  post,
  deleteModifier,
};
