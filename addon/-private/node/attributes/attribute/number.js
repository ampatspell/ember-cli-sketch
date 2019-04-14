import Attribute from './-base';
import { computed } from '@ember/object';
import { numberConstraints } from '../../../util/math';

export default Attribute.extend({

  numberConstraints: computed('min', 'max', function() {
    let { opts: { decimals, initial }, min, max } = this;
    return numberConstraints({ decimals, min, max, initial });
  }).readOnly(),

  transformValue(value) {
    if(typeof value !== 'number') {
      value = parseFloat(value);
    }

    if(isNaN(value)) {
      value = undefined;
    }

    if(value === undefined) {
      value = this.opts.initial;
    }

    value = this.numberConstraints(value);

    return value;
  },

  clamp(value) {
    if(this.immutable) {
      return this.getValue();
    }
    return this.numberConstraints(value);
  },

  clampDelta(value) {
    let current = this.getValue();
    return this.clamp(current + value) - current;
  }

});
