import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { assign } from '@ember/polyfills';
import { round } from '../../../util/math';

const normalizeInset = inset => {
  if(typeof inset !== 'object') {
    return {
      x: inset,
      y: inset,
      width: -inset * 2,
      height: -inset * 2
    };
  }
  return inset;
}

export const frameToString = (frame, opts={}) => {
  if(!frame) {
    return;
  }

  if(opts.inset) {
    let inset = normalizeInset(opts.inset);
    frame = assign({}, frame);
    for(let key in inset) {
      frame[key] += inset[key];
    }
  }

  let { x, y, width, height, rotation } = frame;

  let r = value => round(value, 0);
  x      = r(x);
  y      = r(y);
  width  = r(width);
  height = r(height);

  return htmlSafe(`width: ${width}px; height: ${height}px; transform: translate(${x}px, ${y}px) rotate(${rotation}deg)`);
}

export const frame = (nodeKey, frameKey, opts={}) => computed(`${nodeKey}.frame.${frameKey}.{x,y,width,height}`, function() {
  let node = this.get(nodeKey);
  if(!node) {
    return;
  }
  let frame = node.get(`frame.${frameKey}`);
  return frameToString(frame, opts);
}).readOnly();
