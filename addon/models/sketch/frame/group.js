import Frame from './node';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

const calculatePosition = (sender, dimensionKey, useCache) => {
  let cacheKey = `_${dimensionKey}_cache`;
  let cached = sender[cacheKey];
  if(useCache && cached !== undefined) {
    return cached;
  }

  let value = undefined;
  sender.owner.nodes.forEach(node => {
    let frame = node._boundingFrame;
    if(frame) {
      let dimension = frame[dimensionKey];
      if(value === undefined || dimension < value) {
        value = dimension;
      }
    }
  });

  value = value || 0;

  sender[cacheKey] = value;
  return value;
};

const position = dimension => computed('owner.nodes.@each._boundingFrame', {
  get() {
    return calculatePosition(this, dimension, false);
  },
  set(key, value) {
    let current = calculatePosition(this, dimension, true);
    let delta = value - current;
    this.owner.nodes.forEach(node => {
      let { frame } = node;
      frame.set(dimension, frame[dimension] + delta);
    });
    return calculatePosition(this, dimension, false);
  }
});

const calculateSize = (sender, dimensionKey, sizeKey, useCache) => {
  let cacheKey = `_cached_${dimensionKey}_${sizeKey}`;
  let cached = sender[cacheKey];
  if(useCache && cached !== undefined) {
    return cached;
  }

  let min;
  let max;
  sender.owner.nodes.forEach(node => {
    let frame = node._boundingFrame;
    if(frame) {
      let dimension = frame[dimensionKey];
      let size = frame[sizeKey];
      if(min === undefined || min > dimension) {
        min = dimension;
      }
      if(max === undefined || max < dimension + size) {
        max = dimension + size;
      }
    }
  });

  let value = (max - min) || 0;

  sender[cacheKey] = value;
  return value;
}

const size = (dimensionKey, sizeKey) => computed('owner.nodes.@each._boundingFrame', {
  get() {
    return calculateSize(this, dimensionKey, sizeKey, false);
  },
  set(key, value) {
    let current = calculateSize(this, dimensionKey, sizeKey, true);
    let delta = value - current;
    this.owner.nodes.forEach(node => {
      let { frame } = node;
      frame.set(sizeKey, frame[sizeKey] + delta);
    });
    return calculateSize(this, dimensionKey, sizeKey, false);
  }
});

export default Frame.extend({

  x:      position('x'),
  y:      position('y'),
  width:  size('x', 'width'),
  height: size('y', 'height'),

  // TODO: this should not be serialized. node.bounding is based on normalized
  bounding: readOnly('serialized')

});
