import configuration from '../../utilities/configuration';

const hostLocation = window.location.host;
const protocol = window.location.protocol;
const baseEndpoint = `${protocol}//${hostLocation}`;

export const ACCOUNT_ENDPOINT = `${baseEndpoint}/api/v1/account`;
export const VERSION_ENDPOINT = `${baseEndpoint}/api/v1/version`;
export const IMAGE_ENDPOINT = `${baseEndpoint}/api/v1/images`;
export const ITEM_ENDPOINT = `${baseEndpoint}/api/v1/items`;
export const CATEGORIES_ENDPOINT = `${baseEndpoint}/api/v1/categories`;
export const TAXES_ENDPOINT = `${baseEndpoint}/api/v1/taxes`;

export const DOMAIN_ENDPOINT = configuration.domainEndpoint;
export const LOGIN_ENDPOINT = `${DOMAIN_ENDPOINT}/api/dashboard/security`;
export const LOGIN_TOKEN_ENDPOINT = `${DOMAIN_ENDPOINT}/api/dashboard/security/token`;
