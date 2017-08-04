import api from '../../utilities/api';

import logger from '../../middleware/logger';
import { V0_POSTMARKEMAIL_POST_ENDPOINT } from '../../utilities/endpoints';

export async function post(request, response) {
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
      V0_POSTMARKEMAIL_POST_ENDPOINT,
      postBody,
    );

    const newResource = postedResponse.data;

    return response.status(200).json(newResource);
  } catch (error) {
    logger.info(error);
    logger.info(
      `Error posting a new postmark email: ${JSON.stringify(postBody)}`,
    );
    return response.status(400).send('Failed to create a new postmark email');
  }
}

export default {
  post,
};
