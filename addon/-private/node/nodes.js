import EmberObject, { computed } from '@ember/object';
import { readOnly, map, filterBy } from '@ember/object/computed';
import { frame } from './frame/-base';
import { factory } from '../util/computed';
import { A } from '@ember/array';

export const typed = type => factory((factory, nodes) => factory.typedNodes(type, nodes));

const nodes = key => map(key, model => model.node);

export default EmberObject.extend({

  parent: null,
  stage: readOnly('parent.stage'),

  all: nodes('parent._models'),

  recursive: computed('all.@each.recursive', function() {
    return this.all.reduce((nested, node) => {
      nested.push(...node.recursive);
      return nested;
    }, []);
  }).readOnly(),

  visible: filterBy('all', 'isVisible', true),
  selectable: filterBy('all', 'isSelectable', true),

  frame: frame('nodes'),

  containers: typed('containers'),

  nodesForPosition(position, type) {
    return this.selectable.reduce((nodes, node) => {
      if(node.frame.containsPosition(position, type)) {
        nodes.push(node);
      }
      nodes.push(...node.nodes.nodesForPosition(position, type));
      return nodes;
    }, A());
  },

  containsNode(node) {
    return this.all.find(child => child === node || child.containsNode(node));
  }

});
