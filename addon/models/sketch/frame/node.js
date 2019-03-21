import Frame from '../frame';
import { readOnly } from '@ember/object/computed';
import { computed } from '@ember/object';

const stage = key => computed(key, '_area.frame.stage', function() {
  let { [key]: frame, _area: { frame: { stage: area } } } = this;
  return {
    x:        frame.x + area.x,
    y:        frame.y + area.y,
    width:    frame.width,
    height:   frame.height,
    rotation: frame.rotation
  };
}).readOnly();

export default Frame.extend({

  _area: readOnly('owner.area'),

  stageZoomedBounding: stage('zoomedBounding')

});
