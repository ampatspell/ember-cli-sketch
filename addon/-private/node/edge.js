import EmberObject, { computed } from '@ember/object';
import { readOnly, bool } from '@ember/object/computed';

const offset = 10;

const calculate = (local, bounds) => {
  let edge = {};

  if(local.x > -offset && local.x < offset) {
    edge.horizontal = 'left';
  } else if(local.x > bounds.width - offset && local.x < bounds.width + offset) {
    edge.horizontal = 'right';
  } else if(local.x > (bounds.width / 2) - offset && local.x < (bounds.width / 2) + offset) {
    edge.horizontal = 'middle';
  }

  if(local.y > -offset && local.y < offset) {
    edge.vertical = 'top';
  } else if(local.y > bounds.height - offset && local.y < bounds.height + offset) {
    edge.vertical = 'bottom';
  } else if(local.y > (bounds.height / 2) - offset && local.y < (bounds.height / 2) + offset) {
    edge.vertical = 'middle';
  }

  if(!edge.horizontal || !edge.vertical) {
    return;
  }

  if(edge.horizontal === 'middle' && edge.vertical === 'middle') {
    return;
  }

  return edge;
};

const prop = key => readOnly(`serialized.${key}`);

export default EmberObject.extend({

  point: readOnly('node.stage.interactions.mouse.stage'),

  serialized: computed('point', 'node.frame.hover', function() {
    let { point } = this;
    if(!point) {
      return;
    }
    let { node, node: { frame: { hover } } } = this;
    if(!hover) {
      return;
    }
    let local = node.frame.convertPoint(point, 'hover');
    return calculate(local, hover);
  }).readOnly(),

  has: bool('serialized'),

  horizontal: prop('horizontal'),
  vertical:   prop('vertical')

});
