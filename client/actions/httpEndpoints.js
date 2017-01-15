export const DOMAIN_ENDPOINT = process.env.DOMAIN_ENDPOINT || 'http://localhost:59947'; //eslint-disable-line no-process-env
export const LOGIN_ENDPOINT = `${DOMAIN_ENDPOINT}/api/dashboard/security`;
export const ITEM_ENDPOINT = `${DOMAIN_ENDPOINT}/api/dashboard/item`;
export const LOGIN_TOKEN_ENDPOINT = `${DOMAIN_ENDPOINT}/api/dashboard/security/token`;
