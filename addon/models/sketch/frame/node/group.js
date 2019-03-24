import Frame from '../-base';
import { readOnly } from '@ember/object/computed';
import { zoomed as _zoomed, rotated, absolute, bounds } from '../-computed';

const props = [ 'x', 'y', 'width', 'height' ];
const zoomed = frame => _zoomed('owner.stage.zoom', frame);
const prop = key => readOnly(`serialized.${key}`);

export default Frame.extend({

  exists: false,

  x:      prop('x'),
  y:      prop('y'),
  width:  prop('width'),
  height: prop('height'),

  serialized: bounds('_serializedFrame'),

  zoomed: zoomed('serialized'),
  bounds: bounds('_boundsFrame'),
  zoomedBounds: zoomed('bounds', props),
  absoluteZoomed: readOnly('owner.parent.frame.absoluteZoomed'),
  absoluteZoomedBounds: absolute('zoomedBounds', props),

});
