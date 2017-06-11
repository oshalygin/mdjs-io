import axios from 'axios';

import { getHeaders } from '../../utilities/requestUtilities';
import logger from '../../middleware/logger';
import { V0_CATEGORY_ENDPOINT } from '../../utilities/endpoints';

export async function create(request, response) {

  const categoryBody = request.body;

  try {
    const token = request.headers.authorization;
    const headers = getHeaders(token);

    const postedResponse = await axios.post(V0_CATEGORY_ENDPOINT, categoryBody, headers);
    const newCategory = postedResponse.data;

    return response
      .status(200)
      .json(newCategory);

  } catch (error) {

    logger.info(error);
    logger.info(`Error posting a new category: ${JSON.stringify(categoryBody)}`);
    return response
      .status(400)
      .send('Failed to create a new category');
  }
}

export default {
  create
};
