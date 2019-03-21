import Base from '../-base';
import { computed } from '@ember/object';
import { sketches } from '../../../services/sketches';
import { assign } from '@ember/polyfills';

export const position = () => computed(function() {
  return sketches(this).factory.stage.position(this);
}).readOnly();

export default Base.extend({

  x: 0,
  y: 0,

  update(props, opts) {
    let { delta } = assign({ delta: false }, opts);
    if(delta) {
      let values = {};
      for(let key in props) {
        values[key] = this[key] + props[key];
      }
      this.setProperties(values);
    } else {
      this.setProperties(props);
    }
  },

  center(opts={}) {
    let { renderer: { size }, areas: { frame: { serialized: frame } } } = this.owner;

    if(!size) {
      return;
    }

    let dimension = (sizeKey, dimensionKey) => {
      let value = opts[dimensionKey];
      if(value) {
        return value;
      }
      return (size[sizeKey] / 2) - (frame[sizeKey] / 2) - frame[dimensionKey];
    }

    let position = {
      x: dimension('width', 'x'),
      y: dimension('height', 'y')
    };

    this.setProperties(position);
  },

});
