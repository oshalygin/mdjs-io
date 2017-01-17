import express from 'express';
import itemController from '../controllers/itemController';

const router = express.Router();

// {api/item}
router
  .route('/item/:id')
  .get(itemController.get);

export default router;
