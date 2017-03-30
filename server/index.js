process.env.NODE_ENV = 'production'; //eslint-disable-line no-process-env
require('@google-cloud/trace-agent').start({
  ignoreUrls: [
    '/_ah/health',
    '/healthz',
    '/'
  ]
});

require('babel-register')();
require('./application.production');
