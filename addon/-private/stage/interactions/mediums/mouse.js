import EmberObject, { computed } from '@ember/object';
import { equal, and } from '@ember/object/computed';

const button = value => equal('button', value).readOnly();
const over = value => equal('over', value).readOnly();
const state = value => equal('state', value).readOnly();

export default EmberObject.extend({

  state: 'up',
  button: null,
  over: null,
  stage: null,

  absolute: computed('stage', function() {
    let { stage } = this;
    if(!stage) {
      return;
    }
    return this.interactions.stage.frame.convertPointFromScreen(stage);
  }).readOnly(),

  isLeftButton: button(0),
  isOverStage: over('stage'),
  isLeftButtonOverStage: and('isLeftButton', 'isOverStage'),

  isDown: state('down'),

  onMouseOver({ over }) {
    this.setProperties({ over });
  },

  onMouseOut({ window }) {
    if(window) {
      this.setProperties({ over: null });
    }
  },

  onMouseDown({ button }) {
    this.setProperties({ state: 'down', button });
  },

  onMouseMove({ stage }) {
    this.setProperties({ stage });
  },

  onMouseClick() {
  },

  onMouseDoubleClick() {
  },

  onMouseUp() {
    this.setProperties({ state: 'up', button: null });
  },

  onMouseWheel(/* { direction, value } */) {
  },

  reset() {
    this.setProperties({
      state: 'up',
      button: null,
      over: null,
      stage: null
    });
  }

});
