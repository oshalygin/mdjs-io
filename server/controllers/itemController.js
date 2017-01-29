/* eslint-disable no-use-before-define */
import express from 'express'; //eslint-disable-line no-unused-vars
import axios from 'axios';

import logger from '../../utilities/logger.js';
import { ITEM_ENDPOINT } from '../routes/httpEndpoints';

const itemController = {
  get
};

function getItemById(itemId) {

  const endpoint = itemId
    ? ITEM_ENDPOINT
    : `${ITEM_ENDPOINT}/${itemId}`;

  return axios.get(endpoint,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}

function get(request, response) {

  const itemId = request.params.id;
  getItemById(itemId)
    .then((result) => {
      response.send(200).json(result);
    })
    .catch((error) => { //eslint-disable-line no-unused-vars
      logger.error(error);
      response.sendStatus(400);
    });
}


export default itemController;
