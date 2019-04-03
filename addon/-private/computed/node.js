import { computed } from '@ember/object';
import { assign } from '@ember/polyfills';
import { assert } from '@ember/debug';
import sketches from '../util/sketches';

export default base => opts => {
  opts = assign({}, base, opts);
  return computed(function() {
    return sketches(this).factory.node(this, opts);
  }).readOnly();
}

export const getNode = model => {
  let node = model.node;
  assert(`node is required for ${this}`, !!node);
  return node;
}
