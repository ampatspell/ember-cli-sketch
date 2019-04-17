'use strict';

const pkg = require('./package');
const create = require('broccoli-file-creator');
const mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: pkg.name,
  included() {
    this._super.apply(this, arguments);
    this.app.import(require.resolve('webfontloader'));
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

    return mergeTrees(trees);
  }
};
