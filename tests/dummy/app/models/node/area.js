import Base, { node, position, size } from './-base';

export default Base.extend({

  node: node({ type: 'sized', container: true }),

  x:      position('x'),
  y:      position('y'),
  width:  size('width'),
  height: size('height'),

});
