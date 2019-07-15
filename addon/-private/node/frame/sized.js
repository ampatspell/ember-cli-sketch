import Frame, { model } from './-base';
import { computed } from '@ember/object';
import { serialized } from '../../util/computed';
import { zoomed, rotated, absolute, rounded } from './-computed';

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

  properties: serialized(keys),
  rotated: rotated('properties'),
  absolute: absolute('properties', 'parent.parent.frame.absolute'),
  absoluteBounds: rotated('absolute'),

  _zoomed: zoomed('properties'),
  _zoomedRotated: zoomed('rotated'),

  rounded: rounded('_zoomed'),
  hover: absolute('_zoomedRotated', 'parent.parent.frame.hover'),
  guidelines: absolute('_zoomedRotated', 'parent.parent.frame.guidelines', false),
  selection: absolute('_zoomedRotated', 'parent.parent.frame.selection')

});
