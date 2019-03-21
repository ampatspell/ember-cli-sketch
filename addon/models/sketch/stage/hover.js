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
  nodes: array(),

  notSelectedNodes: filterBy('nodes', 'notSelected', true),
  lastNode: readOnly('nodes.lastObject'),

  any: gt('nodes.length', 0),

  replace(next) {
    let { nodes } = this;
    nodes.replace(0, nodes.length, next);
  },

  find() {
    return this.nodes.find(...arguments);
  },

  reset() {
    this.replace([]);
  },

  willRemoveNode() {
    this.reset();
  }

});
