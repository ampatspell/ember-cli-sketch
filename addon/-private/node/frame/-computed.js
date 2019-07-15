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
      value = value * zoom;
    }
    return value;
  });
}).readOnly();

export const rotated = frameKey => computed(frameKey, function() {
  let frame = this.get(frameKey);
  return rotatedRectBounds(frame);
}).readOnly();

export const absolute = (frameKey, parentFrameKey, rounding=true) => computed(frameKey, parentFrameKey, function() {
  let parent = this.get(parentFrameKey);
  if(!parent) {
    return;
  }

  let frame = this.get(frameKey);
  if(!frame) {
    return;
  }

  let { x, y, width, height, rotation } = frame;

  let r = value => rounding ? round(value, 0) : value;

  let result = {
    x:      r(parent.x + x),
    y:      r(parent.y + y),
    width:  r(width),
    height: r(height),
    rotation
  };
  return result;
}).readOnly();

export const rounded = frameKey => computed(frameKey, function() {
  let frame = this.get(frameKey);
  if(!frame) {
    return;
  }
  return reduce(frame, (key, value) => round(value, 0));
}).readOnly();
