import { assert } from '@ember/debug';
import { assign } from '@ember/polyfills';
import { factory } from '../util/computed';

const defaults = {
  stage:      'stage',
  parent:     'parent',
  nodes:      'nodes',
  type:       'type',
  visible:    'visible',
  selectable: 'selectable'
};

const normalize = (opts={}) => {
  let properties = assign({}, defaults, opts.properties);
  return assign({ properties }, opts);
}

export default opts => factory((factory, model) => factory.node(model, normalize(opts)));

export const getNode = model => {
  let node = model.node;
  assert(`node is required for ${this}`, !!node);
  return node;
}
