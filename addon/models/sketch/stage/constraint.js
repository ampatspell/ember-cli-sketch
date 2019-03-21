import Base from '../-base';
import { computed } from '@ember/object';
import { readOnly, not, and } from '@ember/object/computed';

export default Base.extend({

  owner: null,
  opts: null,

  frame: readOnly('owner.owner.frame.serialized'),

  resize: true,
  min: null,
  max: null,

  isInRange: computed('min', 'max', 'frame', function() {
    let { min, max, frame, opts: { size } } = this;
    if(min && frame[size] <= min) {
      return false;
    }
    if(max && frame[size] >= max) {
      return false;
    }
    return true;
  }).readOnly(),

  isResizable: and('resize', 'isInRange'),
  isNotResizable: not('isResizable'),

});
