/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import colors from 'colors';
import axios from 'axios';

export function getAllItems(query, callback) {
  const queryCriteria = {};
  if (!!query && query.ingredient) {
    queryCriteria.ingredient = query.ingredient;
  }

  const itemPromise = axios.get('')
    .then(items => {
      callback(null, items.data);
    })
    .catch(error => {
      console.log(error.red);
      callback(error);
    });
}

