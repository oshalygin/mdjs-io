import configuration from '../../utilities/configuration';

const hostLocation = window.location.host;
const protocol = window.location.protocol;
const baseEndpoint = `${protocol}//${hostLocation}`;

export const ACCOUNT_ENDPOINT = `${baseEndpoint}/api/v1/account`;

export const DOMAIN_ENDPOINT = configuration.domainEndpoint;
export const LOGIN_ENDPOINT = `${DOMAIN_ENDPOINT}/api/dashboard/security`;
export const ITEM_ENDPOINT = `${DOMAIN_ENDPOINT}/api/dashboard/item`;
export const LOGIN_TOKEN_ENDPOINT = `${DOMAIN_ENDPOINT}/api/dashboard/security/token`;
export const IMAGE_ENDPOINT = `${DOMAIN_ENDPOINT}/api/dashboard/image`;
