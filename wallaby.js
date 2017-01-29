module.exports = function (wallaby) {

  return {
    files: [
      'client/**/*.js*',
      'client/**/*.css',
      'server/**/*.js',
      '!client/**/*.json',
      '!client/**/*.spec.js*',
      '!server/**/*.spec.js*',
      'utilities/logger.js',
      { pattern: '/**/*.png', load: 'null' }
    ],

    tests: [
      'client/**/*.spec.js',
      'server/**/*.spec.js'

    ],
    env: {
      type: 'node',
      params: {
        env: 'NODE_ENV=test'
      }
    },
    compilers: {
      '**/*.js*': wallaby.compilers.babel({
        presets: ['react', 'es2015'],
        plugins: ['transform-object-rest-spread']
      })
    },

     // Toggle when you experience caching issues

    workers: {
      recycle: true
    },

    setup: function () { //eslint-disable-line object-shorthand

      const cssHook = require('css-modules-require-hook');
      cssHook({
        generateScopedName: '[path]___[name]__[local]___[hash:base64:5]'
      });

      const noop = () => { };

      require.extensions['.css'] = noop;
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
