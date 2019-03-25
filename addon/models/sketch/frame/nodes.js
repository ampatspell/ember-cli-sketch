import Frame from './-base';
import makeBoundsMixin from './-bounds-mixin';
import { absolute, rotated } from './-new-computed';

const BoundsMixin = makeBoundsMixin('serialized', 'owner.all', '_rotatedFrame');

export default Frame.extend(BoundsMixin, {

  // x
  // y
  // width
  // height
  // rotation

  // serialized

  absolute: absolute(),
  hover: rotated('absolute')

});
