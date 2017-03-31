/* eslint-disable no-process-env */

export default {
  environment: process.env.NODE_ENV,
  domainEndpoint: process.env.DOMAIN_ENDPOINT || 'http://www.westernregister.com',
  port: process.env.PORT || 8080
};
