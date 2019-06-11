import Edge, { frame } from '../-base';

export default Edge.extend({

  x:      frame('x', ({ x }) => x),
  y:      frame('y', ({ y, height }) => y + (height / 2)),
  length: frame('width', ({ width }) => width)

});
