import { node as _node, attr as _attr } from 'ember-cli-sketch/computed';
import { assign } from '@ember/polyfills';

export const node = opts => _node(assign({
  identifier: 'dummy',
  properties: {
    stage: 'stage',
    parent: 'parent',
    nodes: 'nodes',
    type: 'type'
  }
}, opts));

export const attr = (target, opts) => _attr(`doc.${target}`, opts);
