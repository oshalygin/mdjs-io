import fetch from 'node-fetch';

import logger from '../../middleware/logger';
import imageService from '../../services/imageService';

//eslint-disable-next-line consistent-return
export async function get(request, response) {
  const imageName = request.params.id;

  if (!imageName) {
    return response.status(400).send('This resource expects an image id');
  }

  try {
    const imageEndpoint = imageService.imageUrl(imageName);
    const imageResponse = await fetch(imageEndpoint);

    response.writeHead(200, { 'Content-Type': 'image/png' });
    imageResponse.body.pipe(response);
  } catch (error) {
    logger.info(error);
    return response.status(400).send('Failed to retrieve the image');
  }
}

export async function post(request, response) {
  if (!request.file) {
    return response
      .status(400)
      .send(
        'No image passed, please provide an image as part of multipart form data',
      );
  }

  try {
    const { file } = request;
    //TODO: Add validation to make sure the user is valid
    const imageNames = await imageService.upload(
      file.buffer,
      file.originalname,
    );

    const responseBody = {
      photoUrl: imageNames[0],
    };

    return response.status(200).json(responseBody);
  } catch (error) {
    logger.info(error);
    return response.status(400).send('Failed to retrieve the image');
  }
}

export default {
  get,
  post,
};
