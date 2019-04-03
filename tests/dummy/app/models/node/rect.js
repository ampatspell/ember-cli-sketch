import Base, { node, position, size, rotation, attr } from './-base';

export default Base.extend({

  node: node({ type: 'sized' }),

  x:        position('x'),
  y:        position('y'),
  width:    size('width'),
  height:   size('height'),
  rotation: rotation('rotation'),

  fill:     attr('fill'),
  opacity:  attr('opacity', { type: 'number', min: 0, max: 1, decimals: 2 }),

  hasRotation: true,
  hasFill: true,
  hasOpacity: true,

});
