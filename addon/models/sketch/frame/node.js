import Frame from '../frame';
import { readOnly } from '@ember/object/computed';
import { computed } from '@ember/object';
import { round } from '../../../util/math';

export default Frame.extend({

  normalized: readOnly('zoomed'),

  area: readOnly('owner.area'),

  bounding: computed('normalized', function() {
    let { normalized: { x, y, width, height, rotation } } = this;

    let points = [
      { x,            y },
      { x: x + width, y },
      { x,            y: y + height},
      { x: x + width, y: y + height },
    ];

    let rad = rotation * (Math.PI / 180);
    let cos = Math.cos(rad);
    let sin = Math.sin(rad);

    let min = points[0];
    let max = points[3];

    let pivot = {
      x: max.x - ((max.x - min.x) / 2),
      y: max.y - ((max.y - min.y) / 2),
    };

    let rotate = point => ({
      x: (cos * (point.x - pivot.x)) - (sin * (point.y - pivot.y)) + pivot.x,
      y: (sin * (point.x - pivot.x)) + (cos * (point.y - pivot.y)) + pivot.y
    });

    let box = {
      min: {
        x: Number.POSITIVE_INFINITY,
        y: Number.POSITIVE_INFINITY,
      },
      max: {
        x: Number.NEGATIVE_INFINITY,
        y: Number.NEGATIVE_INFINITY,
      }
    };

    points.forEach(point => {
      let rotated = rotate(point);
      box.min.x = Math.min(box.min.x, rotated.x);
      box.min.y = Math.min(box.min.y, rotated.y);
      box.max.x = Math.max(box.max.x, rotated.x);
      box.max.y = Math.max(box.max.y, rotated.y);
    });

    let r = value => round(value, 2);

    return {
      x:      r(box.min.x),
      y:      r(box.min.y),
      width:  r(box.max.x - box.min.x),
      height: r(box.max.y - box.min.y),
      rotation: 0
    };
  }).readOnly(),

  absolute: computed('bounding', 'area.frame.absolute', function() {
    let { bounding: frame, area: { frame: { absolute } } } = this;
    return {
      x:        frame.x + absolute.x,
      y:        frame.y + absolute.y,
      width:    frame.width,
      height:   frame.height,
      rotation: frame.rotation
    };
  })

});
