import { assert } from '@ember/debug';
import { factory } from '../util/computed';

export default opts => factory((factory, model) => factory.node(model, opts));

export const getNode = model => {
  let node = model.node;
  assert(`node is required for ${this}`, !!node);
  return node;
}
