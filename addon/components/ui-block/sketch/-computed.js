import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { assign } from '@ember/polyfills';

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

  let string =  `transform: translate(${x}px, ${y}px)`;

  if(rotation !== undefined) {
    let rotate = `rotate(${rotation}deg)`;
    string = `${string} ${rotate}`;
  }

  if(width !== undefined && height !== undefined) {
    let size = `width: ${width}px; height: ${height}px`;
    string = `${string}; ${size}`;
  }

  return htmlSafe(string);
}

export const frame = (nodeKey, frameKey, opts={}) => computed(`${nodeKey}.frame.${frameKey}`, function() {
  let frame = this.get(`${nodeKey}.frame`);
  if(!frame) {
    return;
  }
  if(!frame.exists && !opts.virtual) {
    return;
  }
  return frameToString(frame.get(frameKey), opts);
}).readOnly();
