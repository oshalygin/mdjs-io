import axios from 'axios';
import fs from 'fs';
import path from 'path';
import rp from 'request-promise';

import { getHeaders } from '../utilities/requestUtilities';
import logger from '../utilities/middleware/logger';
import { ITEM_ENDPOINT } from '../utilities/endpoints';

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

      logger.info(`Invalid request: token: ${token}, endpoint: ${itemEndpoint}`);
      return response
        .status(400)
        .send('Bad request');
    }

    const itemData = itemResponse.data.data;

    return response
      .status(200)
      .json(itemData);

  } catch (error) {

    logger.info(error);
    return response
      .status(404)
      .send('Resource not found');
  }
}

export async function deleteItem(request, response) {

  const itemId = request.params.id;

  if (!itemId) {
    return response
      .status(400)
      .send('This resource expects an item id');
  }

  try {
    const token = request.headers.authorization;
    const headers = getHeaders(token);
    const itemEndpoint = `${ITEM_ENDPOINT}/${request.params.id}`;

    await axios.delete(itemEndpoint, headers);

    return response
      .status(200);

  } catch (error) {

    logger.info(error);
    logger.info(`Error deleting: ${itemId}`);
    return response
      .status(400)
      .send('Failed delete the item');
  }
}

export async function put(request, response) {

  const itemId = request.params.id;
  const itemBody = request.body.item;
  if (request.params.id && isNaN(request.params.id)) {
    return response
      .status(400)
      .send('The item {id} must be a number representing the itemId');
  }
  
  if (!itemBody) {
    logger.error(`The request {body} cannot be null, ${request.originalUrl}`);
    return response
      .status(400)
      .send('The item {body} cannot be empty');
  }

  try {

    let file;
    const token = request.headers.authorization;
    const headers = getHeaders(token);
    headers.headers['Content-Type'] = false;
    headers.headers.Accept = 'application/json'; //Refactor into standard headers

    const formData = {
      item: itemBody
    };

    if (!request.file) {
      file = null;
    } else {
      file = path.join(__dirname, `../../temp-images/${request.file.originalname}`);
      formData.file = fs.createReadStream(file);
    }

    const postedResponse = await rp.post({ url: ITEM_ENDPOINT, formData, headers: headers.headers });
    const newItem = JSON.parse(postedResponse);

    if (file) {
      fs.unlink(file);
    }

    return response
      .status(200)
      .json(newItem);

  } catch (error) {
    if (request.file) {
      const file = path.join(__dirname, `../../temp-images/${request.file.originalname}`);
      fs.unlink(file);
    }

    logger.info(error);
    logger.info(`Error updating: ${itemId}`);
    logger.info(`Error updating: ${JSON.stringify(itemBody)}`);
    return response
      .status(400)
      .send('Failed to update the item');
  }
  
}

export async function post(request, response) {
  
  const itemBody = request.body.item;

  if (request.params.id) {
    return response
      .status(400)
      .send('This resource does not accept an id');
  }

  if (!itemBody) {
    logger.error(`The request {body} cannot be null, ${request.originalUrl}`);
    return response
      .status(400)
      .send('The item {body} cannot be empty');
  }

  try {
    let file;
    const token = request.headers.authorization;
    const headers = getHeaders(token);
    headers.headers['Content-Type'] = false;
    headers.headers.Accept = 'application/json'; //Refactor into standard headers

    const formData = {
      item: itemBody
    };


    if (!request.file) {
      file = null;
    } else {
      file = path.join(__dirname, `../../temp-images/${request.file.originalname}`);
      formData.file = fs.createReadStream(file);
    }

    const postedResponse = await rp.post({ url: ITEM_ENDPOINT, formData, headers: headers.headers });
    
    const newItem = JSON.parse(postedResponse);
    
    if (file) {
      fs.unlink(file);
    }

    return response
      .status(200)
      .json(newItem);

  } catch (error) {
    if (request.file) {
      const file = path.join(__dirname, `../../temp-images/${request.file.originalname}`);
      fs.unlink(file);
    }

    logger.info(error);
    logger.info(`Error posting a new item: ${JSON.stringify(itemBody)}`);
    return response
      .status(400)
      .send('Failed to create a new item');
  }
}

export default {
  get,
  put,
  post,
  deleteItem
};
