import Base, { node, doc } from './-base';

export default Base.extend({

  node: node({ type: 'sized' }),

  x:      doc('x'),
  y:      doc('y'),
  width:  doc('width'),
  height: doc('height'),

});
