import Base, { node, position, size, rotation, hidden, attr } from './-base';

export default Base.extend({

  node: node({ type: 'sized' }),

  x:        position('x'),
  y:        position('y'),
  width:    size('width'),
  height:   size('height'),
  rotation: rotation('rotation'),
  hidden:   hidden('hidden'),

  opacity:  attr('opacity', { type: 'number', min: 0, max: 1, decimals: 2 }),
  url:  attr('url', { type: 'string' }),

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
