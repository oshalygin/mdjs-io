import express from "express";
import itemApi from "./controllers/itemController";

let router = express.Router();
let itemController = itemApi();

// {api/items}
router
    .route("/items")
    .get(itemController.get);

export default router;