import express from 'express';

import categoryController from '../controllers/v0/categoryController';

// v0
const router = express.Router();

// {api/v0/category/create}
router
  .route('/category/create')
  .post(categoryController.create);


export default router;
