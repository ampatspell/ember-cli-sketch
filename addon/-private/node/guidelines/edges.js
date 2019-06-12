import EmberObject, { computed } from '@ember/object';
import sketches from '../../util/sketches';

export default EmberObject.extend({

  node: null,
  opts: null,

  all: computed('opts.edges', function() {
    let { opts: { edges } } = this;
    let factory = sketches(this).factory;
    return edges.map(name => factory.guidelinesEdge(this, name));
  }).readOnly()

});
