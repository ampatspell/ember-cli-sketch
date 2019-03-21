import { computed } from '@ember/object';

const calculatePosition = (sender, dimensionKey, arrayKey, nestedKey, useCache) => {
  let cacheKey = `_${dimensionKey}_cache`;
  let cached = sender[cacheKey];
  if(useCache && cached !== undefined) {
    return cached;
  }

  let value = undefined;
  sender.owner[arrayKey].forEach(node => {
    let frame = node[nestedKey];
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

const position = (arrayKey, nestedKey) => dimension => computed(`owner.${arrayKey}.@each.${nestedKey}`, {
  get() {
    return calculatePosition(this, dimension, arrayKey, nestedKey, false);
  },
  set(key, value) {
    let current = calculatePosition(this, dimension, arrayKey, nestedKey, true);
    let delta = value - current;
    this.owner[arrayKey].forEach(node => {
      let { frame } = node;
      frame.set(dimension, frame[dimension] + delta);
    });
    return calculatePosition(this, dimension, arrayKey, nestedKey, false);
  }
});

const calculateSize = (sender, dimensionKey, sizeKey, arrayKey, nestedKey, useCache) => {
  let cacheKey = `_cached_${dimensionKey}_${sizeKey}`;
  let cached = sender[cacheKey];
  if(useCache && cached !== undefined) {
    return cached;
  }

  let min;
  let max;
  sender.owner[arrayKey].forEach(node => {
    let frame = node[nestedKey];
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

const size = (arrayKey, nestedKey) => (dimensionKey, sizeKey) => computed(`owner.${arrayKey}.@each.${nestedKey}`, {
  get() {
    return calculateSize(this, dimensionKey, sizeKey, arrayKey, nestedKey, false);
  },
  set(key, value) {
    let current = calculateSize(this, dimensionKey, sizeKey, arrayKey, nestedKey, true);
    let delta = value - current;
    this.owner[arrayKey].forEach(node => {
      let { frame } = node;
      frame.set(sizeKey, frame[sizeKey] + delta);
    });
    return calculateSize(this, dimensionKey, sizeKey, arrayKey, nestedKey, false);
  }
});

export default (arrayKey, nestedKey) => ({
  position: position(arrayKey, nestedKey),
  size: size(arrayKey, nestedKey)
});
