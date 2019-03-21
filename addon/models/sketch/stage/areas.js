import Base from '../-base';
import { computed } from '@ember/object';
import { sketches } from '../../../services/sketches';
import { array } from '../../../util/computed';

export const areas = () => computed(function() {
  return sketches(this).factory.stage.areas(this);
}).readOnly();

export default Base.extend({

  owner: null,
  all: array(),

  add(area) {
    this.all.addObject(area);
    area.didAddToStage(this.owner);
  },

  reduce() {
    return this.all.reduce(...arguments);
  },

  nodesForAbsolutePosition(position) {
    return this.all.reduce((array, area) => {
      array.push(...area.nodesForAbsolutePosition(position));
      return array;
    }, []);
  }

});
