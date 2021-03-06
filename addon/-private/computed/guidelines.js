import { computed } from '@ember/object';
import sketches from '../util/sketches';

export default (type='basic', opts) => computed(function() {
  let factory = sketches(this).factory;
  return factory.nodeGuidelines(this.node, type, opts);
}).readOnly();
