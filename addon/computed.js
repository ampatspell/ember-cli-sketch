import { computed } from '@ember/object';
import { assign } from '@ember/polyfills';
import { numberContraints } from './util/math';

const constrainedNumber = (key, opts, defaults) => {
  let fn = numberContraints(assign({}, defaults, opts));
  return computed(key, {
    get() {
      let value = this.get(key);
      value = fn(value);
      return value;
    },
    set(_, value) {
      value = fn(value);
      this.set(key, value);
      return value;
    }
  });
}

export const position = (key, opts) => constrainedNumber(key, opts, {
  initial: 0,
  decimals: 2
});

export const size = (key, opts) => constrainedNumber(key, opts, {
  initial: 0,
  min: 0,
  round: 2
});

export const zoom = (key, opts) => constrainedNumber(key, opts, {
  initial: 1,
  min: 0,
  max: 10,
  decimals: 2
});

export const rotation = (key, opts) => constrainedNumber(key, opts, {
  initial: 0,
  min: -360,
  max: 360,
  decimals: 2
});
