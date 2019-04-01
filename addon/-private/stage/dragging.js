import EmberObject from '@ember/object';
import { array } from '../util/computed';
import { gt } from '@ember/object/computed';

export default EmberObject.extend({

  all: array(),
  any: gt('all.length', 0),

  copy() {
    return this.all.slice();
  },

  clear() {
    this.all.clear();
  },

  replace(next) {
    let { all } = this;
    all.replace(0, all.length, next);
  },

  addNodes(nodes) {
    this.all.pushObjects(nodes);
  },

  forEach() {
    return this.all.forEach(...arguments);
  },

  reset() {
    this.clear();
  },

  willRemoveNodes(nodes) {
    this.all.removeObjects(nodes);
  }

});
