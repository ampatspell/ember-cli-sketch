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
    return this.isSizeValid(this.frame[this.opts.size]);
  }).readOnly(),

  isResizable: and('resize', 'isInRange'),
  isNotResizable: not('isResizable'),

  isSizeValid(value) {
    let { min, max } = this;
    if((!min || value >= min) && (!max || value <= max)) {
      return true;
    }
    return false;
  },

  isDeltaValid(delta) {
    if(!this.resize) {
      return false;
    }
    let size = this.frame[this.opts.size];
    let value = size + delta;
    return this.isSizeValid(value);
  }

});
