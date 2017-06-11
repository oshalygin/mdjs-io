import express from 'express';

import categoryController from '../controllers/v0/categoryController';
// import multer from 'multer';

// import path from 'path';

// const storage = multer.diskStorage({
//   destination(request, file, callback) {
//     callback(null, path.join(__dirname, '../../temp-images'));
//   },
//   filename(request, file, callback) {
//     callback(null, file.originalname);
//   }
// });

// const uploads = multer({ storage });

// v1
const router = express.Router();

// {api/v1/items}
// router
//   .route('/items/:id?')
//   .get(itemController.get)
//   .put(uploads.single('file'), itemController.put)
//   .post(uploads.single('file'), itemController.post)
//   .delete(itemController.deleteItem);

// {api/v1/orders}
// router
//   .route('/orders/:id?')
//   .get(ordersController.get);

// {api/v0/category/create}
router
  .route('/category/create')
  .post(categoryController.create);

// // {api/v1/taxes}
// router
//   .route('/taxes/:id?')
//   .get(taxController.get)
//   .put(taxController.put)
//   .post(taxController.post)
//   .delete(taxController.deleteTax);


export default router;
