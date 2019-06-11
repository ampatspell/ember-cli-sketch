import Edge, { frame } from '../-base';

export default Edge.extend({

  x:      frame('x', ({ x }) => x),
  y:      frame('y', ({ y }) => y),
  length: frame('width', ({ width }) => width)

});
