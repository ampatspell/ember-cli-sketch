import Base from '../-base';
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
