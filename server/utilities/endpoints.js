import configuration from './configuration';

export const DOMAIN_ENDPOINT = configuration.domainEndpoint;
export const LOGIN_ENDPOINT = `${DOMAIN_ENDPOINT}/api/dashboard/security`;
export const ITEM_ENDPOINT = `${DOMAIN_ENDPOINT}/api/dashboard/item`;
export const LOGIN_TOKEN_ENDPOINT = `${DOMAIN_ENDPOINT}/api/dashboard/security/token`;
export const ITEM_IMAGE_ENDPOINT = `${DOMAIN_ENDPOINT}/api/dashboard/image`;
export const CATEGORY_ENDPOINT = `${DOMAIN_ENDPOINT}/api/dashboard/itemcategories`;
export const TAX_ENDPOINT = `${DOMAIN_ENDPOINT}/api/dashboard/taxes`;
export const MODIFIER_ENDPOINT = `${DOMAIN_ENDPOINT}/api/dashboard/modifiers`;
export const DISCOUNT_ENDPOINT = `${DOMAIN_ENDPOINT}/api/dashboard/discounts`;
export const ORDERS_ENDPOINT = `${DOMAIN_ENDPOINT}/api/dashboard/orders`;

// --- V0 Routes --- //
export const V0_CATEGORY_CREATE_ENDPOINT = `${DOMAIN_ENDPOINT}/api/category/create`;
export const V0_CATEGORY_UPDATE_ENDPOINT = `${DOMAIN_ENDPOINT}/api/category/update`;
export const V0_CATEGORY_DELETE_ENDPOINT = `${DOMAIN_ENDPOINT}/api/category/delete`;

export const V0_CUSTOMER_CREATE_ENDPOINT = `${DOMAIN_ENDPOINT}/api/customer/create`;
export const V0_CUSTOMER_UPDATE_ENDPOINT = `${DOMAIN_ENDPOINT}/api/customer/update`;
export const V0_CUSTOMER_FIND_ENDPOINT = `${DOMAIN_ENDPOINT}/api/customer/find`;
export const V0_CUSTOMER_ORDERS_ENDPOINT = `${DOMAIN_ENDPOINT}/api/customer/orders`;

export const V0_DISCOUNT_CREATE_ENDPOINT = `${DOMAIN_ENDPOINT}/api/discount/create`;
export const V0_DISCOUNT_UPDATE_ENDPOINT = `${DOMAIN_ENDPOINT}/api/discount/update`;
export const V0_DISCOUNT_DELETE_ENDPOINT = `${DOMAIN_ENDPOINT}/api/discount/delete`;

export const V0_INVENTORY_FOR_ITEMS_ENDPOINT = `${DOMAIN_ENDPOINT}/api/inventory/inventoryforitems`;
export const V0_INVENTORY_SET_INVENTORY_ENDPOINT = `${DOMAIN_ENDPOINT}/api/inventory/setinventory`;
export const V0_INVENTORY_ADD_TO_INVENTORY_ENDPOINT = `${DOMAIN_ENDPOINT}/api/inventory/addtoinventory`;

export const V0_MESSAGE_GET_ENDPOINT = `${DOMAIN_ENDPOINT}/api/message/get`;
export const V0_MESSAGE_MARK_READ_ENDPOINT = `${DOMAIN_ENDPOINT}/api/message/markread`;
export const V0_MESSAGE_DELETE_ENDPOINT = `${DOMAIN_ENDPOINT}/api/message/delete`;

export const V0_MODIFIER_CREATE_ENDPOINT = `${DOMAIN_ENDPOINT}/api/modifier/create`;
export const V0_MODIFIER_UPDATE_ENDPOINT = `${DOMAIN_ENDPOINT}/api/modifier/update`;
export const V0_MODIFIER_DELETE_ENDPOINT = `${DOMAIN_ENDPOINT}/api/modifier/delete`;

