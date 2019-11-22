import { style as _style, className, fontLoader, editing } from '../-computed';
import { typeOf } from '@ember/utils';

export {
  className,
  fontLoader,
  editing
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
