import Frame from './node';
import bounding from './-bounding';

const {
  position,
  size
} = bounding('nodes', '_boundingFrame');

export default Frame.extend({

  x:      position('x'),
  y:      position('y'),
  width:  size('x', 'width'),
  height: size('y', 'height'),

});
