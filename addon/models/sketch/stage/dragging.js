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

  isDragging: null,

  slice() {
    return this.all.slice(...arguments);
  },

  start() {
    this.setProperties({ isDragging: true });
    this.replace();
  },

  update() {
    if(!this.isDragging) {
      return;
    }

    let { selection } = this.owner;

    if(!this.any) {
      if(!selection.any) {
        return false;
      }
      this.replace(selection.all);
    }

    return true;
  },

  replace(next) {
    let { all } = this;
    all.replace(0, all.length, next);
  },

  clear() {
    this.setProperties({ isDragging: false });
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
