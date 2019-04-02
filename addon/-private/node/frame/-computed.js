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

export const absolute = (frameKey, parentFrameKey) => computed(frameKey, parentFrameKey, function() {
  let parent = this.get(parentFrameKey);
  if(!parent) {
    return;
  }

  let frame = this.get(frameKey);;
  if(!frame) {
    return;
  }

  let { x, y, width, height, rotation } = frame;

  let result = {
    x:      round(parent.x + x, 2),
    y:      round(parent.y + y, 2),
    width:  round(width, 2),
    height: round(height, 2),
    rotation
  };
  return result;
}).readOnly();
