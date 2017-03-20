module.exports = function (wallaby) {
  'use strict';
  return {
    files: [
      'client/**/*.js*',
      'client/**/*.css',
      'server/**/*.js',
      '!client/**/*.json',
      '!client/**/*.spec.js*',
      '!server/**/*.spec.js*',
      'utilities/logger.js',
      'utilities/configuration.js',
      { pattern: '/**/*.png', load: 'null' }
    ],

    tests: [
      'client/**/*.spec.js',
      'server/**/*.spec.js'
    ],
    env: {
      type: 'node',
      params: {
        env: 'NODE_ENV=test;DOMAIN_ENDPOINT=http://www.foobar.com;'
      }
    },
    compilers: {
      '**/*.js*': wallaby.compilers.babel({
        presets: ['latest', 'react', 'stage-1'],
        plugins: ['transform-object-rest-spread', 'rewire', [
          'transform-runtime',
          {
            polyfill: false
          }
        ]]
      })
    },

    // Toggle when you experience caching issues

    workers: {
      recycle: true
    },

    setup: function () { //eslint-disable-line object-shorthand

      require('css-modules-require-hook')({
        generateScopedName: '[local]'
      });

      const noop = () => { };

      require.extensions['.ico'] = noop;
      require.extensions['.png'] = noop;
      require.extensions['.svg'] = noop;

      const jsdom = require('jsdom').jsdom;
      const exposedProperties = ['window', 'navigator', 'document'];

      global.document = jsdom('');
      global.window = document.defaultView;
      Object.keys(document.defaultView).forEach((property) => {
        if (typeof global[property] === 'undefined') {
          exposedProperties.push(property);
          global[property] = document.defaultView[property];
        }
      });


      global.localStorage = {
        getItem() { },
        setItem() { }
      };

      global.navigator = {
        userAgent: 'node.js'
      };

      documentRef = document; //eslint-disable-line no-undef
    }
  };
};
