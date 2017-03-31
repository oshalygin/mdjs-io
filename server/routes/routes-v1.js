import express from 'express';
import itemController from '../controllers/itemController';
import categoriesController from '../controllers/categoriesController';
import accountController from '../controllers/accountController';
import versionController from '../controllers/versionController';
import imagesController from '../controllers/imageController';
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

// {api/v1/categories}
router
  .route('/categories/:id?')
  .get(categoriesController.get)
  .put(categoriesController.put)
  .post(categoriesController.post)
  .delete(categoriesController.deleteCategory);

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
