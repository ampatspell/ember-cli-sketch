import { assign } from '@ember/polyfills';

let {
  min,
  max
} = Math;

const c_180divPI = 180 / Math.PI;
const c_PIdiv180 = Math.PI / 180;

export const radToDeg = rad => rad * c_180divPI;
export const degToRad = deg => deg * c_PIdiv180;

export const round = (value, decimals=2) => {
  if(!value) {
    return value;
  }
  value = value.toFixed(decimals + 1);
  return Number(Math.round(`${value}e${decimals}`) + `e-${decimals}`);
};

export const numberConstraints = opts => value => {
  if(typeof value !== 'number' || isNaN(value)) {
    return opts.initial;
  }

  value = round(value, opts.decimals || 0);

  if(opts.min !== undefined) {
    value = max(value, opts.min);
  }

  if(opts.max !== undefined) {
    value = min(value, opts.max);
  }

  return value;
};

export const rotatedRectBounds = frame => {
  if(!frame) {
    return;
  }

  let { x, y, width, height, rotation } = frame;

  if(!rotation) {
    return assign({}, frame);
  }

  let points = [
    { x,            y },
    { x: x + width, y },
    { x,            y: y + height},
    { x: x + width, y: y + height },
  ];

  let rad = degToRad(rotation);
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
    x:      box.min.x,
    y:      box.min.y,
    width:  box.max.x - box.min.x,
    height: box.max.y - box.min.y,
    rotation: 0
  };
}

export const rotatePosition = ({ x, y }, frame, rotation) => {
  let center = {
    x: frame.x + (frame.width / 2),
    y: frame.y + (frame.height / 2)
  };

  let rad = degToRad(rotation);
  let cos = Math.cos(rad);
  let sin = Math.sin(rad);

  let r = value => round(value, 0);

  let point = {
    x: r(cos * (x - center.x) - sin * (y - center.y) + center.x),
    y: r(sin * (x - center.x) + cos * (y - center.y) + center.y)
  };

  return point;
}

export const millimetersToPixels = mm => mm / 25.4 * 96;
