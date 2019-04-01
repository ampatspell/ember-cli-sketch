import EmberObject from '@ember/object';
import { gt } from '@ember/object/computed';
import { array } from '../util/computed';

export default EmberObject.extend({

  all: array(),

  any: gt('all.length', 0),

  copy() {
    return this.all.slice();
  },

  clear() {
    this.all.clear();
  },

  includes(node) {
    return this.all.includes(node);
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

  replace(next) {
    let { all } = this;
    all.replace(0, all.length, next);
  },

  find() {
    return this.all.find(...arguments);
  },

  filter() {
    return this.all.filter(...arguments);
  },

  reset() {
    this.clear();
  },

  willRemoveNodes(nodes) {
    this.all.removeObjects(nodes);
  }

});
