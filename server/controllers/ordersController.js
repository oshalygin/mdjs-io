import axios from 'axios';

import { getHeaders } from '../utilities/requestUtilities';
import logger from '../utilities/middleware/logger';
import { ORDERS_ENDPOINT } from '../utilities/endpoints';

export async function get(request, response) {

  if (request.params.id && isNaN(request.params.id)) {
    return response
      .status(400)
      .send('The order {id} must be a number representing the orderId');
  }
  try {
    const token = request.headers.authorization;
    const headers = getHeaders(token);

    const ordersEndpoint = request.params.id
      ? `${ORDERS_ENDPOINT}/${request.params.id}`
      : ORDERS_ENDPOINT;

    const orderResponse = await axios.get(ordersEndpoint, headers);

    const orderData = orderResponse.data;

    return response
      .status(200)
      .json(orderData);

  } catch (error) {
    logger.info(error);
    return response
      .status(404)
      .send('Resource not found');
  }
}

export default {
  get
};
