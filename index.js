'use strict';

const pkg = require('./package');
const create = require('broccoli-file-creator');
const mergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const path = require('path');

module.exports = {
  name: pkg.name,
  included() {
    this._super.apply(this, arguments);
    this.app.import('vendor/ember-cli-sketch/webfontloader.js');
    this.app.import('vendor/ember-cli-sketch/webfontloader-shim.js');
    this.app.import('vendor/ember-cli-sketch/versions.js');
  },
  treeForVendor(vendorTree) {
    let trees = [];

    if(vendorTree) {
      trees.push(vendorTree);
    }

    let versions = [
      `Ember.libraries.register('${pkg.name}', '${pkg.version}');`,
    ];

    trees.push(create('ember-cli-sketch/versions.js', versions.join('\n')));

    trees.push(new Funnel(path.resolve(path.dirname(require.resolve('webfontloader'))), {
      files: [
        'webfontloader.js',
      ],
      destDir: '/ember-cli-sketch'
    }));

    return mergeTrees(trees);
  }
};
