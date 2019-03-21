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

const constraint = () => computed(function() {
  return sketches(this).factory.stage.constraint(this);
}).readOnly();

export default Base.extend({

  width: constraint(),
  height: constraint(),

  prepare(opts) {
    let { width, height, props } = opts;
    this._super(props);
    if(width) {
      this.width.setProperties(width);
    }
    if(height) {
      this.height.setProperties(height);
    }
  }

});
