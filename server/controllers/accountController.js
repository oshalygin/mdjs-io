import axios from 'axios';

import { getJsonHeaders } from '../utilities/requestUtilities';
import logger from '../../utilities/logger.js';
import { LOGIN_ENDPOINT, LOGIN_TOKEN_ENDPOINT } from '../utilities/endpoints';

export async function post(request, response) {

  const { username, password } = request.body;
  if (!username || !password) {
    return response
      .status(400)
      .send('Bad request');
  }

  try {
    const options = getJsonHeaders();
    const requestBody = {
      email: username,
      password
    };

    const accountDetails = await axios.post(LOGIN_ENDPOINT, requestBody, options);
    
    if (!accountDetails.data.data) {

      logger.info(`Invalid request: username: ${username}, password: ${password}`);
      return response
        .status(400)
        .send('Invalid username or password');
    }
    const token = accountDetails.data.data.token;
    return response
      .status(200)
      .json({ token });

  } catch (error) {

    logger.info(error);
    return response
      .status(400)
      .send('Invalid username or password');
  }
}

export async function get(request, response) {
  const { token } = request.query;
  
  if (!token) {
    return response
      .status(400)
      .send('Bad request');
  }

  try {

    const options = getJsonHeaders();
    const requestBody = {
      token
    };

    const accountDetails = await axios.post(LOGIN_TOKEN_ENDPOINT, requestBody, options);
    
    if (!accountDetails.data.data) {
      logger.info(`Invalid token: token: ${token}`);
      return response
        .status(400)
        .send('Invalid token');
    }
    
    const accountData = accountDetails.data.data;

    return response
      .status(200)
      .json(accountData);

  } catch (error) {

    logger.info(error);
    return response
      .status(400)
      .send('Invalid username or password');
  }
}

export default {
  get,
  post
};
