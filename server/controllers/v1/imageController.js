import logger from '../../middleware/logger';
import fetch from 'node-fetch';

import imageService from '../../services/imageService';

export async function get(request, response) { //eslint-disable-line consistent-return

  const imageName = request.params.id;

  if (!imageName) {
    return response
      .status(400)
      .send('This resource expects an image id');
  }

  try {

    const imageEndpoint = imageService.imageUrl(imageName);
    const imageResponse = await fetch(imageEndpoint);

    response.writeHead(200, { 'Content-Type': 'image/png' });
    imageResponse.body.pipe(response);

  } catch (error) {
    logger.info(error);
    return response
      .status(400)
      .send('Failed to retrieve the image');
  }
}

export default {
  get
};
