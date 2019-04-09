import Base, { node, x, y, rotation, visible, selectable, attr } from './-base';
import { width, height, aspect } from './-aspect';

export default Base.extend({

  node: node({ type: 'sized' }),

  x:          x(),
  y:          y(),
  width:      width(),
  height:     height(),
  aspect:     aspect(),
  rotation:   rotation(),

  visible:    visible(),
  selectable: selectable(),

  opacity:  attr('opacity', { type: 'number', min: 0, max: 1, decimals: 2 }),
  url:  attr('url', { type: 'string' }),

  hasAspect: true,
  hasRotation: true,
  hasOpacity: true,
  hasUrl: true

});
