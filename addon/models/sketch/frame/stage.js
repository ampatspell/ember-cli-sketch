import Frame from './-base';
import Position from './-position';
import { serialized, zoomed } from './-new-computed';
import { readOnly } from '@ember/object/computed';

export default Frame.extend(Position, {

  serialized: serialized(),

  zoomed: zoomed('serialized'),

  // zoomed: zoomed('owner.zoom', 'serialized'),
  // absoluteZoomed: readOnly('zoomed'),
  // absolute: readOnly('serialized')

});
