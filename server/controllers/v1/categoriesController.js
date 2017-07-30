import axios from 'axios';

import { getHeaders } from '../../utilities/requestUtilities';
import logger from '../../middleware/logger';
import { CATEGORY_ENDPOINT } from '../../utilities/endpoints';

export async function get(request, response) {
  if (request.params.id && isNaN(request.params.id)) {
    return response
      .status(400)
      .send('The category {id} must be a number representing the categoryID');
  }
  try {
    const token = request.headers.authorization;
    const headers = getHeaders(token);

    const categoryEndpoint = request.params.id
      ? `${CATEGORY_ENDPOINT}/${request.params.id}`
      : CATEGORY_ENDPOINT;

    const categoryResponse = await axios.get(categoryEndpoint, headers);

    if (!categoryResponse.data.data) {
      logger.info(
        `Invalid request: token: ${token}, endpoint: ${categoryEndpoint}`,
      );
      return response.status(400).send('Bad request');
    }

    const categoriesData = categoryResponse.data.data;

    return response.status(200).json(categoriesData);
  } catch (error) {
    logger.info(error);
    return response.status(404).send('Resource not found');
  }
}

export async function deleteCategory(request, response) {
  const categoryId = request.params.id;

  if (!categoryId) {
    return response.status(400).send('This resource expects a category id');
  }

  try {
    const token = request.headers.authorization;
    const headers = getHeaders(token);
    const categoryEndpoint = `${CATEGORY_ENDPOINT}/${request.params.id}`;

    await axios.delete(categoryEndpoint, headers);

    return response.status(200).send('OK');
  } catch (error) {
    logger.info(error);
    logger.info(`Error deleting: ${categoryId}`);
    return response.status(400).send('Failed delete the category');
  }
}

export async function put(request, response) {
  const categoryId = request.params.id;
  const categoryBody = request.body;

  if (request.params.id && isNaN(request.params.id)) {
    return response
      .status(400)
      .send('The category {id} must be a number representing the categoryId');
  }

  if (!categoryBody) {
    logger.error(`The request {body} cannot be null, ${request.originalUrl}`);
    return response.status(400).send('The category {body} cannot be empty');
  }

  try {
    const token = request.headers.authorization;
    const headers = getHeaders(token);
    const endpoint = `${CATEGORY_ENDPOINT}/${categoryId}`;

    const postedResponse = await axios.put(endpoint, categoryBody, headers);
    const updatedCategory = postedResponse.data;

    return response.status(200).json(updatedCategory);
  } catch (error) {
    logger.info(error);
    logger.info(`Error updating: ${categoryId}`);
    logger.info(`Error updating: ${JSON.stringify(categoryBody)}`);
    return response.status(400).send('Failed to update the category');
  }
}

export async function post(request, response) {
  const categoryBody = request.body;
  if (request.params.id) {
    return response.status(400).send('This resource does not accept an id');
  }

  if (!categoryBody) {
    logger.error(`The request {body} cannot be null, ${request.originalUrl}`);
    return response.status(400).send('The category {body} cannot be empty');
  }

  try {
    const token = request.headers.authorization;
    const headers = getHeaders(token);

    const postedResponse = await axios.post(
      CATEGORY_ENDPOINT,
      categoryBody,
      headers,
    );
    const newCategory = postedResponse.data;

    return response.status(200).json(newCategory);
  } catch (error) {
    logger.info(error);
    logger.info(
      `Error posting a new category: ${JSON.stringify(categoryBody)}`,
    );
    return response.status(400).send('Failed to create a new category');
  }
}

export default {
  get,
  put,
  post,
  deleteCategory,
};
