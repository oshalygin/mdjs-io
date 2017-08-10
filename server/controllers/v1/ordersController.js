import axios from 'axios';

import {
  getHeaders,
  warningApiResponse,
  errorApiResponse,
} from '../../utilities/requestUtilities';
import { ORDERS_ENDPOINT } from '../../utilities/endpoints';

export async function get(request, response) {
  const { startDate, endDate } = request.query;
  const orderId = request.params.id;

  if (orderId && isNaN(orderId)) {
    return warningApiResponse(400, 'The resource requires an id')(
      request,
      response,
    );
  }

  if (orderId) {
    try {
      const token = request.headers.authorization;
      const headers = getHeaders(token);

      const ordersEndpoint = `${ORDERS_ENDPOINT}/${orderId}`;
      const orderResponse = await axios.get(ordersEndpoint, headers);

      const orderData = orderResponse.data;

      return response.status(200).json(orderData);
    } catch (error) {
      return errorApiResponse(404, 'Resource not found', error)(
        request,
        response,
      );
    }
  }

  try {
    const token = request.headers.authorization;
    const headers = getHeaders(token);

    const endpoint =
      startDate && endDate
        ? `${ORDERS_ENDPOINT}?startDate=${startDate}&endDate=${endDate}`
        : ORDERS_ENDPOINT;

    const orderResponse = await axios.get(endpoint, headers);

    const orderData = orderResponse.data;

    return response.status(200).json(orderData);
  } catch (error) {
    return errorApiResponse(404, 'Resource not found', error)(
      request,
      response,
    );
  }
}

export default {
  get,
};
