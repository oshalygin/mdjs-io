import axios from 'axios';

import { getHeaders } from '../utilities/requestUtilities';
import logger from '../utilities/middleware/logger';
import { DISCOUNT_ENDPOINT } from '../utilities/endpoints';


export async function get(request, response) {

  if (request.params.id && isNaN(request.params.id)) {
    return response
      .status(400)
      .send('The discount {id} must be a number representing the discountID');
  }
  try {
    const token = request.headers.authorization;
    const headers = getHeaders(token);

    const discountEndpoint = request.params.id
      ? `${DISCOUNT_ENDPOINT}/${request.params.id}`
      : DISCOUNT_ENDPOINT;

    const discountResponse = await axios.get(discountEndpoint, headers);

    if (!discountResponse.data.data) {

      logger.info(`Invalid request: token: ${token}, endpoint: ${discountEndpoint}`);
      return response
        .status(400)
        .send('Bad request');
    }

    const discountData = discountResponse.data.data;

    return response
      .status(200)
      .json(discountData);

  } catch (error) {

    logger.info(error);
    return response
      .status(404)
      .send('Resource not found');
  }
}

export async function deleteDiscount(request, response) {

  const discountId = request.params.id;

  if (!discountId) {
    return response
      .status(400)
      .send('This resource expects a discount id');
  }

  try {
    const token = request.headers.authorization;
    const headers = getHeaders(token);
    const discountEndpoint = `${DISCOUNT_ENDPOINT}/${request.params.id}`;

    await axios.delete(discountEndpoint, headers);

    return response
      .status(200)
      .send('OK');

  } catch (error) {

    logger.info(error);
    logger.info(`Error deleting: ${discountId}`);
    return response
      .status(400)
      .send('Failed delete the discount item');
  }
}

export async function put(request, response) {

  const discountId = request.params.id;
  const discountBody = request.body;

  if (request.params.id && isNaN(request.params.id)) {
    return response
      .status(400)
      .send('The discount {id} must be a number representing the discountID');
  }

  if (!discountBody) {
    logger.error(`The request {body} cannot be null, ${request.originalUrl}`);
    return response
      .status(400)
      .send('The discount {body} cannot be empty');
  }

  try {

    const token = request.headers.authorization;
    const headers = getHeaders(token);
    const endpoint = `${DISCOUNT_ENDPOINT}/${discountId}`;

    const postedResponse = await axios.put(endpoint, discountBody, headers);
    const updatedDiscount = postedResponse.data;

    return response
      .status(200)
      .json(updatedDiscount);

  } catch (error) {

    logger.info(error);
    logger.info(`Error updating: ${discountId}`);
    logger.info(`Error updating: ${JSON.stringify(discountBody)}`);
    return response
      .status(400)
      .send('Failed to update the discount item');
  }

}

export async function post(request, response) {

  const discountBody = request.body;
  if (request.params.id) {
    return response
      .status(400)
      .send('This resource does not accept an id');
  }

  if (!discountBody) {
    logger.error(`The request {body} cannot be null, ${request.originalUrl}`);
    return response
      .status(400)
      .send('The discount {body} cannot be empty');
  }

  try {
    const token = request.headers.authorization;
    const headers = getHeaders(token);

    const postedResponse = await axios.post(DISCOUNT_ENDPOINT, discountBody, headers);
    const newDiscount = postedResponse.data;

    return response
      .status(200)
      .json(newDiscount);

  } catch (error) {

    logger.info(error);
    logger.info(`Error posting a new discount: ${JSON.stringify(discountBody)}`);
    return response
      .status(400)
      .send('Failed to create a new discount');
  }
}

export default {
  get,
  put,
  post,
  deleteDiscount
};
