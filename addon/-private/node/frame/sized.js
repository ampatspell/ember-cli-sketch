import Frame, { model } from './-base';
import { computed } from '@ember/object';
import { serialized } from '../../util/computed';
import { zoomed, rotated, absolute } from './-computed';

const keys = [ 'x', 'y', 'width', 'height', 'rotation' ];

const rotation = () => computed(`model.rotation`, 'parent.isContainer', function() {
  if(this.parent.isContainer) {
    return 0;
  }
  return this.model.rotation;
}).readOnly();

export default Frame.extend({

  x:        model('x'),
  y:        model('y'),
  width:    model('width'),
  height:   model('height'),
  rotation: rotation(),

  properties:     serialized(keys),
  rotated:        rotated('properties'),
  zoomed:         zoomed('properties'),
  absolute:       absolute('properties', 'parent.parent.frame.absolute'),
  absoluteBounds: rotated('absolute'),

  hover:     zoomed('absoluteBounds'),
  selection: zoomed('absoluteBounds')

});
