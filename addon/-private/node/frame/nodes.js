import Frame from './-base';
import { zoomed, rotated, absolute } from './-computed';
import makeBoundsMixin from './-bounds-mixin';

const BoundsMixin = makeBoundsMixin('properties', 'parent._nodes', '_rotatedFrame');

export default Frame.extend(BoundsMixin, {

  absolute: absolute('properties', 'parent.parent.frame.absolute'),
  absoluteBounds: rotated('absolute'),

  hover: zoomed('absoluteBounds')

});
