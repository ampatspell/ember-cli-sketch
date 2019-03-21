import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { sketches } from '../../services/sketches';
import { assign } from '@ember/polyfills';
import { round } from '../../util/math';

export const frame = (type='node') => computed(function() {
  return sketches(this).factory.stage.frame(type, this);
}).readOnly();

const sizeKeys = Object.freeze([ 'width', 'height' ]);

export default EmberObject.extend({

  owner: null,

  x: 0,
  y: 0,
  width: 0,
  height: 0,
  rotation: 0,

  stage: readOnly('owner.stage'),

  serialized: computed('x', 'y', 'width', 'height', 'rotation', function() {
    let { x, y, width, height, rotation } = this;
    return { x, y, width, height, rotation };
  }),

  zoomed: computed('serialized', 'stage.zoom', function() {
    let { stage, serialized, serialized: { rotation } } = this;
    if(!stage) {
      return;
    }

    let { zoom } = stage;

    let z = key => serialized[key] * zoom;

    return {
      x:      z('x'),
      y:      z('y'),
      width:  z('width'),
      height: z('height'),
      rotation
    };
  }).readOnly(),

  prepare(props) {
    this.setProperties(props);
  },

  update(props, opts) {
    let { delta } = assign({ delta: false }, opts);
    if(delta) {
      let values = {};
      for(let key in props) {
        values[key] = round(this[key] + props[key], 2);
        if(sizeKeys.includes(key)) {
          values[key] = Math.max(values[key], 0);
        }
      }
      this.setProperties(values);
    } else {
      this.setProperties(props);
    }
  },

  convertToLocalPosition({ x, y }) {
    let { normalized } = this;
    return {
      x: x - normalized.x,
      y: y - normalized.y
    };
  },

  includesAbsolutePosition({ x, y }) {
    let { bounding: frame } = this;
    return frame.x <= x && frame.y <= y && frame.x + frame.width >= x && frame.y + frame.height >= y;
  }

});
