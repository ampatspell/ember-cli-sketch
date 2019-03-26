import { computed } from '@ember/object';
import { typeOf } from '@ember/utils';
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

export const frameToObject = (frame, opts={}) => {
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

  let hash = {};

  hash.transform = `translate(${r(x)}px, ${r(y)}px)`;

  if(rotation !== undefined) {
    hash.transform += ` rotate(${rotation}deg)`;
  }

  if(width !== undefined && height !== undefined) {
    hash.width = `${r(width)}px`;
    hash.height = `${r(height)}px`;
  }

  return hash;
}

export const frame = (nodeKey, frameKey, opts={}) => computed(`${nodeKey}.{index,frame.${frameKey}}`, function() {
  let node = this.get(nodeKey);
  if(!node) {
    return;
  }
  let hash = {};
  if(opts.index !== false) {
    hash['z-index'] = node.index;
  }
  let frame = this.get(`${nodeKey}.frame`);
  if(frame) {
    hash = assign(hash, frameToObject(frame.get(frameKey), opts));
  }
  return hash;
}).readOnly();

export const style = (...deps) => {
  let fn = deps.pop();
  return computed(...deps, function() {
    let hash = fn.call(this, this);
    if(!hash) {
      return;
    }
    if(typeOf(hash) === 'array') {
      hash = hash.reduce((result, hash) => {
        result = assign(result, hash);
        return result;
      }, {});
    }
    let array = Object.keys(hash).reduce((array, key) => {
      let value = hash[key];
      if(value !== undefined) {
        array.push(`${key}: ${value}`);
      }
      return array;
    }, []);
    return htmlSafe(array.join('; '));
  }).readOnly();
};
