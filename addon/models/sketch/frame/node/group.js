import Frame from '../-base';
import { readOnly } from '@ember/object/computed';
import { zoomed as _zoomed, absolute, bounds } from '../-computed';

const props = [ 'x', 'y', 'width', 'height' ];
const zoomed = frame => _zoomed('owner.stage.zoom', frame);
const prop = key => readOnly(`serialized.${key}`);

export default Frame.extend({

  exists: false,

  x:      prop('x'),
  y:      prop('y'),
  width:  prop('width'),
  height: prop('height'),

  serialized: bounds('owner.nodes.all', '_serializedFrame'),

  zoomed: zoomed('serialized'),
  bounds: bounds('owner.nodes.all', '_boundsFrame'),
  zoomedBounds: zoomed('bounds', props),
  absoluteZoomed: readOnly('owner.parent.frame.absoluteZoomed'),
  absoluteZoomedBounds: absolute('zoomedBounds', 'absoluteZoomed', props),
  absolute: readOnly('owner.parent.frame.absolute'),

});
