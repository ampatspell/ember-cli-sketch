import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

export default EmberObject.extend({

  edges: null,
  opts: null,

  direction: readOnly('opts.direction'),

  node: readOnly('edges.node'),
  frame: readOnly('node.frame.hover'),

  recomputed: computed('frame', function() {
    let { frame, opts: { recompute } } = this;
    return recompute(frame);
  }).readOnly(),

  point: computed('recomputed', function() {
    let { recomputed: { x, y } } = this;
    return { x, y };
  }).readOnly(),

  // TODO: tmp
  x: readOnly('point.x'),
  y: readOnly('point.y'),

  length: computed('recomputed', function() {
    let { recomputed: { length } } = this;
    return length;
  }).readOnly(),

});
