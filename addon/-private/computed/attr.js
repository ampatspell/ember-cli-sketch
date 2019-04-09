import { computed } from '@ember/object';
import { getNode } from './node';
import { assign } from '@ember/polyfills';
import { hashToDeps } from './prop';

export const __sketch_attribute__ = '__sketch_attribute__';

const attributes = model => getNode(model).attributes;

export default (target, opts={}) => {
  opts = assign({ target, type: 'noop' }, opts);
  opts.deps = hashToDeps(opts);
  return computed(opts.target, ...opts.deps.keys, {
    get(key) {
      return attributes(this).getValue(key);
    },
    set(key, value) {
      return attributes(this).setValue(key, value);
    }
  }).meta({ [__sketch_attribute__]: true, opts });
};
