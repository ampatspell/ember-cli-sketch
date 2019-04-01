import { computed } from '@ember/object';
import { getOwner } from '@ember/application';

export const model = (name, fn) => computed(function() {
  return getOwner(this).factoryFor(`sketch:${name}`).create(fn.call(this, this));
}).readOnly();
