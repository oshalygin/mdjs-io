import express from 'express';

import categoryController from '../controllers/v0/categoryController';

// v0
const router = express.Router();

router.route('/category/create').post(categoryController.create);
router.route('/category/update').post(categoryController.update);
router.route('/category/delete').post(categoryController.delete);

export default router;
