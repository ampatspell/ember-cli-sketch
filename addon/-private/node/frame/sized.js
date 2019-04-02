import Frame, { model } from './-base';
import { serialized } from '../../util/computed';
import { zoomed, rotated, absolute } from './-computed';

const keys = [ 'x', 'y', 'width', 'height', 'rotation' ];

export default Frame.extend({

  x:        model('x'),
  y:        model('y'),
  width:    model('width'),
  height:   model('height'),
  rotation: model('rotation'),

  properties:     serialized(keys),
  rotated:        rotated('properties'),
  zoomed:         zoomed('properties'),
  absolute:       absolute('properties', 'node.parent.node.frame.absolute'),
  absoluteBounds: rotated('absolute'),

});
