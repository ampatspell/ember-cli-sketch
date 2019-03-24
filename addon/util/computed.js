import { computed } from '@ember/object';
import { A } from '@ember/array';
import { numberContraints } from './math';

export const array = () => computed(function() {
  return A();
}).readOnly();

export const validated = (fn) => {
  let _get = (owner, key) => owner[`_${key}`];
  let _set = (owner, key, value) => owner[`_${key}`] = value;
  return computed({
    get(key) {
      return fn(_get(this, key));
    },
    set(key, value) {
      value = fn(value);
      _set(this, key, value);
      return value;
    }
  });
};

export const constrainedNumber = opts => {
  let fn = numberContraints(opts);
  return validated(value => fn(value));
};
