import Base, { node, x, y, width, height, rotation, visible, selectable, aspect, attr, edges } from './-base';

export default Base.extend({

  node: node({ type: 'sized' }),

  x:          x(),
  y:          y(),
  width:      width(),
  height:     height(),
  rotation:   rotation(),
  aspect:     aspect({ initial: null }),

  visible:    visible(),
  selectable: selectable(),

  fill:     attr('fill'),
  opacity:  attr('opacity', { type: 'number', min: 0, max: 1, decimals: 2 }),

  edges: edges(),

  hasRotation: true,
  hasFill: true,
  hasOpacity: true

});
