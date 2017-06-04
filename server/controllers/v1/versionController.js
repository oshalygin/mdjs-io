import logger from '../../middleware/logger';
import { version } from '../../../../package.json';

export async function get(request, response) {

  if (version) {
    return response
      .status(200)
      .json(version);
  }

  logger.error('Could not parse the current application version');
  return response
    .status(404)
    .send('Could not retrieve the package version');

}

export default {
  get
};
