import Frame from './-base';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { zoomed as _zoomed, absolute, bounds } from './-computed';

const props = [ 'x', 'y', 'width', 'height' ];
const zoomed = frame => _zoomed('owner.stage.zoom', frame);

const prop = key => computed('serialized', {
  get() {
    return this.serialized[key];
  },
  set(_, value) {
    let delta = value - this.serialized[key];
    if(delta !== 0) {
      this.owner.nodes.all.forEach(node => {
        node.frame.update({ [key]: delta }, { delta: true });
      });
    }
    return value;
  }
});

export default Frame.extend({

  exists: false,

  // x:      prop('x'),
  // y:      prop('y'),
  // width:  prop('width'),
  // height: prop('height'),

  // serialized: bounds('owner.nodes.all', '_serializedFrame'),

  // zoomed: zoomed('serialized'),
  // bounds: bounds('owner.nodes.all', '_boundsFrame'),
  // zoomedBounds: zoomed('bounds', props),
  // absoluteZoomed: readOnly('owner.parent.frame.absoluteZoomed'),
  // absoluteZoomedBounds: absolute('zoomedBounds', 'absoluteZoomed', props),
  // absolute: absolute('serialized', 'absolute', props),
  // absoluteBounds: absolute('bounds', 'absolute', props),

});
