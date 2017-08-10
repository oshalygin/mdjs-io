import api from '../../utilities/api';

import {
  errorApiResponse,
  warningApiResponse,
} from '../../utilities/requestUtilities';
import {
  V0_ORDERS_HEADERS_ENDPOINT,
  V0_ORDERS_HEADERS_V2_ENDPOINT,
  V0_ORDERS_GIFT_CARD_CHECK_ENDPOINT,
  V0_ORDERS_SELECT_ENDPOINT,
  V0_ORDERS_REFUND_ENDPOINT,
  V0_ORDERS_CREATE_ENDPOINT,
  V0_ORDERS_COMPLETE_ENDPOINT,
  V0_ORDERS_CANCEL_ENDPOINT,
  V0_ORDERS_UPDATE_ENDPOINT,
  V0_ORDERS_PAY_ENDPOINT,
} from '../../utilities/endpoints';

export async function headers(request, response) {
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
      V0_ORDERS_HEADERS_ENDPOINT,
      postBody,
    );

    const newResource = postedResponse.data;

    return response.status(200).json(newResource);
  } catch (error) {
    return errorApiResponse(400, 'Bad Request', error)(request, response);
  }
}

export async function headersV2(request, response) {
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
      V0_ORDERS_HEADERS_V2_ENDPOINT,
      postBody,
    );

    const updatedResource = postedResponse.data;

    return response.status(200).json(updatedResource);
  } catch (error) {
    return errorApiResponse(400, 'Bad Request', error)(request, response);
  }
}

export async function giftCardCheck(request, response) {
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
      V0_ORDERS_GIFT_CARD_CHECK_ENDPOINT,
      postBody,
    );

    const updatedResource = postedResponse.data;

    return response.status(200).json(updatedResource);
  } catch (error) {
    return errorApiResponse(400, 'Bad Request', error)(request, response);
  }
}

export async function select(request, response) {
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
      V0_ORDERS_SELECT_ENDPOINT,
      postBody,
    );

    const newResource = postedResponse.data;

    return response.status(200).json(newResource);
  } catch (error) {
    return errorApiResponse(400, 'Bad Request', error)(request, response);
  }
}

export async function refund(request, response) {
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
      V0_ORDERS_REFUND_ENDPOINT,
      postBody,
    );

    const newResource = postedResponse.data;

    return response.status(200).json(newResource);
  } catch (error) {
    return errorApiResponse(400, 'Bad Request', error)(request, response);
  }
}

export async function create(request, response) {
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
      V0_ORDERS_CREATE_ENDPOINT,
      postBody,
    );

    const newResource = postedResponse.data;

    return response.status(200).json(newResource);
  } catch (error) {
    return errorApiResponse(400, 'Bad Request', error)(request, response);
  }
}

export async function complete(request, response) {
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
      V0_ORDERS_COMPLETE_ENDPOINT,
      postBody,
    );

    const newResource = postedResponse.data;

    return response.status(200).json(newResource);
  } catch (error) {
    return errorApiResponse(400, 'Bad Request', error)(request, response);
  }
}

export async function cancel(request, response) {
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
      V0_ORDERS_CANCEL_ENDPOINT,
      postBody,
    );

    const newResource = postedResponse.data;

    return response.status(200).json(newResource);
  } catch (error) {
    return errorApiResponse(400, 'Bad Request', error)(request, response);
  }
}

export async function update(request, response) {
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
      V0_ORDERS_UPDATE_ENDPOINT,
      postBody,
    );

    const newResource = postedResponse.data;

    return response.status(200).json(newResource);
  } catch (error) {
    return errorApiResponse(400, 'Bad Request', error)(request, response);
  }
}

export async function pay(request, response) {
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
      V0_ORDERS_PAY_ENDPOINT,
      postBody,
    );

    const newResource = postedResponse.data;

    return response.status(200).json(newResource);
  } catch (error) {
    return errorApiResponse(400, 'Bad Request', error)(request, response);
  }
}

export default {
  headers,
  headersV2,
  giftCardCheck,
  select,
  refund,
  create,
  complete,
  cancel,
  update,
  pay,
};
