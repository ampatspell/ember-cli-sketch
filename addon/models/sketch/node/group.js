import Node from '../node';
import { array } from '../../../util/computed';
import { frame } from '../frame';
import { assign } from '@ember/polyfills';

export default Node.extend({

  isGroup: true,
  type: 'group',

  frame: frame('group'),

  area: null,
  nodes: array(),

  didAddToArea(area) {
    this.setProperties({ area });
  },

  addNode(node, opts) {
    let { select } = assign({ select: false }, opts);

    this.nodes.addObject(node);
    node.didAddToGroup(this);

    if(select) {
      node.select();
    }
  },

  _removeNode(node) {
    if(!this.nodes.includes(node)) {
      return;
    }
    node.willRemove();
    this.nodes.removeObject(node);
    node.didRemove();
  },

  nodesForPosition(position) {
    let nodes = this._super(...arguments);
    if(nodes.length) {
      this.nodes.forEach(node => {
        if(node.frame.includesPosition(position)) {
          nodes.push(node);
        }
      });
    }
    return nodes;
  },

  containsNode(node) {
    return this.nodes.find(child => child === node || child.containsNode(node));
  }

});
