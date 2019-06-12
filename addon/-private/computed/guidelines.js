import { computed } from '@ember/object';
import sketches from '../util/sketches';

export default recompute => computed(function() {
  let factory = sketches(this).factory;
  return factory.nodeGuidelines(this.node, { recompute });
}).readOnly();
