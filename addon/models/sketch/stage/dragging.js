import Base from '../-base';
import { computed } from '@ember/object';
import { array } from '../../../util/computed';
import { sketches } from '../../../services/sketches';
import { gt } from '@ember/object/computed';

export const dragging = () => computed(function() {
  return sketches(this).factory.stage.dragging(this);
}).readOnly();

export default Base.extend({

  owner: null,
  all: array(),

  any: gt('all.length', 0),

  slice() {
    return this.all.slice(...arguments);
  },

  replace(next) {
    let { all } = this;
    all.replace(0, all.length, next);
  },

  clear() {
    this.all.clear();
  },

  withNodes() {
    return this.all.forEach(...arguments);
  },

  reset() {
    this.clear();
  },

  willRemoveNodes(nodes) {
    this.all.removeObjects(nodes);
  }

});
