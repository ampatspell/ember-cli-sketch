import Base from './-base';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { sketches } from '../../services/sketches';
import { assign } from '@ember/polyfills';
import { round } from '../../util/math';
import { constrainedNumber } from '../../util/computed';

export const frame = (type='node') => computed(function() {
  return sketches(this).factory.stage.frame(type, this);
}).readOnly();

const keys = Object.freeze([ 'x', 'y', 'width', 'height', 'rotation' ]);

const zoomed = key => computed(key, '_stage.zoom', function() {
  let { _stage } = this;

  if(!_stage) {
    return;
  }

  let serialized = this[key];
  let { zoom } = _stage;
  let { rotation } = serialized;

  let z = key => serialized[key] * zoom;

  return {
    x:      z('x'),
    y:      z('y'),
    width:  z('width'),
    height: z('height'),
    rotation
  };
}).readOnly();

const constrained = opts => constrainedNumber(opts);

export const constraints = {
  position: {
    initial: 0,
    decimals: 2
  },
  size: {
    initial: 0,
    min: 0,
    decimals: 2
  },
  rotation: {
    initial: 0,
    min: -360,
    max: 360,
    decimals: 2
  }
};

export default Base.extend({

  owner: null,

  x:        constrained(constraints.position),
  y:        constrained(constraints.position),
  width:    constrained(constraints.size),
  height:   constrained(constraints.size),
  rotation: constrained(constraints.rotation),

  _stage: readOnly('owner.stage'),

  serialized: computed('x', 'y', 'width', 'height', 'rotation', function() {
    let { x, y, width, height, rotation } = this;
    return { x, y, width, height, rotation };
  }),

  bounding: computed('serialized', function() {
    let { serialized: { x, y, width, height, rotation } } = this;

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

    let r = value => round(value, 2);

    return {
      x:      r(box.min.x),
      y:      r(box.min.y),
      width:  r(box.max.x - box.min.x),
      height: r(box.max.y - box.min.y),
      rotation: 0
    };
  }).readOnly(),

  zoomed: zoomed('serialized'),
  zoomedBounding: zoomed('bounding'),

  deltaToFrame(props) {
    let values = {};
    keys.forEach(key => {
      let value = props[key];
      if(value !== undefined) {
        values[key] = this[key] + props[key];
      } else {
        values[key] = this[key];
      }
    });
    return values;
  },

  update(props, opts) {
    let { delta } = assign({ delta: false }, opts);
    if(delta) {
      let values = this.deltaToFrame(props);
      this.setProperties(values);
    } else {
      this.setProperties(props);
    }
  },

  includesPosition({ x, y }) {
    let { serialized: frame } = this;
    return frame.x <= x && frame.y <= y && frame.x + frame.width >= x && frame.y + frame.height >= y;
  },

  includesFrame({ x, y, width, height }) {
    let { serialized: frame } = this;
    return x >= frame.x && y >= frame.y && x + width <= frame.x + frame.width && y + height <= frame.y + frame.height;
  }

});
