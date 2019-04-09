import Base, { node, position, size, rotation, visible, selectable, aspect, attr, prop } from './-base';

const didSetHeight = (value, { aspect }) => {
  let width = value / aspect;
  return { width };
}

const didSetWidth = (value, { aspect }) => {
  let height = value * aspect;
  return { height };
}

const didSetAspect = (value, _, model) => {
  let width = model.height / value;
  let height = width * value;
  return { height, width };
}

export default Base.extend({

  node: node({ type: 'sized' }),

  x:          position('x'),
  y:          position('y'),
  aspect:     aspect('aspect', { changed: didSetAspect }),
  width:      size('width',  { inverse: prop('height'), aspect: prop('aspect'), changed: didSetWidth }),
  height:     size('height', { inverse: prop('width'),  aspect: prop('aspect'), changed: didSetHeight }),
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
