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

  forEach() {
    return this.all.forEach(...arguments);
  },

  willRemoveNodes(nodes) {
    this.all.removeObjects(nodes);
  }

});
