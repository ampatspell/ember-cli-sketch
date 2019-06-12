import { computed } from '@ember/object';
import sketches from '../util/sketches';

export default recompute => computed(function() {
  let factory = sketches(this).factory;
  return factory.guidelinesEdges(this.node, { recompute });
}).readOnly();
