import { computed } from '@ember/object';
import sketches from '../util/sketches';
import { assign } from '@ember/polyfills';

export default opts => computed(function() {
  opts = assign({}, opts);

  let build = direction => {
    let fn = opts[direction];
    return (fn && fn.call(this)) || [];
  };

  let horizontal = build('horizontal');
  let vertical   = build('vertical');

  return sketches(this).factory.guidelinesEdges(this.node, { horizontal, vertical });
}).readOnly();
