import Base from '../-base';
import { computed } from '@ember/object';
import { readOnly, not } from '@ember/object/computed';

const frame = key => computed('frame', function() {
  return this.frame[this.opts[key]];
}).readOnly();

export default Base.extend({

  owner: null,
  opts: null,

  frame: readOnly('owner.owner.frame.serialized'),

  resize: true,
  move: true,
  min: null,
  max: null,

  isMovable:      readOnly('move'),
  isNotMovable:   not('move'),
  isResizable:    readOnly('resize'),
  isNotResizable: not('isResizable'),

  position: frame('position'),
  size:     frame('size'),

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

  validateSizeDelta(delta) {
    let size = this.size;
    let { valid, value: abs } = this.validateSize(size + delta);
    let value = abs - size;
    return { valid, value };
  },

  isSizeDeltaValid(delta) {
    if(!this.resize) {
      return false;
    }
    let { valid } = this.validateSizeDelta(delta);
    return valid;
  },

  clampSizeDelta(delta) {
    if(!this.resize) {
      return 0;
    }
    let { value } = this.validateSizeDelta(delta);
    return value;
  },

  clampPosition(value) {
    if(!this.isMovable && this.position !== undefined) {
      return this.position;
    }
    return value;
  },

  clampSize(size) {
    if(!this.resize) {
      return this.size;
    }
    let { value } = this.validateSize(size);
    return value;
  }

});
