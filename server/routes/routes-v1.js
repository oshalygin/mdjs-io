import express from 'express';
import itemController from '../controllers/itemController';
import accountController from '../controllers/accountController';
import versionController from '../controllers/versionController';
import imagesController from '../controllers/imageController';

// v1
const router = express.Router();

// {api/v1/item}
router
  .route('/items/:id')
  .get(itemController.get);

// {api/v1/account}
router
  .route('/account')
  .get(accountController.get)
  .post(accountController.post);

// {api/v1/version}
router
  .route('/version')
  .get(versionController.get);

// {api/v1/version}
router
  .route('/images/:id')
  .get(imagesController.get);

export default router;
