import Edge, { frame } from '../-base';

export default Edge.extend({

  x:      frame('x', ({ x, width }) => x + width),
  y:      frame('y', ({ y }) => y),
  length: frame('height', ({ height }) => height)

});
