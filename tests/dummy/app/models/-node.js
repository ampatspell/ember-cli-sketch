import { node as _node, attr as _attr, prop } from 'ember-cli-sketch/computed';
import { assign } from '@ember/polyfills';

export const node = opts => _node(assign({
  identifier: 'dummy'
}, opts));

export const attr = (target, opts) => _attr(`doc.${target}`, opts);

export {
  prop
}
