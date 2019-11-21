import { computed } from '@ember/object';
import { typeOf } from '@ember/utils';
import { htmlSafe, dasherize } from '@ember/string';
import { assign } from '@ember/polyfills';
import sketches from '../../../../-private/util/sketches';

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

  let hash = {};

  hash.transform = `translate(${x}px, ${y}px)`;

  if(rotation !== undefined) {
    hash.transform += ` rotate(${rotation}deg)`;
  }

  if(width !== undefined && height !== undefined) {
    hash.width = `${width}px`;
    hash.height = `${height}px`;
  }

  return hash;
}

export const frame = (modelKey, frameKey, opts={}) => computed(`${modelKey}.node.{index,frame.${frameKey}}`, function() {
  let node = this.get(`${modelKey}.node`);
  if(!node) {
    return;
  }
  let hash = {};
  if(opts.index !== false) {
    hash['z-index'] = node.index;
  }
  let frame = node.frame;
  if(frame) {
    hash = assign(hash, frameToObject(frame.get(frameKey), opts));
  }
  return hash;
}).readOnly();

export const objectToStyle = hash => {
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
    if(value !== undefined && value !== null && value !== '') {
      array.push(`${dasherize(key)}: ${value}`);
    }
    return array;
  }, []);

  return htmlSafe(array.join('; '));
}

export const style = (...deps) => {
  let fn = deps.pop();
  return computed(...deps, function() {
    let hash = fn.call(this, this);
    return objectToStyle(hash);
  }).readOnly();
};

export const attribute = (modelKey, attribute, required=true) => computed(modelKey, function() {
  let model = this.get(modelKey);
  if(!model) {
    return;
  }
  return model.node.attributes.attribute(attribute, required);
}).readOnly();

export const className = (valueKey, prefix) => computed(valueKey, function() {
  let value = this.get(valueKey);
  if(!value) {
    return;
  }
  return `${prefix}-${value}`;
}).readOnly();

export const fontLoader = (...deps) => {
  let fn = deps.pop();
  return computed(...deps, function() {
    let opts = fn.call(this, this);
    if(!opts) {
      return;
    }
    return sketches(this).fonts.loader(opts);
  }).readOnly();
}

export const editing = modelKey => computed(`${modelKey}.stage.node.tools.selected.{type,node}`, function() {
  let model = this.get(modelKey);
  if(!model) {
    return;
  }
  let { node, stage } = model;
  let tool = stage.node.tools.selected;
  if(tool.type !== 'node/edit') {
    return false;
  }
  if(tool.node !== node) {
    return false;
  }
  return true;
}).readOnly();
