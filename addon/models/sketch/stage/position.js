import Base from '../-base';
import { computed } from '@ember/object';
import { sketches } from '../../../services/sketches';
import { assign } from '@ember/polyfills';

export const position = () => computed(function() {
  return sketches(this).factory.stage.position();
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
  }

});
