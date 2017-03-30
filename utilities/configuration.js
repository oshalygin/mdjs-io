/* eslint-disable no-process-env */

export default {
  environment: process.env.NODE_ENV,
  domainEndpoint: process.env.DOMAIN_ENDPOINT || 'http://www.betterwebnow.com',
  port: process.env.PORT || 8080
};
