import express from 'express';

import categoryController from '../controllers/v0/categoryController';
import customerController from '../controllers/v0/customerController';
import discountController from '../controllers/v0/discountController';
import inventoryController from '../controllers/v0/inventoryController';
import messageController from '../controllers/v0/messageController';
import modifierController from '../controllers/v0/modifierController';
import ordersController from '../controllers/v0/ordersController';
import postmarkController from '../controllers/v0/postmarkController';
import receiptController from '../controllers/v0/receiptController';
import refundReasonController from '../controllers/v0/refundReasonController';
import registrationController from '../controllers/v0/registrationController';
import reportController from '../controllers/v0/reportController';
import securityController from '../controllers/v0/securityController';
import taxController from '../controllers/v0/taxController';

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

router.route('/postmarkemail/post').post(postmarkController.post);

router.route('/receipt/send').post(receiptController.send);
router.route('/receipt/update').post(receiptController.update);

router.route('/refundreason/create').post(refundReasonController.create);
router.route('/refundreason/update').post(refundReasonController.update);
router.route('/refundreason/delete').post(refundReasonController.delete);

router.route('/registration/register').post(registrationController.register);
router.route('/registration/bank').post(registrationController.bank);
router.route('/registration/business').post(registrationController.business);
router.route('/registration/principal').post(registrationController.principal);
router.route('/registration/status').post(registrationController.status);

router
  .route('/report/emailsalesreportv1')
  .post(reportController.emailSalesReport);

router.route('/report/salesreportv1').post(reportController.salesReport);

router
  .route('/security/forgotpassword')
  .post(securityController.forgotPassword);
router.route('/security/login').post(securityController.login);

router.route('/tax/create').post(taxController.create);
router.route('/tax/update').post(taxController.update);
router.route('/tax/delete').post(taxController.delete);

export default router;
