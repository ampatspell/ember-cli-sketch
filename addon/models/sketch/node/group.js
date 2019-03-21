import Node from '../node';
import { array } from '../../../util/computed';
import { frame } from '../frame';

export default Node.extend({

  isGroup: true,
  type: 'group',

  frame: frame('group'),

  area: null,
  nodes: array(),

  didAddToArea(area) {
    this.setProperties({ area });
  },

  addNode(node) {
    this.nodes.addObject(node);
    node.didAddToGroup(this);
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

  includesNode(node) {
    return this.nodes.find(child => child === node || child.includesNode(node));
  }

});
