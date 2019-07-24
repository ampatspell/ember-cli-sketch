import { assign } from '@ember/polyfills';
import _attr from './attr';

export default targetFn => {
  let attr = (target, opts) => _attr(targetFn(target), opts);

  let position = (target, opts) => attr(target, assign({ type: 'number', decimals: 1 }, opts));
  let size = (target, opts) => attr(target, assign({ type: 'number', min: 0, decimals: 1 }, opts));

  return {
    attr,
    position,
    size
  };
}
