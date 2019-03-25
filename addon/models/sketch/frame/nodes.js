import Frame from './-base';
import makeBoundsMixin from './-bounds-mixin';
import { absolute, rotated, zoomed } from './-computed';

const BoundsMixin = makeBoundsMixin('serialized', 'owner.all', '_rotatedFrame');

export default Frame.extend(BoundsMixin, {

  // x
  // y
  // width
  // height
  // rotation

  // serialized

  absolute: absolute(),
  absoluteBounds: rotated('absolute'),

  hover: zoomed('absoluteBounds')

});
