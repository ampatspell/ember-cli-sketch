import EmberObject from '@ember/object';
import { readOnly, map } from '@ember/object/computed';
import { frame } from './frame/-base';
import { factory } from '../util/computed';
import { A } from '@ember/array';

export const typed = type => factory((factory, nodes) => factory.typedNodes(type, nodes));

export default EmberObject.extend({

  parent: null,
  stage: readOnly('parent.stage'),

  frame: frame('nodes'),

  all: readOnly('parent._models'),
  _nodes: map('all', model => model.node),

  containers: typed('containers'),

  nodesForPosition(position, type) {
    return this.all.reduce((nodes, model) => {
      let node = model.node;
      if(node.frame.includesPosition(position, type)) {
        nodes.push(node);
      }
      nodes.push(...node.nodes.nodesForPosition(position, type));
      return nodes;
    }, A());
  },

  containsNode(node) {
    return this.all.find(child => child.node === node || child.node.containsNode(node));
  }

});
