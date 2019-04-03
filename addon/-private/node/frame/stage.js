import Frame, { model } from './-base';
import { serialized } from '../../util/computed';
import { zoomed, rounded } from './-computed';
import { readOnly } from '@ember/object/computed';
import { round } from '../../util/math';

const keys = [ 'x', 'y' ];

export default Frame.extend({

  x: model('x'),
  y: model('y'),

  properties: serialized(keys),
  zoomed:     zoomed('properties'),
  absolute:   readOnly('properties'),

  roundedZoomed: rounded('zoomed'),

  convertPointFromScreen(point) {
    let { zoom } = this;
    let value = key => round(point[key] / zoom, 0);
    return {
      x: value('x'),
      y: value('y')
    };
  }

});
