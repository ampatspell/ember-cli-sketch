import Base from '../-base';
import { computed } from '@ember/object';
import { sketches } from '../../../services/sketches';
import { array } from '../../../util/computed';

export const areas = () => computed(function() {
  return sketches(this).factory.stage.areas(this);
}).readOnly();

export default Base.extend({

  owner: null,
  nodes: array(),

  add(area) {
    this.nodes.addObject(area);
    area.didAddToStage(this.owner);
  },

  reduce() {
    return this.nodes.reduce(...arguments);
  },

  nodesForAbsolutePosition(position) {
    return this.nodes.reduce((array, area) => {
      array.push(...area.nodesForAbsolutePosition(position));
      return array;
    }, []);
  }

});
