import Frame from './-base';
import makeBoundsMixin from './-bounds-mixin';

const BoundsMixin = makeBoundsMixin('serialized', '_serializedFrame');

export default Frame.extend(BoundsMixin, {

  // x
  // y
  // width
  // height
  // rotation

  // serialized

});
