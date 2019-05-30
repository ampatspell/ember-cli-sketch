import EmberObject, { computed } from '@ember/object';
import sketches from '../../util/sketches';

export default EmberObject.extend({

  node: null,
  opts: null,

  edges: computed(function() {
    let { opts: { edges } } = this;
    let factory = sketches(this).factory;
    return edges.map(recompute => factory.guidelinesEdge(this, { recompute }));
  }).readOnly()

});
