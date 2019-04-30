import { style as _style, className, fontLoader } from '../-computed';
import { typeOf } from '@ember/utils';

export {
  className,
  fontLoader
};

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
