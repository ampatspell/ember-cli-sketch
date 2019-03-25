import { computed } from '@ember/object';
import { compact } from '../../../util/object';

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
      value = value * zoom;
    }
    zoomed[key] = value;
    return zoomed;
  }, {});
}).readOnly();
