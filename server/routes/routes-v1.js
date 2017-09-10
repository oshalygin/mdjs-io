import express from 'express';

import itemController from '../controllers/v1/itemController';
import categoriesController from '../controllers/v1/categoriesController';
import taxController from '../controllers/v1/taxController';
import accountController from '../controllers/v1/accountController';
import registrationController from '../controllers/v1/registrationController';
import configurationController from '../controllers/v1/configurationController';
import versionController from '../controllers/v1/versionController';
import imagesController from '../controllers/v1/imageController';
import modifierController from '../controllers/v1/modifierController';
import discountController from '../controllers/v1/discountController';
import ordersController from '../controllers/v1/ordersController';

import { fileErrorHandler, multer } from '../utilities/fileUtility';
import authMiddleware from '../middleware/authMiddleware';

// v1
const router = express.Router();

// {api/v1/account}
router
  .route('/account')
  .get(accountController.get)
  .post(accountController.post);

// {api/v1/registration}
router.route('/registration').post(registrationController.post);

// {api/v1/version}
router.route('/version').get(versionController.get);

// {api/v1/configuration}
router.route('/configuration').get(configurationController.get);

router.use(authMiddleware());

// {api/v1/orders}
router.route('/orders/:id?').get(ordersController.get);

// {api/v1/categories}
router
  .route('/categories/:id?')
  .get(categoriesController.get)
  .put(categoriesController.put)
  .post(categoriesController.post)
  .delete(categoriesController.deleteCategory);

// {api/v1/taxes}
router
  .route('/taxes/:id?')
  .get(taxController.get)
  .put(taxController.put)
  .post(taxController.post)
  .delete(taxController.deleteTax);

// {api/v1/discounts}
router
  .route('/discounts/:id?')
  .get(discountController.get)
  .put(discountController.put)
  .post(discountController.post)
  .delete(discountController.deleteDiscount);

// {api/v1/modifiers}
router
  .route('/modifiers/:id?')
  .get(modifierController.get)
  .put(modifierController.put)
  .post(modifierController.post)
  .delete(modifierController.deleteModifier);

// {api/v1/items}
router
  .route('/items/:id?')
  .get(itemController.get)
  .put(multer.single('file'), fileErrorHandler, itemController.put)
  .post(multer.single('file'), fileErrorHandler, itemController.post)
  .delete(itemController.deleteItem);

// {api/v1/images}
router
  .route('/images/:id?')
  .get(imagesController.get)
  .post(multer.single('file'), fileErrorHandler, imagesController.post);

export default router;
