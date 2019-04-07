import EmberObject from '@ember/object';
import { filterBy, gt } from '@ember/object/computed';
import { array } from '../util/computed';

export default EmberObject.extend({

  all: array(),
  attached: filterBy('all', 'isAttached', true),
  any: gt('attached.length', 0),

  copy() {
    return this.attached.slice();
  },

  clear() {
    this.all.clear();
  },

  includes(node) {
    return this.attached.includes(node);
  },

  addNode(node) {
    this.all.addObject(node);
  },

  addNodes(nodes) {
    this.all.addObjects(nodes);
  },

  removeNode(node) {
    this.all.removeObject(node);
  },

  removeNodes(nodes) {
    this.all.removeObjects(nodes);
  },

  removeExcept(node) {
    let nodes = this.filter(selection => selection !== node);
    this.removeNodes(nodes);
    return nodes;
  },

  replace(next) {
    let { all } = this;
    all.replace(0, all.length, next);
  },

  find() {
    return this.attached.find(...arguments);
  },

  filter() {
    return this.attached.filter(...arguments);
  },

  reset() {
    this.clear();
  }

});
