/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import colors from "colors";
import axios from "axios";

export function getAllItems(query, callback) {
    let queryCriteria = {};
    if (!!query && query.ingredient) {
        queryCriteria.ingredient = query.ingredient;
    }

    let itemPromise = axios.get("")
        .then(items => {
            callback(null, items.data);
        })
        .catch(error => {
            console.log(error.red);
            callback(error);
        });
}

