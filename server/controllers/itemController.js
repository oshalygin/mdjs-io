/* eslint-disable no-use-before-define */
import express from 'express'; //eslint-disable-line no-unused-vars
import axios from 'axios';
import { ITEM_ENDPOINT } from '../routes/httpEndpoints';

const itemController = {
  get
};

function getItemById(itemId) {
  return axios.get(`${ITEM_ENDPOINT}/${itemId}`,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}

function get(request, response) {

  const itemId = request.params.id;
  if (itemId) {
    getItemById(itemId)
      .then((result) => {
        response.send(200).json(result);
      })
      .catch((error) => { //eslint-disable-line no-unused-vars
        response.sendStatus(400);
      });
  }

}

export default itemController;
