import express from 'express';

import categoryController from '../controllers/v0/categoryController';
import customerController from '../controllers/v0/customerController';
import discountController from '../controllers/v0/discountController';
import inventoryController from '../controllers/v0/inventoryController';
import messageController from '../controllers/v0/messageController';
import modifierController from '../controllers/v0/modifierController';
import ordersController from '../controllers/v0/ordersController';

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

router.route('/inventory/setinventory').post(inventoryController.setInventory);
router
  .route('/inventory/inventoryforitems')
  .post(inventoryController.addToInventory);
router
  .route('/inventory/addtoinventory')
  .post(inventoryController.addToInventory);

router.route('/message/get').post(messageController.get);
router.route('/message/markread').post(messageController.markRead);
router.route('/message/delete').post(messageController.delete);

router.route('/modifier/create').post(modifierController.create);
router.route('/modifier/update').post(modifierController.update);
router.route('/modifier/delete').post(modifierController.delete);

router.route('/orders/headers').post(ordersController.headers);
router.route('/orders/headersv2').post(ordersController.headersV2);
router.route('/orders/giftcardcheck').post(ordersController.giftCardCheck);
router.route('/orders/select').post(ordersController.select);
router.route('/orders/refund').post(ordersController.refund);
router.route('/orders/create').post(ordersController.create);
router.route('/orders/complete').post(ordersController.complete);
router.route('/orders/cancel').post(ordersController.cancel);
router.route('/orders/update').post(ordersController.update);
router.route('/orders/pay').post(ordersController.pay);

export default router;
