import Base from './-base';
import { assign } from '@ember/polyfills';
import { omit } from '../../util/object';
import { constraints } from './stage/constraints';

const split = opts => {
  if(!opts) {
    return {};
  }
  let { frame, constraints } = opts;
  let props = omit(opts, [ 'frame', 'constraints' ]);
  return { frame, constraints, props };
};

export default Base.extend({

  constraints: constraints(),

  prepare(opts) {
    let { frame, constraints, props } = split(opts);
    if(frame) {
      this.frame.prepare(frame);
    }
    if(constraints) {
      this.constraints.prepare(assign({ owner: this }, constraints));
    }
    this._super(props);
  }

});
