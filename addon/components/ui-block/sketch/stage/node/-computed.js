import { style as _style } from '../../-computed';
import { typeOf } from '@ember/utils';

export const style = (...deps) => {
  let fn = deps.pop();
  return _style('frame', ...deps, function() {
    let { frame } = this;
    let results = fn.call(this, this);
    if(typeOf(results) !== 'array') {
      results = [ results ];
    }
    return [ frame, ...results ];
  });
};
