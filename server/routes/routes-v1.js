import express from 'express';

import itemController from '../controllers/itemController';
import categoriesController from '../controllers/categoriesController';
import taxController from '../controllers/taxController';
import accountController from '../controllers/accountController';
import versionController from '../controllers/versionController';
import imagesController from '../controllers/imageController';
import modifierController from '../controllers/modifierController';
import discountController from '../controllers/discountController';
import ordersController from '../controllers/ordersController';

import multer from 'multer';

import path from 'path';

const storage = multer.diskStorage({
  destination(request, file, callback) {
    callback(null, path.join(__dirname, '../../temp-images'));
  },
  filename(request, file, callback) {
    callback(null, file.originalname);
  }
});

const uploads = multer({ storage });

// v1
const router = express.Router();

// {api/v1/items}
router
  .route('/items/:id?')
  .get(itemController.get)
  .put(uploads.single('file'), itemController.put)
  .post(uploads.single('file'), itemController.post)
  .delete(itemController.deleteItem);

// {api/v1/orders}
router
  .route('/orders/:id?')
  .get(ordersController.get);

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

// {api/v1/account}
router
  .route('/account')
  .get(accountController.get)
  .post(accountController.post);

// {api/v1/version}
router
  .route('/version')
  .get(versionController.get);

// {api/v1/images}
router
  .route('/images/:id')
  .get(imagesController.get);

export default router;
