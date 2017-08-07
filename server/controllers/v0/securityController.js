import api from '../../utilities/api';

import logger from '../../middleware/logger';
import {
  V0_SECURITY_FORGOT_PASSWORD_ENDPOINT,
  V0_SECURITY_LOGIN_ENDPOINT,
} from '../../utilities/endpoints';

export async function forgotPassword(request, response) {
  const postBody = request.body;
  if (request.params.id) {
    return response.status(400).send('This resource does not accept an id');
  }

  if (!postBody) {
    logger.error(`The request [body] cannot be null, ${request.originalUrl}`);
    return response.status(400).send('The request [body] cannot be empty');
  }

  try {
    const token = 'Authorization';

    const postedResponse = await api.post(token)(
      V0_SECURITY_FORGOT_PASSWORD_ENDPOINT,
      postBody,
    );

    const newResource = postedResponse.data;

    return response.status(200).json(newResource);
  } catch (error) {
    logger.info(error);
    logger.info(`Error resetting the password: ${JSON.stringify(postBody)}`);
    return response.status(400).send('Failed to reset the password');
  }
}

export async function login(request, response) {
  const postBody = request.body;
  if (request.params.id) {
    return response.status(400).send('This resource does not accept an id');
  }

  if (!postBody) {
    logger.error(`The request [body] cannot be null, ${request.originalUrl}`);
    return response.status(400).send('The request [body] cannot be empty');
  }

  try {
    const token = 'Authorization';

    const postedResponse = await api.post(token)(
      V0_SECURITY_LOGIN_ENDPOINT,
      postBody,
    );

    const updatedResource = postedResponse.data;

    return response.status(200).json(updatedResource);
  } catch (error) {
    logger.info(error);
    logger.info(`Error logging in: ${JSON.stringify(postBody)}`);
    return response.status(400).send('Failed to login');
  }
}

export default {
  login,
  forgotPassword,
};
