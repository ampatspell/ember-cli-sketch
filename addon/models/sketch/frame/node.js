import Frame from './-base';
import Position from './-position';
import Size from './-size';
import Rotation from './-rotation';
import { serialized, zoomed } from './-new-computed';

export default Frame.extend(Position, Size, Rotation, {

  serialized: serialized(),
  zoomed: zoomed('serialized'),

  // bounds: rotated('serialized'),
  // zoomedBounds: zoomed('bounds'),

  // absoluteZoomed: absolute('zoomed', 'absoluteZoomed', props),
  // absoluteZoomedBounds: absolute('zoomedBounds', 'absoluteZoomed', props),
  // absoluteBounds: absolute('bounds', 'absolute', props),
  // absolute: absolute('serialized', 'absolute', props)

});
