import { computed } from '@ember/object';
import { A } from '@ember/array';

export const array = () => computed(function() {
  return A();
}).readOnly();
