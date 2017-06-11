import configuration from '../../utilities/configuration';

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

export const V0_CATEGORY_ENDPOINT = `${DOMAIN_ENDPOINT}/api/category`;