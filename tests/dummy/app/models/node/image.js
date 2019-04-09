import Base, { node, position, size, rotation, visible, selectable, aspect, attr } from './-base';

export default Base.extend({

  node: node({ type: 'sized' }),

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
  hasUrl: true,

  // update(props) {
  //   console.log(props);
  //   this._super(props);
  //   let aspect = 2/3;
  //   let { width, height } = this;
  //   let h = Math.ceil(width * aspect);
  //   if(height !== h) {
  //     this.update({ height: h });
  //   }
  // }

});
