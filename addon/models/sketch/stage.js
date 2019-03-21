import Base from './-base';
import { position } from './stage/position';
import { interactions } from './stage/interactions';
import { resizing } from './stage/resizing';
import { selection } from './stage/selection';
import { dragging } from './stage/dragging';
import { hover } from './stage/hover';
import { renderer } from './stage/renderer';
import { areas } from './stage/areas';
import { round } from '../../util/math';

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

  areas: areas(),

  reset() {
    this.setProperties({
      'zoom': 1,
      'position.x': 0,
      'position.y': 0
    });
  },

  //

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
  },

  //

  willRemoveNode(node) {
    let { hover, selection, dragging, resizing } = this;
    hover.willRemoveNode(node);
    selection.willRemoveNode(node);
    dragging.willRemoveNode(node);
    resizing.willRemoveNode(node);
  },

  didRemoveNode() {
  },

  //

  convertPointFromScreen({ x, y }) {
    let { zoom, position } = this;
    return {
      x: round((x - position.x) / zoom, 2),
      y: round((y - position.y) / zoom, 2)
    };
  },

  //

  handle(action) {
    action.perform();
  }

});
