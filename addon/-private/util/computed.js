import { computed } from '@ember/object';
import { A } from '@ember/array';
import { numberConstraints } from './math';
import { compact } from './object';
import sketches from './sketches';

export const array = () => computed(function() {
  return A();
}).readOnly();

export const self = () => computed(function() {
  return this;
})

export const serialized = (keys, fn) => computed(...keys, function() {
  let props = this.getProperties(keys);
  if(fn) {
    props = fn.call(this, props);
  }
  return compact(props);
}).readOnly();

export const factory = fn => computed(function() {
  return fn.call(this, sketches(this).factory, this);
}).readOnly();

export const number = opts => key => {
  let fn = numberConstraints(opts);
  return computed(key, function() {
    return fn(this.get(key));
  }).readOnly();
};

export const zoom = number({
  initial: 1,
  min: 0,
  max: 10,
  decimals: 2
});

export const findBy = (arrayKey, prop, value) => computed(`${arrayKey}.@each.${prop}`, function() {
  let array = this.get(arrayKey);
  if(!array) {
    return;
  }
  return array.findBy(prop, value);
}).readOnly();
