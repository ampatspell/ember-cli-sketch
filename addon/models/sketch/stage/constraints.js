import Base from '../-base';
import { computed } from '@ember/object';
import { sketches } from '../../../services/sketches';
import { omit } from '../../../util/object';

const split = opts => {
  if(!opts) {
    return {};
  }
  let { horizontal, vertical } = opts;
  let props = omit(opts, [ 'horizontal', 'vertical' ]);
  return { horizontal, vertical, props };
};

export const constraints = () => computed(function() {
  return sketches(this).factory.stage.constraints(this);
}).readOnly();

const constraint = (position, size) => computed(function() {
  return sketches(this).factory.stage.constraint(this, { position, size });
}).readOnly();

export default Base.extend({

  owner: null,

  horizontal: constraint('x', 'width'),
  vertical:   constraint('y', 'height'),

  prepare(opts) {
    let { horizontal, vertical, props } = split(opts);
    this._super(props);
    horizontal && this.horizontal.setProperties(horizontal);
    vertical && this.vertical.setProperties(vertical);
  }

});
