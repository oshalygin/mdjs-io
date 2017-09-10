import axios from 'axios';

import {
  getHeaders,
  errorApiResponse,
  warningApiResponse,
} from '../../utilities/requestUtilities';
import { ITEM_ENDPOINT } from '../../utilities/endpoints';
import imageService from '../../services/imageService';

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

    const itemEndpoint = request.params.id
      ? `${ITEM_ENDPOINT}/${request.params.id}`
      : ITEM_ENDPOINT;

    const itemResponse = await axios.get(itemEndpoint, headers);

    if (!itemResponse.data.data) {
      return errorApiResponse(400, 'Bad Request')(request, response);
    }

    const itemData = itemResponse.data.data;

    return response.status(200).json(itemData);
  } catch (error) {
    return errorApiResponse(404, 'Resource not found', error)(
      request,
      response,
    );
  }
}

export async function deleteItem(request, response) {
  const itemId = request.params.id;

  if (!itemId) {
    return warningApiResponse(400, 'The resource requires an id')(
      request,
      response,
    );
  }

  try {
    const { token } = request;
    const headers = getHeaders(token);
    const itemEndpoint = `${ITEM_ENDPOINT}/${request.params.id}`;

    await axios.delete(itemEndpoint, headers);

    return response.status(200).send('OK');
  } catch (error) {
    return errorApiResponse(400, 'Bad Request', error)(request, response);
  }
}

export async function put(request, response) {
  const itemId = request.params.id;
  const itemBody = request.body.item;

  if (itemId && isNaN(itemId)) {
    return warningApiResponse(400, 'The resource requires an id')(
      request,
      response,
    );
  }

  if (!itemBody) {
    return warningApiResponse(400, 'The request [body] cannot be null')(
      request,
      response,
    );
  }

  try {
    const item = JSON.parse(itemBody);
    const { token } = request;
    const headers = getHeaders(token);

    const itemEndpoint = `${ITEM_ENDPOINT}/${itemId}`;

    if (request.file) {
      const { file } = request;

      const imageNames = await imageService.upload(
        file.buffer,
        file.originalname,
      );
      item.photoURL = imageNames[0];
    }

    const postedResponse = await axios.put(itemEndpoint, item, headers);
    const updatedItem = postedResponse.data;

    return response.status(200).json(updatedItem);
  } catch (error) {
    return errorApiResponse(400, 'Bad Request', error)(request, response);
  }
}

export async function post(request, response) {
  const itemBody = request.body.item;

  if (request.params.id) {
    return warningApiResponse(400, 'The resource does not accept an id')(
      request,
      response,
    );
  }

  if (!itemBody) {
    return warningApiResponse(400, 'The request [body] cannot be null')(
      request,
      response,
    );
  }

  try {
    const item = JSON.parse(itemBody);
    const { token } = request;
    const headers = getHeaders(token);

    if (request.file) {
      const { file } = request;

      const imageNames = await imageService.upload(
        file.buffer,
        file.originalname,
      );
      item.photoURL = imageNames[0];
    }
    const postedResponse = await axios.post(ITEM_ENDPOINT, item, headers);
    const newItem = postedResponse.data;

    return response.status(200).json(newItem);
  } catch (error) {
    return errorApiResponse(400, 'Bad Request', error)(request, response);
  }
}

export default {
  get,
  put,
  post,
  deleteItem,
};
