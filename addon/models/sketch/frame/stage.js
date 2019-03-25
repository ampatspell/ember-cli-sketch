import Frame from './-base';
import Position from './-position';
import { serialized, zoomed } from './-new-computed';
import { round } from '../../../util/math';
import { readOnly } from '@ember/object/computed';

export default Frame.extend(Position, {

  serialized: serialized(),
  absolute: readOnly('serialized'),

  zoomed: zoomed('serialized'),

  // zoomed: zoomed('owner.zoom', 'serialized'),
  // absoluteZoomed: readOnly('zoomed'),
  // absolute: readOnly('serialized')

  zoom: readOnly('owner.zoom'),

  convertPointFromScreen(point) {
    let { zoom } = this;
    let value = key => round(point[key] / zoom - this[key], 0);
    return {
      x: value('x'),
      y: value('y')
    };
  },


});
