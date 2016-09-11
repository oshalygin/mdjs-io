/* eslint-disable no-use-before-define */
import express from "express"; //eslint-disable-line no-unused-vars
import * as dataAccessApi from "../dataAccess/itemDataAccess";

export default function itemController(dataAccess = dataAccessApi) {
    return {
        get
    };

    function get(request, response) {
        let query = request.query;
        dataAccess.getAllItems(query, function (error, items) {
            if (!!error) {
                response.status(500).json(error);
            }
            response.status(200).json(items);
        });
    }
}
