/* eslint-disable no-process-env */

export default {
  environment: process.env.NODE_ENV,
  compressedImageSize: 200,
  imageStorageBucket: process.env.IMAGE_STORAGE_BUCKET || 'temp-wr-item-images',
  googleProject: process.env.GOOGLE_PROJECT || 'merchant-dash',
  domainEndpoint: process.env.DOMAIN_ENDPOINT || 'http://www.westernregister.com',
  port: process.env.PORT || 8080
};
