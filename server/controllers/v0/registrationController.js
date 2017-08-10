import api from '../../utilities/api';

import {
  errorApiResponse,
  warningApiResponse,
} from '../../utilities/requestUtilities';
import {
  V0_REGISTRATION_REGISTER_ENDPOINT,
  V0_REGISTRATION_BANK_ENDPOINT,
  V0_REGISTRATION_BUSINESS_ENDPOINT,
  V0_REGISTRATION_PRINCIPAL_ENDPOINT,
  V0_REGISTRATION_STATUS_ENDPOINT,
} from '../../utilities/endpoints';

export async function register(request, response) {
  const postBody = request.body;
  if (request.params.id) {
    return warningApiResponse(400, 'The resource does not accept an id')(
      request,
      response,
    );
  }

  if (!postBody) {
    return warningApiResponse(400, 'The request [body] cannot be null')(
      request,
      response,
    );
  }

  try {
    const token = 'Authorization';

    const postedResponse = await api.post(token)(
      V0_REGISTRATION_REGISTER_ENDPOINT,
      postBody,
    );

    const newResource = postedResponse.data;

    return response.status(200).json(newResource);
  } catch (error) {
    return errorApiResponse(400, 'Bad Request', error)(request, response);
  }
}

export async function bank(request, response) {
  const postBody = request.body;
  if (request.params.id) {
    return warningApiResponse(400, 'The resource does not accept an id')(
      request,
      response,
    );
  }

  if (!postBody) {
    return warningApiResponse(400, 'The request [body] cannot be null')(
      request,
      response,
    );
  }

  try {
    const token = request.headers.authorization;

    const postedResponse = await api.post(token)(
      V0_REGISTRATION_BANK_ENDPOINT,
      postBody,
    );

    const updatedResource = postedResponse.data;

    return response.status(200).json(updatedResource);
  } catch (error) {
    return errorApiResponse(400, 'Bad Request', error)(request, response);
  }
}

export async function business(request, response) {
  const postBody = request.body;
  if (request.params.id) {
    return warningApiResponse(400, 'The resource does not accept an id')(
      request,
      response,
    );
  }

  if (!postBody) {
    return warningApiResponse(400, 'The request [body] cannot be null')(
      request,
      response,
    );
  }

  try {
    const token = request.headers.authorization;

    const postedResponse = await api.post(token)(
      V0_REGISTRATION_BUSINESS_ENDPOINT,
      postBody,
    );

    const updatedResource = postedResponse.data;

    return response.status(200).json(updatedResource);
  } catch (error) {
    return errorApiResponse(400, 'Bad Request', error)(request, response);
  }
}

export async function principal(request, response) {
  const postBody = request.body;
  if (request.params.id) {
    return warningApiResponse(400, 'The resource does not accept an id')(
      request,
      response,
    );
  }

  if (!postBody) {
    return warningApiResponse(400, 'The request [body] cannot be null')(
      request,
      response,
    );
  }

  try {
    const token = request.headers.authorization;

    const postedResponse = await api.post(token)(
      V0_REGISTRATION_PRINCIPAL_ENDPOINT,
      postBody,
    );

    const updatedResource = postedResponse.data;

    return response.status(200).json(updatedResource);
  } catch (error) {
    return errorApiResponse(400, 'Bad Request', error)(request, response);
  }
}

export async function status(request, response) {
  const postBody = request.body;
  if (request.params.id) {
    return warningApiResponse(400, 'The resource does not accept an id')(
      request,
      response,
    );
  }

  if (!postBody) {
    return warningApiResponse(400, 'The request [body] cannot be null')(
      request,
      response,
    );
  }

  try {
    const token = request.headers.authorization;

    const postedResponse = await api.post(token)(
      V0_REGISTRATION_STATUS_ENDPOINT,
      postBody,
    );

    const updatedResource = postedResponse.data;

    return response.status(200).json(updatedResource);
  } catch (error) {
    return errorApiResponse(400, 'Bad Request', error)(request, response);
  }
}

export default {
  register,
  bank,
  business,
  principal,
  status,
};
