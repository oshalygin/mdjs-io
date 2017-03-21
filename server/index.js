process.env.NODE_ENV = 'production'; //eslint-disable-line no-process-env
require('@google-cloud/trace-agent').start();
require('babel-register')();

require('./application.production');
