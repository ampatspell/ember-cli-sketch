import Frame from './-base';
import Position from './-position';
import { serialized, zoomed } from './-computed';
import { readOnly } from '@ember/object/computed';

const props = [ 'x', 'y' ];

export default Frame.extend(Position, {

  serialized: serialized(props),

  zoomed: zoomed('owner.zoom', 'serialized', props),
  absoluteZoomed: readOnly('zoomed'),
  absolute: readOnly('serialized')

});
