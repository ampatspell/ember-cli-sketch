import Base from './-base';
import { array } from '../../util/computed';
import { position } from './stage/position';
import { interactions } from './stage/interactions';
import { resizing } from './stage/resizing';
import { selection } from './stage/selection';
import { dragging } from './stage/dragging';
import { hover } from './stage/hover';
import { renderer } from './stage/renderer';

export default Base.extend({

  isStage: true,

  position: position(),
  zoom: 1,

  interactions: interactions(),
  hover: hover(),
  selection: selection(),
  dragging: dragging(),
  resizing: resizing(),
  renderer: renderer(),

  areas: array(),

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
  },

  attach() {
    this.renderer.attach(...arguments);
  },

  detach() {
    let { renderer, interactions, hover, selection, dragging, resizing } = this;
    renderer.detach(...arguments);
    interactions.reset();
    hover.reset();
    selection.reset();
    dragging.reset();
    resizing.reset();
  }

});
