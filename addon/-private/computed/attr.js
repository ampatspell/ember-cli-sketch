import { computed } from '@ember/object';
import { getNode } from './node';
import { assign } from '@ember/polyfills';

export const __sketch_attribute__ = '__sketch_attribute__';

const attributes = model => getNode(model).attributes;

export default (target, opts={}) => {
  opts = assign({ target }, opts);
  return computed(opts.target, {
    get(key) {
      return attributes(this).getValue(key);
    },
    set(key, value) {
      return attributes(this).setValue(key, value);
    }
  }).meta({ [__sketch_attribute__]: true, opts });
};
