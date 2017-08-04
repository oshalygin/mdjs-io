import api from '../../utilities/api';

import logger from '../../middleware/logger';
import {
  V0_REFUNDREASON_CREATE_ENDPOINT,
  V0_REFUNDREASON_UPDATE_ENDPOINT,
  V0_REFUNDREASON_DELETE_ENDPOINT,
} from '../../utilities/endpoints';

export async function create(request, response) {
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
      V0_REFUNDREASON_CREATE_ENDPOINT,
      postBody,
    );

    const newResource = postedResponse.data;

    return response.status(200).json(newResource);
  } catch (error) {
    logger.info(error);
    logger.info(
      `Error posting a new refund reason: ${JSON.stringify(postBody)}`,
    );
    return response.status(400).send('Failed to create a new refund reason');
  }
}

export async function update(request, response) {
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
      V0_REFUNDREASON_UPDATE_ENDPOINT,
      postBody,
    );

    const updatedResource = postedResponse.data;

    return response.status(200).json(updatedResource);
  } catch (error) {
    logger.info(error);
    logger.info(`Error updating a refund reason: ${JSON.stringify(postBody)}`);
    return response.status(400).send('Failed to update a refund reason');
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
      V0_REFUNDREASON_DELETE_ENDPOINT,
      postBody,
    );

    const updatedResource = postedResponse.data;

    return response.status(200).json(updatedResource);
  } catch (error) {
    logger.info(error);
    logger.info(`Error deleting a refund reason: ${JSON.stringify(postBody)}`);
    return response.status(400).send('Failed to delete a refund reason');
  }
}

export default {
  create,
  update,
  delete: deleteResource,
};
