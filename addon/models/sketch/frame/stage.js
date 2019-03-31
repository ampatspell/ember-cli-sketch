import Frame from './-base';
import { Position } from './-property-mixins';
import { serialized, zoomed } from './-computed';
import { round } from '../../../util/math';
import { readOnly } from '@ember/object/computed';

export default Frame.extend(Position, {

  serialized: serialized(),
  absolute: readOnly('serialized'),

  zoomed: zoomed('serialized'),

  convertPointFromScreen(point) {
    let { owner: { zoom } } = this;
    let value = key => round(point[key] / zoom, 0);
    return {
      x: value('x'),
      y: value('y')
    };
  }

});
