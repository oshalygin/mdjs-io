import configuration from '../../utilities/configuration';

export const DOMAIN_ENDPOINT = configuration.domainEndpoint;
export const LOGIN_ENDPOINT = `${DOMAIN_ENDPOINT}/api/dashboard/security`;
export const ITEM_ENDPOINT = `${DOMAIN_ENDPOINT}/api/dashboard/item`;
export const LOGIN_TOKEN_ENDPOINT = `${DOMAIN_ENDPOINT}/api/dashboard/security/token`;
export const ITEM_IMAGE_ENDPOINT = `${DOMAIN_ENDPOINT}/api/dashboard/image`;
