import EmberObject from '@ember/object';
import { equal, and } from '@ember/object/computed';

const button = value => equal('button', value).readOnly();
const over = value => equal('over', value).readOnly();
const state = value => equal('state', value).readOnly();

export default EmberObject.extend({

  owner: null,

  state: 'up',
  button: null,
  over: null,
  stage: null,

  isLeftButton: button(0),
  isOverStage: over('stage'),
  isLeftButtonOverStage: and('isLeftButton', 'isOverStage'),

  isDown: state('down'),

  prepare(props) {
    this.setProperties(props);
  },

  onMouseOver({ over }) {
    this.setProperties({ over });
  },

  onMouseDown({ button }) {
    this.setProperties({ state: 'down', button });
  },

  onMouseMove({ stage }) {
    this.setProperties({ stage });
  },

  onMouseClick() {
  },

  onMouseUp() {
    this.setProperties({ state: 'up', button: null });
  },

  onMouseWheel(/* { direction, value } */) {
  }

});
