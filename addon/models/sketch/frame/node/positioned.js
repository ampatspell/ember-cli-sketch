import Frame from '../-base';
import Position from '../-position';
import Size from '../-size';
import { serialized, zoomed } from '../-computed';

const props = [ 'x', 'y' ];

export default Frame.extend(Position, Size, {

  serialized: serialized(props),

  zoomed: zoomed('owner.stage.zoom', 'serialized'),

});
