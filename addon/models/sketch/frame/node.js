import Frame from '../frame';
import { readOnly } from '@ember/object/computed';
import { computed } from '@ember/object';
import ConstraintsMixin from './-constraints';

const stage = key => computed(key, '_area.frame.serialized', function() {
  let frame = this.get(key);

  let { width, height, rotation } = frame;
  let area = this._area.frame.serialized;

  let p = key => frame[key] + area[key];

  let x = p('x');
  let y = p('y');

  return {
    x,
    y,
    width,
    height,
    rotation
  };
}).readOnly();

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

  stage: stage('serialized'),
  stageBounding: stage('bounding'),
  stageZoomedBounding: stageZoomed('zoomedBounding'),

});
