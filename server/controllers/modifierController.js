import axios from 'axios';

import { getHeaders } from '../utilities/requestUtilities';
import logger from '../middleware/logger';
import { MODIFIER_ENDPOINT } from '../utilities/endpoints';

export async function get(request, response) {

  if (request.params.id && isNaN(request.params.id)) {
    return response
      .status(400)
      .send('The modifier {id} must be a number representing the modifierID');
  }
  try {
    const token = request.headers.authorization;
    const headers = getHeaders(token);

    const modifierEndpoint = request.params.id
      ? `${MODIFIER_ENDPOINT}/${request.params.id}`
      : MODIFIER_ENDPOINT;

    const modifierResponse = await axios.get(modifierEndpoint, headers);

    if (!modifierResponse.data.data) {

      logger.info(`Invalid request: token: ${token}, endpoint: ${modifierEndpoint}`);
      return response
        .status(400)
        .send('Bad request');
    }

    const modifierData = modifierResponse.data.data;

    return response
      .status(200)
      .json(modifierData);

  } catch (error) {

    logger.info(error);
    return response
      .status(404)
      .send('Resource not found');
  }
}

export async function deleteModifier(request, response) {

  const modifierId = request.params.id;

  if (!modifierId) {
    return response
      .status(400)
      .send('This resource expects a modifier id');
  }

  try {
    const token = request.headers.authorization;
    const headers = getHeaders(token);
    const modifierEndpoint = `${MODIFIER_ENDPOINT}/${request.params.id}`;

    await axios.delete(modifierEndpoint, headers);

    return response
      .status(200)
      .send('OK');

  } catch (error) {

    logger.info(error);
    logger.info(`Error deleting: ${modifierId}`);
    return response
      .status(400)
      .send('Failed delete the modifier item');
  }
}

export async function put(request, response) {

  const modifierId = request.params.id;
  const modifierBody = request.body;

  if (request.params.id && isNaN(request.params.id)) {
    return response
      .status(400)
      .send('The modifier {id} must be a number representing the modifierID');
  }

  if (!modifierBody) {
    logger.error(`The request {body} cannot be null, ${request.originalUrl}`);
    return response
      .status(400)
      .send('The modifier {body} cannot be empty');
  }

  try {

    const token = request.headers.authorization;
    const headers = getHeaders(token);
    const endpoint = `${MODIFIER_ENDPOINT}/${modifierId}`;

    const postedResponse = await axios.put(endpoint, modifierBody, headers);
    const updatedModifier = postedResponse.data;

    return response
      .status(200)
      .json(updatedModifier);

  } catch (error) {

    logger.info(error);
    logger.info(`Error updating: ${modifierId}`);
    logger.info(`Error updating: ${JSON.stringify(modifierBody)}`);
    return response
      .status(400)
      .send('Failed to update the modifier item');
  }

}

export async function post(request, response) {

  const modifierBody = request.body;
  if (request.params.id) {
    return response
      .status(400)
      .send('This resource does not accept an id');
  }

  if (!modifierBody) {
    logger.error(`The request {body} cannot be null, ${request.originalUrl}`);
    return response
      .status(400)
      .send('The modifier {body} cannot be empty');
  }

  try {
    const token = request.headers.authorization;
    const headers = getHeaders(token);

    const postedResponse = await axios.post(MODIFIER_ENDPOINT, modifierBody, headers);
    const newModifier = postedResponse.data;

    return response
      .status(200)
      .json(newModifier);

  } catch (error) {

    logger.info(error);
    logger.info(`Error posting a new modifier: ${JSON.stringify(modifierBody)}`);
    return response
      .status(400)
      .send('Failed to create a new modifier');
  }
}

export default {
  get,
  put,
  post,
  deleteModifier
};
