import { computed } from '@ember/object';
import { round, rotatedRectBounds } from '../../../util/math';
import { serialized as _serialized } from '../../../util/computed';

const keys = (() => {
  let zoomable = [ 'x', 'y', 'width', 'height' ];
  let remaining = [ 'rotation' ];
  let all = [ ...zoomable, ...remaining ];
  return { zoomable, remaining, all };
})();

const stageKey = 'owner.stage';
const zoomKey = `${stageKey}.zoom`;

export const serialized = () => _serialized(keys.all);

export const zoomed = frameKey => computed(zoomKey, frameKey, function() {
  let zoom = this.get(zoomKey);
  let frame = this.get(frameKey);
  if(!frame) {
    return;
  }
  return Object.keys(frame).reduce((zoomed, key) => {
    let value = frame[key];
    if(keys.zoomable.includes(key)) {
      value = round(value * zoom, 2);
    }
    zoomed[key] = value;
    return zoomed;
  }, {});
}).readOnly();

export const absolute = () => computed('owner.parent.frame.absolute', 'serialized', function() {
  let parent = this.get('owner.parent.frame.absolute');
  if(!parent) {
    parent = {
      x: 0,
      y: 0
    };
  }
  let { x, y, width, height, rotation } = this.get('serialized');

  let result = {
    x:      round(parent.x + x, 2),
    y:      round(parent.y + y, 2),
    width:  round(width, 2),
    height: round(height, 2),
    rotation
  };
  return result;
}).readOnly();

export const rotated = frameKey => computed(frameKey, function() {
  let frame = this.get(frameKey);
  return rotatedRectBounds(frame);
}).readOnly();
