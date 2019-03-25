import Frame from './-base';
import makeBoundsMixin from './-bounds-mixin';

const BoundsMixin = makeBoundsMixin('serialized', '_serializedFrame');

export default Frame.extend(BoundsMixin, {

  // zoomed: zoomed('serialized'),
  // bounds: bounds('owner.nodes.all', '_boundsFrame'),
  // zoomedBounds: zoomed('bounds', props),
  // absoluteZoomed: readOnly('owner.parent.frame.absoluteZoomed'),
  // absoluteZoomedBounds: absolute('zoomedBounds', 'absoluteZoomed', props),
  // absolute: absolute('serialized', 'absolute', props),
  // absoluteBounds: absolute('bounds', 'absolute', props),

});
