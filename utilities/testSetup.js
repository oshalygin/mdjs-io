/* eslint-disable no-process-env */

require('css-modules-require-hook')({
  generateScopedName: '[local]'
});

require('babel-register')();

// Setting NODE_ENV to test instead of production because setting it to production will suppress error messaging
// and propType validation warnings.
process.env.NODE_ENV = 'test';
process.env.DOMAIN_ENDPOINT = 'http://www.foobar.com';
