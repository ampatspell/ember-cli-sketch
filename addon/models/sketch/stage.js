import Base from './base';
import { array } from '../../util/computed';
import { position } from './stage/position';
import { interactions } from './stage/interactions';
import { resizing } from './stage/resizing';
import { selection } from './stage/selection';
import { dragging } from './stage/dragging';
import { hover } from './stage/hover';

export default Base.extend({

  isStage: true,

  position: position(),
  zoom: 1,

  interactions: interactions(),

  areas: array(),

  hover: hover(),
  selection: selection(),
  dragging: dragging(),
  resizing: resizing(),

  addArea(area) {
    this.areas.addObject(area);
    area.didAddToStage(this);
  },

  reset() {
    this.setProperties({
      'zoom': 1,
      'position.x': 0,
      'position.y': 0
    });
  },

  nodesForAbsolutePosition(position) {
    return this.areas.reduce((array, area) => {
      array.push(...area.nodesForAbsolutePosition(position));
      return array;
    }, []);
  }

});
