/* eslint-disable no-process-env */
/* eslint-disable max-len */

export default {
  environment: process.env.NODE_ENV,
  compressedImageSize: 200,

  googleProject: process.env.GOOGLE_PROJECT || 'mdjs-io',
  clusterName: process.env.CLUSTER_NAME || '',
  podId: process.env.POD_ID || '',
  containerName: process.env.CONTAINER_NAME || '',
  clusterZone: process.env.CLUSTER_ZONE || '',

  companyName: 'Western Register',
  domainEndpoint:
    process.env.DOMAIN_ENDPOINT || 'http://www.westernregister.com',
  port: process.env.PORT || 8080,

  databaseConnectionString: process.env.DB_CONNECTION_STRING || '',

  imageStorageBucket:
    process.env.IMAGE_STORAGE_BUCKET || 'temp-mdjs-item-images',
  rejectMimeTypes: [
    'application/x-msdownload',
    'application/x-msdos-program',
    'application/x-msdos-windows',
    'application/x-download',
    'application/bat',
    'application/x-bat',
    'application/com',
    'application/x-com',
    'application/exe',
    'application/x-exe',
    'application/x-winexe',
    'application/x-winhlp',
    'application/x-winhelp',
    'application/x-javascript',
    'application/hta',
    'application/x-ms-shortcut',
    'application/octet-stream',
    'vms/exe',
    'application/zip',
  ],
  uploadFileSizeLimit: 50 * 1024 * 1024,
  numberOfUploadFilesLimit: 5,
};
