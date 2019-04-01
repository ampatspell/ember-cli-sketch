import EmberObject from '@ember/object';
import { readOnly, gt, filterBy } from '@ember/object/computed';
import { array } from '../util/computed';

export default EmberObject.extend({

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
  }

});
