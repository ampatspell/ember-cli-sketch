import Frame from '../frame';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

export default Frame.extend({

  stageZoomed: computed('zoomed', 'owner.stage.position.{x,y}', function() {
    let { owner: { stage }, zoomed } = this;
    if(!stage) {
      return;
    }

    let { position } = stage;
    let { width, height, rotation } = zoomed;

    let p = key => zoomed[key] + position[key];

    let x = p('x');
    let y = p('y');

    return {
      x,
      y,
      width,
      height,
      rotation
    };
  }).readOnly(),

  stageZoomedBounding: readOnly('stageZoomed'),

  convertPointFromStage({ x, y }) {
    let { serialized } = this;
    return {
      x: x - serialized.x,
      y: y - serialized.y
    };
  }

});
