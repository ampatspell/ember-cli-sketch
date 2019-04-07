import Base, { node, position, size, hidden } from './-base';

export default Base.extend({

  node: node({ type: 'sized', container: true }),

  x:      position('x'),
  y:      position('y'),
  width:  size('width', { min: 100, max: 500 }),
  height: size('height', { min: 100, max: 300 }),
  hidden: hidden('hidden'),

});
