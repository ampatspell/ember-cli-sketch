import Base, { node, position, size, rotation, visible, selectable, aspect, attr } from './-base';

export default Base.extend({

  node: node({ type: 'aspect' }),

  x:          position('x'),
  y:          position('y'),
  width:      size('width'),
  height:     size('height'),
  aspect:     aspect('aspect'),
  rotation:   rotation('rotation'),
  visible:    visible('visible'),
  selectable: selectable('selectable'),

  opacity:  attr('opacity', { type: 'number', min: 0, max: 1, decimals: 2 }),
  url:  attr('url', { type: 'string' }),

  hasAspect: true,
  hasRotation: true,
  hasOpacity: true,
  hasUrl: true

});
