import EmberObject, { computed } from '@ember/object';
import { readOnly, or } from '@ember/object/computed';
import { findBy } from '../util/computed';
import { radToDeg, degToRad } from '../util/math';

const angles = Object.freeze({
  'top-left': -45,
  'top-middle': 0,
  'top-right': 45,
  'middle-right': -90,
  'middle-left': 90,
  'bottom-left': -135,
  'bottom-middle': 180,
  'bottom-right': 135
});

export default EmberObject.extend({

  stage: null,

  _edge: findBy('stage.selection.attached', '_hasEdge', true),
  _rotation: readOnly('_edge.edge.node.frame.rotation'),

  edge: computed('_edge.edge.serialized', '_rotation', function() {
    let edge = this.get('_edge.edge.serialized');
    if(!edge) {
      return;
    }

    let { horizontal, vertical } = edge;
    let id = `${vertical}-${horizontal}`;

    let rad = degToRad(this.get('_rotation')) + degToRad(angles[id]);
    let rotation = ((radToDeg(rad) % 360) + 360) % 360;

    let inRange = (a, b) => rotation >= a && rotation <= b;

    if(inRange(315 + 22.5, 360) || inRange(0, 22.5)) {
      return 'ns-resize';
    } else if(inRange(45 - 22.5, 45 + 22.5)) {
      return 'nesw-resize';
    } else if(inRange(90 - 22.5, 90 + 22.5)) {
      return 'ew-resize';
    } else if(inRange(135 - 22.5, 135 + 22.5)) {
      return 'nwse-resize';
    } else if(inRange(180 - 22.5, 180 + 22.5)) {
      return 'ns-resize';
    } else if(inRange(225 - 22.5, 225 + 22.5)) {
      return 'nesw-resize';
    } else if(inRange(270 - 22.5, 270 + 22.5)) {
      return 'ew-resize';
    } else if(inRange(315 - 22.5, 315 + 22.5)) {
      return 'nwse-resize';
    }

    return 'cursor';
  }).readOnly(),

  tool: readOnly('stage.tools.selected.cursor'),

  value: or('tool', 'edge')

});
