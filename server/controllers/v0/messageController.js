import api from '../../utilities/api';

import logger from '../../middleware/logger';
import {
  V0_MESSAGE_GET_ENDPOINT,
  V0_MESSAGE_MARK_READ_ENDPOINT,
  V0_MESSAGE_DELETE_ENDPOINT,
} from '../../utilities/endpoints';

export async function get(request, response) {
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
      V0_MESSAGE_GET_ENDPOINT,
      postBody,
    );

    const newResource = postedResponse.data;

    return response.status(200).json(newResource);
  } catch (error) {
    logger.info(error);
    logger.info(`Error retrieving a new message: ${JSON.stringify(postBody)}`);
    return response.status(400).send('Failed to retrieve a new message');
  }
}

export async function markRead(request, response) {
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
      V0_MESSAGE_MARK_READ_ENDPOINT,
      postBody,
    );

    const updatedResource = postedResponse.data;

    return response.status(200).json(updatedResource);
  } catch (error) {
    logger.info(error);
    logger.info(`Error marking a message as read: ${JSON.stringify(postBody)}`);
    return response.status(400).send('Failed to mark a message as read');
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
      V0_MESSAGE_DELETE_ENDPOINT,
      postBody,
    );

    const updatedResource = postedResponse.data;

    return response.status(200).json(updatedResource);
  } catch (error) {
    logger.info(error);
    logger.info(`Error deleting a message: ${JSON.stringify(postBody)}`);
    return response.status(400).send('Failed to delete a message');
  }
}

export default {
  get,
  markRead,
  delete: deleteResource,
};
