exports.config = {
  overrides: {},
  conventions: {
    ignored: [
      /[\\/]_/,
      /\-test.js$/,
    ],
  },
  files: {
    javascripts: {
      joinTo: {
        'js/app.js': /^app/,
        'js/vendor.js': /^node_modules/,
      },
    },
    stylesheets: {
      joinTo: {
        'styles/app.css': /^app/,
        'styles/vendor.css': /^node_modules/,
      }
    },
  },
  npm: {
    enabled: true,
    styles: {
      'uikit': [ 'dist/css/uikit.min.css' ]
    }
  },
  plugins: {
    babel: {
      babelrc: true,
    },
  },
  modules: {
    autoRequire: {
      'js/app.js': [ 'js/app' ],
    },
  },
};
