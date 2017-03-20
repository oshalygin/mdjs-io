import express from 'express';
import itemController from '../controllers/itemController';
import accountController from '../controllers/accountController';

// v1
const router = express.Router();

// {api/v1/item}
router
  .route('/item/:id')
  .get(itemController.get);

// {api/v1/account}
router
  .route('/account')
  .post(accountController.post);

export default router;
