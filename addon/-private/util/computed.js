import { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import { numberContraints } from './math';
import { compact } from './object';

export const serialized = (keys, fn) => computed(...keys, function() {
  let props = this.getProperties(keys);
  if(fn) {
    props = fn.call(this, props);
  }
  return compact(props);
}).readOnly();

export const model = (name, fn) => computed(function() {
  return getOwner(this).factoryFor(`sketch:${name}`).create(fn.call(this, this));
}).readOnly();

export const number = opts => key => {
  let fn = numberContraints(opts);
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
