import Base, { node, x, y, width, height, rotation, visible, selectable, aspect, attr, guidelines } from './-base';

export default Base.extend({

  node: node({ type: 'sized' }),

  isEditable: true,

  x:          x(),
  y:          y(),
  width:      width(),
  height:     height(),
  rotation:   rotation(),
  aspect:     aspect({ free: true }),

  visible:    visible(),
  selectable: selectable(),
  guidelines: guidelines(),

  fill:     attr('fill', { initial: null }),
  color:    attr('color'),
  opacity:  attr('opacity', { type: 'number', min: 0, max: 1, decimals: 2 }),

  text:       attr('text', { type: 'string' }),
  fontFamily: attr('fontFamily', { type: 'string', initial: 'Ubuntu Mono' }),
  fontWeight: attr('fontWeight', { type: 'number', initial: 400 }),
  fontSize:   attr('fontSize', { type: 'number', initial: 16, min: 10, max: 96 }),
  fontStyle:  attr('fontStyle', { type: 'string', initial: 'normal' }),
  padding:    attr('padding', { type: 'number', initial: 0, min: 0 }),

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
  hasVerticalAlign: true,
  hasPadding: true,

});
