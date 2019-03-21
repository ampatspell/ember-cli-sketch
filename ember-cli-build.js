'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    sassOptions: {
      includePaths: [
        'tests/dummy/app'
      ],
      onlyIncluded: true
    },
  });

  return app.toTree();
};
