import EmberObject, { computed } from '@ember/object';
import sketches from '../../util/sketches';

const edges = direction => computed(`opts.${direction}`,function() {
  let edges = this.get(`opts.${direction}`);
  let factory = sketches(this).factory;
  return edges.map(name => factory.guidelinesEdge(this, direction, name));
}).readOnly();

export default EmberObject.extend({

  node: null,
  opts: null,

  horizontal: edges('horizontal'),
  vertical:   edges('vertical'),

  all: computed('horizontal', 'vertical', function() {
    let { horizontal, vertical } = this;
    return [ ...horizontal, ...vertical ];
  }).readOnly()

});
