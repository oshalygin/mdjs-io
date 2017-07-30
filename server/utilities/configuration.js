/* eslint-disable no-process-env */

export default {
  environment: process.env.NODE_ENV,
  compressedImageSize: 200,
  imageStorageBucket:
    process.env.IMAGE_STORAGE_BUCKET || 'temp-mdjs-item-images',
  googleProject: process.env.GOOGLE_PROJECT || 'mdjs-io',
  domainEndpoint:
    process.env.DOMAIN_ENDPOINT || 'http://www.westernregister.com',
  port: process.env.PORT || 8080,
};
