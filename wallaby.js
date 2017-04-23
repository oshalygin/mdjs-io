module.exports = function (wallaby) {
  'use strict';
  return {
    debug: true,
    files: [
      'client/**/*.js*',
      'client/**/*.css',
      'server/**/*.js',
      '!client/**/*.json',
      '!client/**/*.spec.js*',
      '!server/**/*.spec.js*',
      'utilities/styleMock.js',
      'utilities/fileMock.js',
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
    testFramework: 'jest',
    compilers: {
      '**/*.js*': wallaby.compilers.babel({
        presets: ['latest', 'react', 'stage-1'],
        plugins: ['transform-object-rest-spread', [
          'transform-runtime',
          {
            polyfill: false
          }
        ]]
      })
    }
  };
};
