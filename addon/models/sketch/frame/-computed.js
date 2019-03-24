import { computed } from '@ember/object';
import { round } from '../../../util/math';

let r = value => round(value, 2);

export const serialized = keys => computed(...keys, function() {
  return this.getProperties(keys);
}).readOnly();

export const zoomed = (zoomKey, frameKey) => computed(zoomKey, frameKey, function() {
  let zoom = this.get(zoomKey);
  let frame = this[frameKey];

  if(!frame) {
    return;
  }

  let hash = {};
  for(let key in frame) {
    if(key === 'rotation') {
      hash[key] = frame[key];
    } else {
      hash[key] = round(frame[key] * zoom, 2);
    }
  }

  return hash;
}).readOnly();

export const rotated = key => computed(key, function() {
  let frame = this[key];

  if(!frame) {
    return;
  }

  let { x, y, width, height, rotation } = frame;

  if(!rotation) {
    return frame;
  }

  let points = [
    { x,            y },
    { x: x + width, y },
    { x,            y: y + height},
    { x: x + width, y: y + height },
  ];

  let rad = rotation * (Math.PI / 180);
  let cos = Math.cos(rad);
  let sin = Math.sin(rad);

  let min = points[0];
  let max = points[3];

  let pivot = {
    x: max.x - ((max.x - min.x) / 2),
    y: max.y - ((max.y - min.y) / 2),
  };

  let rotate = point => ({
    x: (cos * (point.x - pivot.x)) - (sin * (point.y - pivot.y)) + pivot.x,
    y: (sin * (point.x - pivot.x)) + (cos * (point.y - pivot.y)) + pivot.y
  });

  let box = {
    min: {
      x: Number.POSITIVE_INFINITY,
      y: Number.POSITIVE_INFINITY,
    },
    max: {
      x: Number.NEGATIVE_INFINITY,
      y: Number.NEGATIVE_INFINITY,
    }
  };

  points.forEach(point => {
    let rotated = rotate(point);
    box.min.x = Math.min(box.min.x, rotated.x);
    box.min.y = Math.min(box.min.y, rotated.y);
    box.max.x = Math.max(box.max.x, rotated.x);
    box.max.y = Math.max(box.max.y, rotated.y);
  });

  return {
    x:      r(box.min.x),
    y:      r(box.min.y),
    width:  r(box.max.x - box.min.x),
    height: r(box.max.y - box.min.y)
  };
}).readOnly();

export const absolute = (frameKey, props) => {
  let parentKey = 'owner.parent.frame.absoluteZoomed';
  return computed(frameKey, parentKey, function() {
    let frame = this.get(frameKey);
    let parent = this.get(parentKey);
    if(!parent) {
      return frame;
    }
    let result = {};
    props.forEach(key => {
      if([ 'x', 'y' ].includes(key)) {
        result[key] = r(frame[key] + parent[key]);
      } else {
        result[key] = r(frame[key]);
      }
    });
    return result;
  }).readOnly();
};

export const bounds = (targetKey, frameKey) => computed(`${targetKey}.@each.${frameKey}`, function() {
  let nodes = this.get(targetKey);

  let box = {
    min: {
      x: Number.POSITIVE_INFINITY,
      y: Number.POSITIVE_INFINITY,
    },
    max: {
      x: Number.NEGATIVE_INFINITY,
      y: Number.NEGATIVE_INFINITY,
    }
  };

  nodes.forEach(node => {
    let frame = node[frameKey];
    box.min.x = Math.min(box.min.x, frame.x);
    box.min.y = Math.min(box.min.y, frame.y);
    box.max.x = Math.max(box.max.x, frame.x + frame.width);
    box.max.y = Math.max(box.max.y, frame.y + frame.height);
  });

  return {
    x: box.min.x,
    y: box.min.y,
    width: box.max.x - box.min.x,
    height: box.max.y - box.min.y
  };
}).readOnly();
