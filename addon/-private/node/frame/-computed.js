import { computed } from '@ember/object';
import { reduce } from '../../util/object';
import { round, rotatedRectBounds } from '../../util/math';

const zoomableKeys = [ 'x', 'y', 'width', 'height' ];

export const zoomed = (frameKey, zoomKey='zoom') => computed(frameKey, zoomKey, function() {
  let zoom = this.get(zoomKey);
  let frame = this.get(frameKey);
  if(!frame) {
    return;
  }
  return reduce(frame, (key, value) => {
    if(zoomableKeys.includes(key)) {
      return round(value * zoom, 2);
    }
    return value;
  });
}).readOnly();

export const rotated = frameKey => computed(frameKey, function() {
  let frame = this.get(frameKey);
  return rotatedRectBounds(frame);
}).readOnly();
