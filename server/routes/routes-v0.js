import express from 'express';

import categoryController from '../controllers/v0/categoryController';
import customerController from '../controllers/v0/customerController';
import discountController from '../controllers/v0/discountController';

// v0
const router = express.Router();

router.route('/category/create').post(categoryController.create);
router.route('/category/update').post(categoryController.update);
router.route('/category/delete').post(categoryController.delete);

router.route('/customer/create').post(customerController.create);
router.route('/customer/update').post(customerController.update);
router.route('/customer/find').post(customerController.find);
router.route('/customer/orders').post(customerController.orders);

router.route('/discount/create').post(discountController.create);
router.route('/discount/update').post(discountController.update);
router.route('/discount/delete').post(discountController.delete);

export default router;
