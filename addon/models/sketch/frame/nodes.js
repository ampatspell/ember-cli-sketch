import Frame from './-base';
import { readOnly } from '@ember/object/computed';
import { zoomed as _zoomed, absolute, bounds } from './-computed';

const props = [ 'x', 'y', 'width', 'height' ];
const prop = key => readOnly(`serialized.${key}`);
const zoomed = frameKey => _zoomed('owner.parent.stage.zoom', frameKey);

export default Frame.extend({

  // exists: false,

  // x:      prop('x'),
  // y:      prop('y'),
  // width:  prop('width'),
  // height: prop('height'),

  // serialized: bounds('owner.all', '_serializedFrame'),
  // zoomed: zoomed('serialized'),
  // bounds: bounds('owner.all', '_boundsFrame'),
  // zoomedBounds: zoomed('bounds'),
  // absoluteZoomedBounds: absolute('zoomedBounds', 'absoluteZoomed', props)

});
