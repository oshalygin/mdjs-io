import axios from 'axios';

import { getHeaders } from '../../utilities/requestUtilities';
import logger from '../../middleware/logger';
import { V0_CATEGORY_ENDPOINT } from '../../utilities/endpoints';

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
    const headers = getHeaders(token);

    const postedResponse = await axios.post(
      V0_CATEGORY_ENDPOINT,
      postBody,
      headers,
    );
    const newResource = postedResponse.data;

    return response.status(200).json(newResource);
  } catch (error) {
    logger.info(error);
    logger.info(`Error posting a new category: ${JSON.stringify(postBody)}`);
    return response.status(400).send('Failed to create a new category');
  }
}

export default {
  create,
};
