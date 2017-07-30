import axios from 'axios';
import fs from 'fs';
import fsUtility from '../../utilities/fsUtility';
import path from 'path';

import { getHeaders } from '../../utilities/requestUtilities';
import logger from '../../middleware/logger';
import { ITEM_ENDPOINT } from '../../utilities/endpoints';
import imageService from '../../services/imageService';

export async function get(request, response) {
  if (request.params.id && isNaN(request.params.id)) {
    return response
      .status(400)
      .send('The item {id} must be a number representing the itemId');
  }
  try {
    const token = request.headers.authorization;
    const headers = getHeaders(token);

    const itemEndpoint = request.params.id
      ? `${ITEM_ENDPOINT}/${request.params.id}`
      : ITEM_ENDPOINT;

    const itemResponse = await axios.get(itemEndpoint, headers);

    if (!itemResponse.data.data) {
      logger.info(
        `Invalid request: token: ${token}, endpoint: ${itemEndpoint}`,
      );
      return response.status(400).send('Bad request');
    }

    const itemData = itemResponse.data.data;

    return response.status(200).json(itemData);
  } catch (error) {
    logger.info(error);
    return response.status(404).send('Resource not found');
  }
}

export async function deleteItem(request, response) {
  const itemId = request.params.id;

  if (!itemId) {
    return response.status(400).send('This resource expects an item id');
  }

  try {
    const token = request.headers.authorization;
    const headers = getHeaders(token);
    const itemEndpoint = `${ITEM_ENDPOINT}/${request.params.id}`;

    await axios.delete(itemEndpoint, headers);

    return response.status(200).send('OK');
  } catch (error) {
    logger.info(error);
    logger.info(`Error deleting: ${itemId}`);
    return response.status(400).send('Failed delete the item');
  }
}

//eslint-disable-next-line consistent-return
export async function put(request, response) {
  const itemId = request.params.id;
  const itemBody = request.body.item;

  if (itemId && isNaN(itemId)) {
    return response
      .status(400)
      .send('The item {id} must be a number representing the itemId');
  }

  if (!itemBody) {
    logger.error(`The request {body} cannot be null, ${request.originalUrl}`);
    return response.status(400).send('The item {body} cannot be empty');
  }

  try {
    let file;

    const item = JSON.parse(itemBody);
    const token = request.headers.authorization;
    const headers = getHeaders(token);

    const itemEndpoint = `${ITEM_ENDPOINT}/${itemId}`;

    if (!request.file) {
      file = null;
    } else {
      file = path.join(
        __dirname,
        `../../../temp-images/${request.file.originalname}`,
      );
      const fileStream = fs.createReadStream(file);

      const imageNames = await imageService.upload(
        fileStream,
        request.file.originalname,
      );
      item.photoURL = imageNames[0];
    }

    const postedResponse = await axios.put(itemEndpoint, item, headers);
    const updatedItem = postedResponse.data;

    if (!file) {
      return response.status(200).json(updatedItem);
    }

    await fsUtility
      .unlink(file)
      .then(() => {
        return response.status(200).json(updatedItem);
      })
      .catch(error => {
        logger.error(error);
        return response.status(200).json(updatedItem);
      });
  } catch (error) {
    logger.info(error);
    logger.info(`Error updating: ${itemId}`);
    logger.info(`Error updating: ${JSON.stringify(itemBody)}`);

    // Cleanup
    if (!request.file) {
      return response.status(400).send('Failed to update the item');
    }
    const file = path.join(
      __dirname,
      `../../../temp-images/${request.file.originalname}`,
    );

    fs.unlink(file, unlinkError => {
      if (unlinkError) {
        logger.error(unlinkError);
      }

      return response.status(400).send('Failed to update the item');
    });
  }
}

//eslint-disable-next-line consistent-return
export async function post(request, response) {
  const itemBody = request.body.item;

  if (request.params.id) {
    return response.status(400).send('This resource does not accept an id');
  }

  if (!itemBody) {
    logger.error(`The request {body} cannot be null, ${request.originalUrl}`);
    return response.status(400).send('The item {body} cannot be empty');
  }

  try {
    let file;

    const item = JSON.parse(itemBody);
    const token = request.headers.authorization;
    const headers = getHeaders(token);

    if (!request.file) {
      file = null;
    } else {
      file = path.join(
        __dirname,
        `../../../temp-images/${request.file.originalname}`,
      );
      const fileStream = fs.createReadStream(file);

      const imageNames = await imageService.upload(
        fileStream,
        request.file.originalname,
      );
      item.photoURL = imageNames[0];
    }
    const postedResponse = await axios.post(ITEM_ENDPOINT, item, headers);
    const newItem = postedResponse.data;

    if (!file) {
      return response.status(200).json(newItem);
    }

    await fsUtility
      .unlink(file)
      .then(() => {
        return response.status(200).json(newItem);
      })
      .catch(error => {
        logger.error(error);
        return response.status(200).json(newItem);
      });
  } catch (error) {
    logger.info(error);
    logger.info(`Error updating: ${JSON.stringify(itemBody)}`);

    // Cleanup
    if (!request.file) {
      return response.status(400).send('Failed to update the item');
    }
    const file = path.join(
      __dirname,
      `../../../temp-images/${request.file.originalname}`,
    );

    fs.unlink(file, unlinkError => {
      if (unlinkError) {
        logger.error(unlinkError);
      }

      return response.status(400).send('Failed to update the item');
    });
  }
}

export default {
  get,
  put,
  post,
  deleteItem,
};
