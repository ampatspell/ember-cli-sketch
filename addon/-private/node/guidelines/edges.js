import EmberObject, { computed } from '@ember/object';
import { A } from '@ember/array';
import sketches from '../../util/sketches';

export default EmberObject.extend({

  node: null,
  opts: null,

  bounds: computed('node.frame.{x,y,width,height}', function() {
    return this.node.frame.hover;
  }).readOnly(),

  all: computed('opts.edges', function() {
    let { opts: { edges } } = this;
    let factory = sketches(this).factory;
    return A(edges.map(name => factory.guidelinesEdge(this, name)));
  }).readOnly()

});
