import Base from '../-base';
import { computed } from '@ember/object';
import { readOnly, not } from '@ember/object/computed';

export default Base.extend({

  owner: null,
  opts: null,

  frame: readOnly('owner.owner.frame.serialized'),

  resize: true,
  min: null,
  max: null,

  isResizable: readOnly('resize'),
  isNotResizable: not('isResizable'),

  size: computed('frame', function() {
    return this.frame[this.opts.size];
  }).readOnly(),

  validateSize(value) {
    let { min, max } = this;
    if((!min || value >= min) && (!max || value <= max)) {
      return { valid: true, value };
    }
    if(value < min) {
      value = min;
    } else if(value > max) {
      value = max;
    }
    return { valid: false, value };
  },

  validateDelta(delta) {
    let size = this.size;
    let { valid, value: abs } = this.validateSize(size + delta);
    let value = abs - size;
    return { valid, value };
  },

  isDeltaValid(delta) {
    if(!this.resize) {
      return false;
    }
    let { valid } = this.validateDelta(delta);
    return valid;
  },

  clampDelta(delta) {
    if(!this.resize) {
      return 0;
    }
    let { value } = this.validateDelta(delta);
    return value;
  }

});
