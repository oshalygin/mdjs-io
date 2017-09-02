/* eslint-disable indent */
import axios from 'axios';
// import userDataAccess from '../../dataAccess/userDataAccess';

import {
  getJsonHeaders,
  errorApiResponse,
  warningApiResponse,
} from '../../utilities/requestUtilities';
import { REGISTRATION_ENDPOINT } from '../../utilities/endpoints';

export async function post(request, response) {
  const {
    email,
    password,
    confirmPassword,
    referrer,
    firstName,
    lastName,
    phoneNumber,
  } = request.body;

  if (!email) {
    return warningApiResponse(
      400,
      `Bad request, the "email" property is required, passed in: ${email}`,
    )(request, response);
  }

  if (!password) {
    return warningApiResponse(
      400,
      `Bad request, the "password" property is required, passed in: ${password}`,
    )(request, response);
  }

  if (!confirmPassword) {
    return warningApiResponse(
      400,
      `Bad request, the "confirmPassword" property is required, passed in: ${confirmPassword}`,
    )(request, response);
  }

  if (!referrer) {
    return warningApiResponse(
      400,
      `Bad request, the "referrer" property is required, passed in: ${referrer}`,
    )(request, response);
  }

  if (!firstName) {
    return warningApiResponse(
      400,
      `Bad request, the "firstName" property is required, passed in: ${firstName}`,
    )(request, response);
  }

  if (!lastName) {
    return warningApiResponse(
      400,
      `Bad request, the "lastName" property is required, passed in: ${lastName}`,
    )(request, response);
  }

  if (password !== confirmPassword) {
    return warningApiResponse(
      400,
      `Bad request, passwords dont match, ${password}:${confirmPassword}`,
    )(request, response);
  }

  try {
    const options = getJsonHeaders();
    const requestBody = {
      email,
      password,
      confirmPassword,
      referrer,
      firstName,
      lastName,
      phoneNumber,
    };

    const accountDetails = await axios.post(
      REGISTRATION_ENDPOINT,
      requestBody,
      options,
    );

    if (!accountDetails.data.data) {
      const { message } = accountDetails.data;
      return warningApiResponse(400, message)(request, response);
    }

    // await userDataAccess.findOneAndUpdate(username, password);

    const token = accountDetails.data.data.token;
    return response.status(200).json({ token });
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      const { message } = error.response.data;
      return warningApiResponse(400, message)(request, response);
    }

    return errorApiResponse(400, 'Bad Request', error)(request, response);
  }
}

export default {
  post,
};
