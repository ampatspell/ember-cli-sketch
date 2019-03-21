import Base from './-base';

import { omit } from '../../util/object';

const split = opts => {
  if(!opts) {
    return {};
  }
  let { frame } = opts;
  let props = omit(opts, [ 'frame' ]);
  return { frame, props };
};

export default Base.extend({

  prepare(opts) {
    let { frame, props } = split(opts);
    if(frame) {
      this.frame.prepare(frame);
    }
    this._super(props);
  }

});
