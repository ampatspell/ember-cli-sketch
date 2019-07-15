import Frame from './-base';
import { zoomed, rotated, absolute } from './-computed';
import makeBoundsMixin from './-bounds-mixin';

const BoundsMixin = makeBoundsMixin('properties', 'parent.visible', '_rotatedFrame');

export default Frame.extend(BoundsMixin, {

  absolute: absolute('properties', 'parent.parent.frame.absolute'),
  absoluteBounds: rotated('absolute'),
  rotated: rotated('properties'),

  _zoomedRotated: zoomed('rotated'),

  hover: absolute('_zoomedRotated', 'parent.parent.frame.hover'),
  guidelines: absolute('_zoomedRotated', 'parent.parent.frame.guidelines', false),
  selection: absolute('_zoomedRotated', 'parent.parent.frame.selection')

});
