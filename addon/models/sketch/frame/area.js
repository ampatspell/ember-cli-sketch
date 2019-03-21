import Frame from '../frame';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

export default Frame.extend({

  stage: computed('zoomed', 'owner.stage.position.{x,y}', function() {
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

  convertStageToAreaPosition({ x, y }) {
    let { stage } = this;
    return {
      x: x - stage.x,
      y: y - stage.y
    };
  }

});
