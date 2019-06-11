import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

const property = key => readOnly(`properties.${key}`);

export default EmberObject.extend({

  edges: null,
  opts: null,

  direction: readOnly('opts.direction'),
  recompute: readOnly('opts.recompute'),

  node:  readOnly('edges.node'),
  frame: readOnly('node.frame.hover'), // TODO: hover is zoom-dependent

  properties: computed('frame', function() {
    let { frame, recompute } = this;
    return recompute(frame);
  }).readOnly(),

  x:      property('x'),
  y:      property('y'),
  length: property('length')

});
