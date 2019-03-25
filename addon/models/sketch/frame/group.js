import Frame from './-base';
import { readOnly } from '@ember/object/computed';
import makeBoundsMixin from './-bounds-mixin';
import { zoomed } from './-new-computed';

const BoundsMixin = makeBoundsMixin('serialized', 'owner.nodes.all', '_serializedFrame');

export default Frame.extend(BoundsMixin, {

  // x
  // y
  // width
  // height
  // rotation

  // serialized

  absolute: readOnly('owner.parent.frame.absolute'),
  absoluteBounds: readOnly('owner.nodes.frame.absoluteBounds'),

  hover: zoomed('absoluteBounds')

});
