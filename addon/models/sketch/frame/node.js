import Frame from './-base';
import { Position, Size, Rotation } from './-property-mixins';
import { serialized, rotated, zoomed, absolute } from './-computed';

export default Frame.extend(Position, Size, Rotation, {

  serialized: serialized(),
  rotated: rotated('serialized'),
  zoomed: zoomed('serialized'),

  absolute: absolute(),
  absoluteBounds: rotated('absolute'),

  hover: zoomed('absoluteBounds'),
  selection: zoomed('absoluteBounds')

});
