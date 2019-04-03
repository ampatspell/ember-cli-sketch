import Attribute from './-base';
import { computed } from '@ember/object';
import { numberConstraints } from '../../../util/math';

export default Attribute.extend({

  numberConstraints: computed(function() {
    let { decimals, min, max, initial } = this.opts;
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
  }

});
