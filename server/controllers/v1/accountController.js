/* eslint-disable indent */
import axios from 'axios';
import userDataAccess from '../../dataAccess/userDataAccess';

import {
  getJsonHeaders,
  errorApiResponse,
  warningApiResponse,
} from '../../utilities/requestUtilities';
import {
  LOGIN_ENDPOINT,
  LOGIN_TOKEN_ENDPOINT,
} from '../../utilities/endpoints';

export async function post(request, response) {
  const { username, password } = request.body;
  if (!username || !password) {
    return warningApiResponse(400, `Bad request, ${username}: ${password}`)(
      request,
      response,
    );
  }

  try {
    const options = getJsonHeaders();
    const requestBody = {
      email: username,
      password,
    };

    const accountDetails = await axios.post(
      LOGIN_ENDPOINT,
      requestBody,
      options,
    );

    if (!accountDetails.data.data) {
      return warningApiResponse(400, 'Invalid username or password')(
        request,
        response,
      );
    }
    await userDataAccess.findOneAndUpdate({ email: username, password });

    const token = accountDetails.data.data.token;
    return response.status(200).json({ token });
  } catch (error) {
    return errorApiResponse(400, 'Invalid username or password', error)(
      request,
      response,
    );
  }
}

export async function get(request, response) {
  const { token } = request.query;

  if (!token) {
    return errorApiResponse(400, `Invalid token: ${token}`)(request, response);
  }

  try {
    const options = getJsonHeaders();
    const requestBody = {
      token,
    };

    const accountDetails = await axios.post(
      LOGIN_TOKEN_ENDPOINT,
      requestBody,
      options,
    );

    if (!accountDetails.data.data) {
      return errorApiResponse(400, `Invalid token: ${token}`)(
        request,
        response,
      );
    }

    const accountData = accountDetails.data.data;

    return response.status(200).json(accountData);
  } catch (error) {
    return errorApiResponse(400, 'Invalid username or password')(
      request,
      response,
    );
  }
}

export default {
  get,
  post,
};
