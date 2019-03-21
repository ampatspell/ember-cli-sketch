import EmberObject, { computed } from '@ember/object';
import { array } from '../../../util/computed';
import { sketches } from '../../../services/sketches';
import { gt } from '@ember/object/computed';

export const dragging = () => computed(function() {
  return sketches(this).factory.stage.dragging(this);
}).readOnly();

export default EmberObject.extend({

  owner: null,
  nodes: array(),

  any: gt('nodes.length', 0),

  prepare(props) {
    this.setProperties(props);
  },

  replace(next) {
    let { nodes } = this;
    nodes.replace(0, nodes.length, next);
  },

  clear() {
    this.nodes.clear();
  },

  withNodes() {
    return this.nodes.forEach(...arguments);
  }

});
