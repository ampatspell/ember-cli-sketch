import Frame from '../frame';
import { readOnly } from '@ember/object/computed';
import { computed } from '@ember/object';
import ConstraintsMixin from './-constraints';

const stageZoomed = key => computed(key, '_area.frame.stageZoomed', function() {
  let { [key]: frame, _area: { frame: { stageZoomed: area } } } = this;
  return {
    x:        frame.x + area.x,
    y:        frame.y + area.y,
    width:    frame.width,
    height:   frame.height,
    rotation: frame.rotation
  };
}).readOnly();

export default Frame.extend(ConstraintsMixin, {

  _area: readOnly('owner.area'),

  stageZoomedBounding: stageZoomed('zoomedBounding')

});
