import Base from './-base';
import { array } from '../../util/computed';
import { sketches } from '../../services/sketches';
import { computed } from '@ember/object';

export const nodes = () => computed(function() {
  return sketches(this).factory.stage.nodes(this);
}).readOnly();

export default Base.extend({

  all: array(),

  addNode(node) {
    let { all, owner } = this;
    if(all.includes(node)) {
      return;
    }
    node.willAddToParent(owner);
    all.pushObject(node);
    node.didAddToParent(owner);
  },

  nodesForPosition(position, type) {
    let nodes = [];
    this.all.forEach(node => {
      nodes.push(...node.nodesForPosition(position, type));
    });
    return nodes;
  },

});
