import api from '../../utilities/api';

import logger from '../../middleware/logger';
import {
  V0_INVENTORY_FOR_ITEMS_ENDPOINT,
  V0_INVENTORY_SET_INVENTORY_ENDPOINT,
  V0_INVENTORY_ADD_TO_INVENTORY_ENDPOINT,
} from '../../utilities/endpoints';

export async function inventoryForItems(request, response) {
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
      V0_INVENTORY_FOR_ITEMS_ENDPOINT,
      postBody,
    );

    const newResource = postedResponse.data;

    return response.status(200).json(newResource);
  } catch (error) {
    logger.info(error);
    logger.info(
      `Error posting inventory for items: ${JSON.stringify(postBody)}`,
    );
    return response.status(400).send('Failed to add inventory for items');
  }
}

export async function setInventory(request, response) {
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
      V0_INVENTORY_SET_INVENTORY_ENDPOINT,
      postBody,
    );

    const updatedResource = postedResponse.data;

    return response.status(200).json(updatedResource);
  } catch (error) {
    logger.info(error);
    logger.info(`Error setting the inventory: ${JSON.stringify(postBody)}`);
    return response.status(400).send('Failed to set the inventory');
  }
}

export async function addToInventory(request, response) {
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
      V0_INVENTORY_ADD_TO_INVENTORY_ENDPOINT,
      postBody,
    );

    const updatedResource = postedResponse.data;

    return response.status(200).json(updatedResource);
  } catch (error) {
    logger.info(error);
    logger.info(`Error adding to inventory: ${JSON.stringify(postBody)}`);
    return response.status(400).send('Failed to add to inventory');
  }
}

export default {
  inventoryForItems,
  setInventory,
  addToInventory,
};
