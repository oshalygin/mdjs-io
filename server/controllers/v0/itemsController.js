import api from '../../utilities/api';

import logger from '../../middleware/logger';
import {
  V0_ITEMS_CREATE_UPDATE_ENDPOINT,
  V0_ITEMS_DELETE_ENDPOINT,
} from '../../utilities/endpoints';

export async function createUpdate(request, response) {
  const postBody = request.body;
  if (request.params.id) {
    return response.status(400).send('This resource does not accept an id');
  }

  if (!postBody) {
    logger.error(`The request [body] cannot be null, ${request.originalUrl}`);
    return response.status(400).send('The request [body] cannot be empty');
  }

  try {
    const token = request.headers.authorization;

    const postedResponse = await api.post(token)(
      V0_ITEMS_CREATE_UPDATE_ENDPOINT,
      postBody,
    );

    const newResource = postedResponse.data;

    return response.status(200).json(newResource);
  } catch (error) {
    logger.info(error);
    logger.info(
      `Error posting an update or creation to an item: ${JSON.stringify(
        postBody,
      )}`,
    );
    return response
      .status(400)
      .send('Failed to create an update or creation to an item');
  }
}

export async function deleteResource(request, response) {
  const postBody = request.body;
  if (request.params.id) {
    return response.status(400).send('This resource does not accept an id');
  }

  if (!postBody) {
    logger.error(`The request [body] cannot be null, ${request.originalUrl}`);
    return response.status(400).send('The request [body] cannot be empty');
  }

  try {
    const token = request.headers.authorization;

    const postedResponse = await api.post(token)(
      V0_ITEMS_DELETE_ENDPOINT,
      postBody,
    );

    const updatedResource = postedResponse.data;

    return response.status(200).json(updatedResource);
  } catch (error) {
    logger.info(error);
    logger.info(`Error deleting an item: ${JSON.stringify(postBody)}`);
    return response.status(400).send('Failed to delete an item');
  }
}

export default {
  createUpdate,
  delete: deleteResource,
};
