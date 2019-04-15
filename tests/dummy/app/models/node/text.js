import Base, { node, x, y, width, height, rotation, visible, selectable, aspect, attr } from './-base';

export default Base.extend({

  node: node({ type: 'sized' }),

  x:          x(),
  y:          y(),
  width:      width(),
  height:     height(),
  rotation:   rotation(),
  aspect:     aspect(),

  visible:    visible(),
  selectable: selectable(),

  fill:     attr('fill', { initial: null }),
  color:    attr('color'),
  opacity:  attr('opacity', { type: 'number', min: 0, max: 1, decimals: 2 }),

  text:       attr('text', { type: 'string' }),
  fontFamily: attr('fontFamily', { type: 'string', initial: 'Ubuntu Mono' }),
  fontWeight: attr('fontWeight', { type: 'number', initial: 400 }),
  fontSize:   attr('fontSize', { type: 'number', initial: 16, min: 10, max: 96 }),
  fontStyle:  attr('fontStyle', { type: 'string', initial: 'normal' }),

  align:         attr('align', { type: 'string', initial: 'left' }),
  verticalAlign: attr('verticalAlign', { type: 'string', initial: 'top' }),

  hasRotation: true,
  hasFill: true,
  hasColor: true,
  hasOpacity: true,
  hasText: true,
  hasFontFamily: true,
  hasFontWeight: true,
  hasFontSize: true,
  hasFontStyle: true,
  hasAlign: true,
  hasVerticalAlign: true

});
