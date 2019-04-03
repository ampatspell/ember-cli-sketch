import Transform from './-base';
import { numberConstraints } from '../../../util/math';

export default Transform.extend({

  process(value, opts) {
    if(typeof value !== 'number') {
      value = parseFloat(value);
    }

    if(isNaN(value)) {
      value = undefined;
    }

    if(value === undefined) {
      value = opts.initial;
    }

    value = numberConstraints(opts)(value);

    return value;
  }

});
