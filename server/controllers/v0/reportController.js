import api from '../../utilities/api';

import logger from '../../middleware/logger';
import {
  V0_REPORT_EMAIL_SALES_REPORT_V1_ENDPOINT,
  V0_REPORT_SALES_REPORT_V1_ENDPOINT,
} from '../../utilities/endpoints';

export async function emailSalesReport(request, response) {
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
      V0_REPORT_EMAIL_SALES_REPORT_V1_ENDPOINT,
      postBody,
    );

    const newResource = postedResponse.data;

    return response.status(200).json(newResource);
  } catch (error) {
    logger.info(error);
    logger.info(`Error emailing the sales report: ${JSON.stringify(postBody)}`);
    return response.status(400).send('Failed to email the sales report');
  }
}

export async function salesReport(request, response) {
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
      V0_REPORT_SALES_REPORT_V1_ENDPOINT,
      postBody,
    );

    const updatedResource = postedResponse.data;

    return response.status(200).json(updatedResource);
  } catch (error) {
    logger.info(error);
    logger.info(
      `Error retrieving the sales report: ${JSON.stringify(postBody)}`,
    );
    return response.status(400).send('Failed to retrieve the sales report');
  }
}

export default {
  emailSalesReport,
  salesReport,
};
