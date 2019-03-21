import Base from '../-base';
import { computed } from '@ember/object';
import { array } from '../../../util/computed';
import { sketches } from '../../../services/sketches';

export const selection = () => computed(function() {
  return sketches(this).factory.stage.selection(this);
}).readOnly();

export default Base.extend({

  owner: null,
  nodes: array(),

  copy() {
    return this.nodes.slice();
  },

  includes(node) {
    return this.nodes.includes(node);
  },

  addNode(node) {
    this.nodes.addObject(node);
  },

  addNodes(nodes) {
    this.nodes.addObjects(nodes);
  },

  removeNode(node) {
    this.nodes.removeObject(node);
  },

  removeNodes(nodes) {
    this.nodes.removeObjects(nodes);
  },

  replace(next) {
    let { nodes } = this;
    nodes.replace(0, nodes.length, next);
  },

  find() {
    return this.nodes.find(...arguments);
  },

  filter() {
    return this.nodes.filter(...arguments);
  },

  reset() {
    this.replace([]);
  }

});
