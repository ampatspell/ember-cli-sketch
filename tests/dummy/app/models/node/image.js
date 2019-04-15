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

  opacity:  attr('opacity', { type: 'number', min: 0, max: 1, decimals: 2 }),
  url:  attr('url', { type: 'string' }),

  hasAspect: true,
  hasRotation: true,
  hasOpacity: true,
  hasUrl: true

});
