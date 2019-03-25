import Frame from './-base';
import Position from './-position';
import Size from './-size';
import Rotation from './-rotation';
import { serialized, rotated, zoomed, absolute } from './-computed';

export default Frame.extend(Position, Size, Rotation, {

  serialized: serialized(),
  rotated: rotated('serialized'),
  zoomed: zoomed('serialized'),

  absolute: absolute(),
  absoluteBounds: rotated('absolute'),

  hover: zoomed('absoluteBounds'),

});
