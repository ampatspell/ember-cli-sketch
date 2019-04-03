import { computed } from '@ember/object';
import { reduce } from '../../util/object';
import { rotatedRectBounds } from '../../util/math';

const zoomableKeys = [ 'x', 'y', 'width', 'height' ];

export const zoomed = (frameKey, zoomKey='zoom') => computed(frameKey, zoomKey, function() {
  let zoom = this.get(zoomKey);
  let frame = this.get(frameKey);
  if(!frame) {
    return;
  }
  return reduce(frame, (key, value) => {
    if(zoomableKeys.includes(key)) {
      return value * zoom;
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

  let frame = this.get(frameKey);
  if(!frame) {
    return;
  }

  let { x, y, width, height, rotation } = frame;

  let result = {
    x:      parent.x + x,
    y:      parent.y + y,
    width:  width,
    height: height,
    rotation
  };
  return result;
}).readOnly();
