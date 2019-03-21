import Base from '../-base';
import { computed } from '@ember/object';
import { sketches } from '../../../services/sketches';
import { omit } from '../../../util/object';

const split = opts => {
  if(!opts) {
    return {};
  }
  let { width, height } = opts;
  let props = omit(opts, [ 'width', 'height' ]);
  return { width, height, props };
};

export const constraints = () => computed(function() {
  return sketches(this).factory.stage.constraints(this);
}).readOnly();

const constraint = (dimension, size) => computed(function() {
  return sketches(this).factory.stage.constraint(this, { dimension, size });
}).readOnly();

export default Base.extend({

  owner: null,

  width:  constraint('x', 'width'),
  height: constraint('y', 'height'),

  prepare(opts) {
    let { width, height, props } = split(opts);
    this._super(props);
    if(width) {
      this.width.setProperties(width);
    }
    if(height) {
      this.height.setProperties(height);
    }
  },

  apply(current, next) {
    this.width.apply(current, next);
    this.height.apply(current, next);
    return next;
  }

});
