/* eslint-disable no-process-env */

require('babel-register')({});
require('react-tap-event-plugin')();
require('css-modules-require-hook')({
  generateScopedName: '[local]',
});

// Setting NODE_ENV to test instead of production because setting it to production will suppress error messaging
// and propType validation warnings.
process.env.NODE_ENV = 'test';
process.env.DOMAIN_ENDPOINT = 'http://www.foobar.com';
console.log = function() {};
console.warn = function() {};
console.error = function() {};