export const V0_ORDERS_HEADERS_ENDPOINT = `${DOMAIN_ENDPOINT}/api/orders/headers`;
export const V0_ORDERS_HEADERS_V2_ENDPOINT = `${DOMAIN_ENDPOINT}/api/orders/headersv2`;
export const V0_ORDERS_GIFT_CARD_CHECK_ENDPOINT = `${DOMAIN_ENDPOINT}/api/orders/giftcardcheck`;
export const V0_ORDERS_SELECT_ENDPOINT = `${DOMAIN_ENDPOINT}/api/orders/select`;
export const V0_ORDERS_REFUND_ENDPOINT = `${DOMAIN_ENDPOINT}/api/orders/refund`;
export const V0_ORDERS_CREATE_ENDPOINT = `${DOMAIN_ENDPOINT}/api/orders/create`;
export const V0_ORDERS_COMPLETE_ENDPOINT = `${DOMAIN_ENDPOINT}/api/orders/complete`;
export const V0_ORDERS_CANCEL_ENDPOINT = `${DOMAIN_ENDPOINT}/api/orders/cancel`;
export const V0_ORDERS_UPDATE_ENDPOINT = `${DOMAIN_ENDPOINT}/api/orders/update`;
export const V0_ORDERS_PAY_ENDPOINT = `${DOMAIN_ENDPOINT}/api/orders/pay`;

export const V0_POSTMARKEMAIL_POST_ENDPOINT = `${DOMAIN_ENDPOINT}/api/postmarkemail/post`;

export const V0_RECEIPT_SEND_ENDPOINT = `${DOMAIN_ENDPOINT}/api/receipt/send`;
export const V0_RECEIPT_UPDATE_ENDPOINT = `${DOMAIN_ENDPOINT}/api/receipt/update`;

export const V0_REFUNDREASON_CREATE_ENDPOINT = `${DOMAIN_ENDPOINT}/api/refundreason/create`;
export const V0_REFUNDREASON_UPDATE_ENDPOINT = `${DOMAIN_ENDPOINT}/api/refundreason/update`;
export const V0_REFUNDREASON_DELETE_ENDPOINT = `${DOMAIN_ENDPOINT}/api/refundreason/delete`;

export const V0_REGISTRATION_REGISTER_ENDPOINT = `${DOMAIN_ENDPOINT}/api/registration/register`;
export const V0_REGISTRATION_BANK_ENDPOINT = `${DOMAIN_ENDPOINT}/api/registration/bank`;
export const V0_REGISTRATION_BUSINESS_ENDPOINT = `${DOMAIN_ENDPOINT}/api/registration/business`;
export const V0_REGISTRATION_PRINCIPAL_ENDPOINT = `${DOMAIN_ENDPOINT}/api/registration/principal`;
export const V0_REGISTRATION_STATUS_ENDPOINT = `${DOMAIN_ENDPOINT}/api/registration/status`;

export const V0_REPORT_EMAIL_SALES_REPORT_V1_ENDPOINT = `${DOMAIN_ENDPOINT}/api/report/emailsalesreportv1`;
export const V0_REPORT_SALES_REPORT_V1_ENDPOINT = `${DOMAIN_ENDPOINT}/api/report/salesreportv1`;

export const V0_SECURITY_FORGOT_PASSWORD_ENDPOINT = `${DOMAIN_ENDPOINT}/api/security/forgotpassword`;
export const V0_SECURITY_LOGIN_ENDPOINT = `${DOMAIN_ENDPOINT}/api/security/login`;

export const V0_TAX_CREATE_ENDPOINT = `${DOMAIN_ENDPOINT}/api/tax/create`;
export const V0_TAX_UPDATE_ENDPOINT = `${DOMAIN_ENDPOINT}/api/tax/update`;
export const V0_TAX_DELETE_ENDPOINT = `${DOMAIN_ENDPOINT}/api/tax/delete`;

export const V0_USER_SELECT_V2_ENDPOINT = `${DOMAIN_ENDPOINT}/api/user/selectv2`;
export const V0_USER_SELECT_ENDPOINT = `${DOMAIN_ENDPOINT}/api/user/select`;
export const V0_USER_REACTIVATE_ENDPOINT = `${DOMAIN_ENDPOINT}/api/user/reactivate`;
export const V0_USER_CREATE_V2_ENDPOINT = `${DOMAIN_ENDPOINT}/api/user/createv2`;
export const V0_USER_CREATE_ENDPOINT = `${DOMAIN_ENDPOINT}/api/user/create`;
export const V0_USER_UPDATE_V2_ENDPOINT = `${DOMAIN_ENDPOINT}/api/user/updatev2`;
export const V0_USER_UPDATE_ENDPOINT = `${DOMAIN_ENDPOINT}/api/user/update`;
export const V0_USER_DELETE_ENDPOINT = `${DOMAIN_ENDPOINT}/api/user/delete`;
