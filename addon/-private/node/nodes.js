import EmberObject from '@ember/object';
import { readOnly } from '@ember/object/computed';

export default EmberObject.extend({

  parent: null,

  all: readOnly('parent._nodes'),

  nodesForPosition(position, type) {
    return this.all.reduce((nodes, model) => {
      let node = model.node;
      if(node.frame.includesPosition(position, type)) {
        nodes.push(node);
      }
      nodes.push(...node.nodes.nodesForPosition(position, type));
      return nodes;
    }, []);
  },

  containsNode(node) {
    return this.all.find(child => child.node === node || child.node.containsNode(node));
  }

});
