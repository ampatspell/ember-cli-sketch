import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { A } from '@ember/array';
import sketches from '../../util/sketches';

export default EmberObject.extend({

  node: null,
  opts: null,

  frame: readOnly('node.frame.hover'),

  all: computed('opts.edges', function() {
    let { opts: { edges } } = this;
    let factory = sketches(this).factory;
    return A(edges.map(name => factory.guidelinesEdge(this, name)));
  }).readOnly()

});
