import Frame from './-base';
import Position from './-position';
import Size from './-size';
import Rotation from './-rotation';
import { serialized, rotated, zoomed, absolute } from './-new-computed';

export default Frame.extend(Position, Size, Rotation, {

  serialized: serialized(),
  rotated: rotated('serialized'),
  zoomed: zoomed('serialized'),

  absolute: absolute(),
  hover: rotated('absolute'),

  // bounds: rotated('serialized'),
  // zoomedBounds: zoomed('bounds'),

  // absoluteZoomed: absolute('zoomed', 'absoluteZoomed', props),
  // absoluteZoomedBounds: absolute('zoomedBounds', 'absoluteZoomed', props),
  // absoluteBounds: absolute('bounds', 'absolute', props),
  // absolute: absolute('serialized', 'absolute', props)

});
