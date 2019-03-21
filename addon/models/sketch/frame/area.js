import Frame from '../frame';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

export default Frame.extend({

  normalized: computed('zoomed', 'owner.stage.position.{x,y}', function() {
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

  absolute: readOnly('normalized'),
  bounding: readOnly('normalized'),

});
