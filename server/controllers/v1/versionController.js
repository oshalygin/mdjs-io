import { errorApiResponse } from '../../utilities/requestUtilities';
import { version } from '../../../package.json';

export async function get(request, response) {
  if (version) {
    return response.status(200).json(version);
  }

  return errorApiResponse(404, 'Resource not found')(request, response);
}

export default {
  get,
};
