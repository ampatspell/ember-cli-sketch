import Edge, { frame } from '../-base';

export default Edge.extend({

  x:      frame('x', 'width', ({ x, width }) => x + (width / 2)),
  y:      frame('y', ({ y }) => y),
  length: frame('height', ({ height }) => height)

});
