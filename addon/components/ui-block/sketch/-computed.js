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

  let string =  `transform: translate(${r(x)}px, ${r(y)}px)`;

  if(rotation !== undefined) {
    let rotate = `rotate(${rotation}deg)`;
    string = `${string} ${rotate}`;
  }

  if(width !== undefined && height !== undefined) {
    let size = `width: ${r(width)}px; height: ${r(height)}px`;
    string = `${string}; ${size}`;
  }

  return htmlSafe(string);
}

export const frame = (nodeKey, frameKey, opts={}) => computed(`${nodeKey}.frame.${frameKey}`, function() {
  let frame = this.get(`${nodeKey}.frame`);
  if(!frame) {
    return;
  }
  return frameToString(frame.get(frameKey), opts);
}).readOnly();
