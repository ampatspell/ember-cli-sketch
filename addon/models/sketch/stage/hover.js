import Base from '../-base';
import { computed } from '@ember/object';
import { array } from '../../../util/computed';
import { sketches } from '../../../services/sketches';
import { readOnly, gt, filterBy } from '@ember/object/computed';

export const hover = () => computed(function() {
  return sketches(this).factory.stage.hover(this);
}).readOnly();

export default Base.extend({

  owner: null,

  all: array(),

  deselected: filterBy('all', 'isSelected', false),
  last: readOnly('all.lastObject'),
  any: gt('all.length', 0),

  replace(nodes) {
    let { all } = this;
    all.replace(0, all.length, nodes);
  },

  find() {
    return this.all.find(...arguments);
  },

  reset() {
    this.replace();
  },

  willRemoveNodes() {
    this.reset();
  }

});
