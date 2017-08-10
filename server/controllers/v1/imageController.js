import fetch from 'node-fetch';

import {
  warningApiResponse,
  errorApiResponse,
} from '../../utilities/requestUtilities';
import imageService from '../../services/imageService';

//eslint-disable-next-line consistent-return
export async function get(request, response) {
  const imageName = request.params.id;

  if (!imageName) {
    return warningApiResponse(400, 'The resource requires an id')(
      request,
      response,
    );
  }

  try {
    const imageEndpoint = imageService.imageUrl(imageName);
    const imageResponse = await fetch(imageEndpoint);

    response.writeHead(200, { 'Content-Type': 'image/png' });
    imageResponse.body.pipe(response);
  } catch (error) {
    return errorApiResponse(400, 'Bad Request', error)(request, response);
  }
}

export async function post(request, response) {
  if (!request.file) {
    return errorApiResponse(
      400,
      'The multipart form data "file" section is empty',
    )(request, response);
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
    return errorApiResponse(400, 'Bad Request', error)(request, response);
  }
}

export default {
  get,
  post,
};
