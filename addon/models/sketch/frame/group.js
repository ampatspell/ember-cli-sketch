import Frame from './-base';
import { readOnly } from '@ember/object/computed';
import makeBoundsMixin from './-bounds-mixin';

const BoundsMixin = makeBoundsMixin('serialized', '_serializedFrame');

export default Frame.extend(BoundsMixin, {

  // x
  // y
  // width
  // height
  // rotation

  // serialized

  absolute: readOnly('owner.parent.frame.absolute'),

});
