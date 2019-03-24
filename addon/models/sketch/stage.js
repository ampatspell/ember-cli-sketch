import Base from './-base';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { frame, FrameMixin } from './frame/-base';
import { constrainedNumber } from '../../util/computed';
import { nodes } from './nodes';
import { interactions } from './stage/interactions';
import { actions } from './stage/actions';
import { hover } from './stage/hover';
import { selection } from './stage/selection';
import { dragging } from './stage/dragging';
import { resizing } from './stage/resizing';
import { renderer } from './stage/renderer';
import { round } from '../../util/math';

const zoom = () => constrainedNumber({
  initial: 1,
  min: 0,
  max: 10,
  decimals: 2
});

const stage = () => computed(function() {
  return this;
}).readOnly();

export default Base.extend(FrameMixin, {

  isStage: true,
  stage: stage(),

  frame: frame('stage'),
  zoom: zoom(),

  nodes: nodes(),

  interactions: interactions(),
  actions: actions(),
  hover: hover(),
  selection: selection(),
  dragging: dragging(),
  resizing: resizing(),
  renderer: renderer(),

  reset() {
    this.setProperties({
      'zoom': 1,
      'frame.x': 0,
      'frame.y': 0
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

  handle(action) {
    action.perform();
  },

  //

  nodesForPosition(position, type) {
    return this.nodes.nodesForPosition(position, type);
  },

  convertPointFromScreen(point) {
    let { zoom, frame } = this;
    let value = key => round(point[key] / zoom - frame[key], 2);
    return {
      x: value('x'),
      y: value('y')
    }
  }

});
