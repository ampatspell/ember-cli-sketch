import Base, { node, position, size, rotation, attr } from './-base';

export default Base.extend({

  node: node({ type: 'sized' }),

  x:        position('x'),
  y:        position('y'),
  width:    size('width'),
  height:   size('height'),
  rotation: rotation('rotation'),

  fill:     attr('fill', { initial: null }),
  color:    attr('color'),
  opacity:  attr('opacity', { type: 'number', min: 0, max: 1, decimals: 2 }),

  text:       attr('text', { type: 'string' }),
  fontFamily: attr('fontFamily', { type: 'string', initial: 'Ubuntu Mono' }),
  fontWeight: attr('fontWeight', { type: 'number', initial: 400 }),
  fontSize:   attr('fontSize', { type: 'number', initial: 16, min: 10, max: 96 }),

  hasRotation: true,
  hasFill: true,
  hasColor: true,
  hasOpacity: true,
  hasText: true,
  hasFontFamily: true,
  hasFontWeight: true,
  hasFontSize: true,

});
