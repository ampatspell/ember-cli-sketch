import { computed } from '@ember/object';
import { compact } from '../../../util/object';
import { round, rotatedRectBounds } from '../../../util/math';

const keys = (() => {
  let zoomable = [ 'x', 'y', 'width', 'height' ];
  let remaining = [ 'rotation' ];
  let all = [ ...zoomable, ...remaining ];
  return { zoomable, remaining, all };
})();

const stageKey = 'owner.stage';
const zoomKey = `${stageKey}.zoom`;

export const serialized = () => computed(...keys.all, function() {
  return compact(this.getProperties(keys.all));
}).readOnly();

export const zoomed = frameKey => computed(zoomKey, frameKey, function() {
  let zoom = this.get(zoomKey);
  let frame = this.get(frameKey);
  return Object.keys(frame).reduce((zoomed, key) => {
    let value = frame[key];
    if(keys.zoomable.includes(key)) {
      value = round(value * zoom);
    }
    zoomed[key] = value;
    return zoomed;
  }, {});
}).readOnly();

export const absolute = () => computed('owner.parent.frame.absolute', 'serialized', function() {
  let parent = this.get('owner.parent.frame.absolute');
  if(!parent) {
    return;
  }
  let { x, y, width, height, rotation } = this.get('serialized');
  let result ={
    x: round(parent.x + x),
    y: round(parent.y + y),
    width,
    height,
    rotation
  };
  return result;
}).readOnly();

export const hover = () => computed('zoomed', function() {
  let frame = this.zoomed;
  return rotatedRectBounds(frame);
}).readOnly();
