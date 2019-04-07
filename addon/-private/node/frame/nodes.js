import Frame from './-base';
import { zoomed, rotated, absolute } from './-computed';
import makeBoundsMixin from './-bounds-mixin';

const BoundsMixin = makeBoundsMixin('properties', 'parent._visibleNodes', '_rotatedFrame');

export default Frame.extend(BoundsMixin, {

  absolute: absolute('properties', 'parent.parent.frame.absolute'),
  absoluteBounds: rotated('absolute'),
  rotated: rotated('properties'),

  _zoomedRotated: zoomed('rotated'),

  hover: absolute('_zoomedRotated', 'parent.parent.frame.hover'),
  selection: absolute('_zoomedRotated', 'parent.parent.frame.selection')

});
