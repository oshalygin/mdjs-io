import api from '../../utilities/api';

import {
  errorApiResponse,
  warningApiResponse,
} from '../../utilities/requestUtilities';
import { V0_POSTMARKEMAIL_POST_ENDPOINT } from '../../utilities/endpoints';

export async function post(request, response) {
  const postBody = request.body;
  if (request.params.id) {
    return warningApiResponse(400, 'The resource does not accept an id')(
      request,
      response,
    );
  }

  if (!postBody) {
    return warningApiResponse(400, 'The request [body] cannot be null')(
      request,
      response,
    );
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
    return errorApiResponse(400, 'Bad Request', error)(request, response);
  }
}

export default {
  post,
};
