import Base from '../-base';
import { computed } from '@ember/object';
import { sketches } from '../../../services/sketches';
import { assign } from '@ember/polyfills';
import { round } from '../../../util/math';

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
    let { renderer: { size }, zoom, areas: { frame: { serialized: frame } } } = this.owner;

    if(!size) {
      return;
    }

    let dimension = (sizeKey, dimensionKey) => {
      let value = opts[dimensionKey];
      if(value) {
        return value;
      }
      return round((size[sizeKey] / 2) - ((frame[sizeKey] * zoom) / 2) - (frame[dimensionKey] * zoom), 0);
    }

    let position = {
      x: dimension('width', 'x'),
      y: dimension('height', 'y')
    };

    this.setProperties(position);
  },

  fit(opts={}) {
    let { offset } = assign({ offset: 10 }, opts);
    let { renderer: { size }, areas: { frame: { serialized: frame } } } = this.owner;

    if(!size) {
      return;
    }

    let value = dimension => round((size[dimension] - (offset * 2)) / frame[dimension], 2);

    let zoom = Math.min(value('width'), value('height'));
    this.owner.setProperties({ zoom });

    this.center();
  }

});
