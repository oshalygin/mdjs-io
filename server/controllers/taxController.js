import axios from 'axios';

import { getHeaders } from '../utilities/requestUtilities';
import logger from '../middleware/logger';
import { TAX_ENDPOINT } from '../utilities/endpoints';


export async function get(request, response) {

  if (request.params.id && isNaN(request.params.id)) {
    return response
      .status(400)
      .send('The tax {id} must be a number representing the taxID');
  }
  try {
    const token = request.headers.authorization;
    const headers = getHeaders(token);

    const taxEndpoint = request.params.id
      ? `${TAX_ENDPOINT}/${request.params.id}`
      : TAX_ENDPOINT;

    const taxResponse = await axios.get(taxEndpoint, headers);

    if (!taxResponse.data.data) {

      logger.info(`Invalid request: token: ${token}, endpoint: ${taxEndpoint}`);
      return response
        .status(400)
        .send('Bad request');
    }

    const taxData = taxResponse.data.data;

    return response
      .status(200)
      .json(taxData);

  } catch (error) {

    logger.info(error);
    return response
      .status(404)
      .send('Resource not found');
  }
}

export async function deleteTax(request, response) {

  const taxId = request.params.id;

  if (!taxId) {
    return response
      .status(400)
      .send('This resource expects a tax id');
  }

  try {
    const token = request.headers.authorization;
    const headers = getHeaders(token);
    const taxEndpoint = `${TAX_ENDPOINT}/${request.params.id}`;

    await axios.delete(taxEndpoint, headers);

    return response
      .status(200)
      .send('OK');

  } catch (error) {

    logger.info(error);
    logger.info(`Error deleting: ${taxId}`);
    return response
      .status(400)
      .send('Failed delete the tax item');
  }
}

export async function put(request, response) {

  const taxId = request.params.id;
  const taxBody = request.body;

  if (request.params.id && isNaN(request.params.id)) {
    return response
      .status(400)
      .send('The tax {id} must be a number representing the taxID');
  }

  if (!taxBody) {
    logger.error(`The request {body} cannot be null, ${request.originalUrl}`);
    return response
      .status(400)
      .send('The tax {body} cannot be empty');
  }

  try {

    const token = request.headers.authorization;
    const headers = getHeaders(token);
    const endpoint = `${TAX_ENDPOINT}/${taxId}`;

    const postedResponse = await axios.put(endpoint, taxBody, headers);
    const updatedTax = postedResponse.data;

    return response
      .status(200)
      .json(updatedTax);

  } catch (error) {

    logger.info(error);
    logger.info(`Error updating: ${taxId}`);
    logger.info(`Error updating: ${JSON.stringify(taxBody)}`);
    return response
      .status(400)
      .send('Failed to update the tax item');
  }

}

export async function post(request, response) {

  const taxBody = request.body;
  if (request.params.id) {
    return response
      .status(400)
      .send('This resource does not accept an id');
  }

  if (!taxBody) {
    logger.error(`The request {body} cannot be null, ${request.originalUrl}`);
    return response
      .status(400)
      .send('The tax {body} cannot be empty');
  }

  try {
    const token = request.headers.authorization;
    const headers = getHeaders(token);

    const postedResponse = await axios.post(TAX_ENDPOINT, taxBody, headers);
    const newTax = postedResponse.data;

    return response
      .status(200)
      .json(newTax);

  } catch (error) {

    logger.info(error);
    logger.info(`Error posting a new tax: ${JSON.stringify(taxBody)}`);
    return response
      .status(400)
      .send('Failed to create a new tax');
  }
}

export default {
  get,
  put,
  post,
  deleteTax
};
