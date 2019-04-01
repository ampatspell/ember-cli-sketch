import { computed } from '@ember/object';
import { assign } from '@ember/polyfills';
import sketches from './-private/util/sketches';

export const node = base => opts => {
  opts = assign({}, base, opts);
  return computed(function() {
    return sketches(this).factory.node(this, opts);
  }).readOnly();
}
