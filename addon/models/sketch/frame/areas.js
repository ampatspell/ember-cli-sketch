import Frame from './node';
import bounding from './-bounding';

const {
  position,
  size
} = bounding('all', '_serializedFrame');

export default Frame.extend({

  x:      position('x'),
  y:      position('y'),
  width:  size('x', 'width'),
  height: size('y', 'height')

});
