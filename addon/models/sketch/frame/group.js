import Frame from './node';
import { readOnly } from '@ember/object/computed';
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

  // TODO: this should not be serialized. node.bounding is based on normalized
  bounding: readOnly('serialized')

});
