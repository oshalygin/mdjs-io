export const hostLocation = window.location.host;
const protocol = window.location.protocol;
const baseEndpoint = `${protocol}//${hostLocation}`;

export const ACCOUNT_ENDPOINT = `${baseEndpoint}/api/v1/account`;
export const VERSION_ENDPOINT = `${baseEndpoint}/api/v1/version`;
export const IMAGE_ENDPOINT = `${baseEndpoint}/api/v1/images`;
export const ITEM_ENDPOINT = `${baseEndpoint}/api/v1/items`;
export const CATEGORIES_ENDPOINT = `${baseEndpoint}/api/v1/categories`;
export const TAXES_ENDPOINT = `${baseEndpoint}/api/v1/taxes`;
export const MODIFIER_ENDPOINT = `${baseEndpoint}/api/v1/modifiers`;
export const DISCOUNTS_ENDPOINT = `${baseEndpoint}/api/v1/discounts`;
export const ORDERS_ENDPOINT = `${baseEndpoint}/api/v1/orders`;
