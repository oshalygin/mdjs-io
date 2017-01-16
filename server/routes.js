import express from 'express';
import itemApi from './controllers/itemController';

const router = express.Router();
const itemController = itemApi();

// {api/items}
router
  .route('/items')
  .get(itemController.get);

export default router;
