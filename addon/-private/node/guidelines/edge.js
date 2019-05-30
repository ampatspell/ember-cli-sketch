import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

export default EmberObject.extend({

  edges: null,
  opts: null,

  node: readOnly('edges.node'),
  frame: readOnly('node.frame.hover'),

  point: computed('frame', function() {
    let { frame, opts: { recompute } } = this;
    return recompute(frame);
  }).readOnly()

});
