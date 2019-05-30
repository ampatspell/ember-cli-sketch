import { computed } from '@ember/object';
import sketches from '../util/sketches';

export default fn => computed(function() {
  let { node } = this;
  let edges = fn.call(this);
  return sketches(this).factory.guidelinesEdges(node, { edges });
}).readOnly();
