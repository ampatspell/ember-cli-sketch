import { computed } from '@ember/object';
import sketches from '../util/sketches';
// import { assign } from '@ember/polyfills';

export default recompute => computed(function() {
  // opts = assign({}, opts);
  // let build = direction => {
  //   let fn = opts[direction];
  //   let names = (fn && fn.call(this)) || [];
  //   return names.map(name => `${direction}/${name}`);
  // };

  // let edges = [ ...build('horizontal'), ...build('vertical' )];

  let factory = sketches(this).factory;
  return factory.guidelinesEdges(this.node, { recompute });
}).readOnly();
