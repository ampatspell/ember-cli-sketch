import EmberObject from '@ember/object';
import { readOnly } from '@ember/object/computed';

export default EmberObject.extend({

  owner: null,
  type: null,

  stage: readOnly('owner.stage'),
  mouse: readOnly('owner.mouse'),
  keyboard: readOnly('owner.keyboard'),

  prepare(props) {
    this.setProperties(props);
  },

  onMouseOver() {
  },

  onMouseDown() {
  },

  onMouseClick() {
  },

  onMouseMove() {
  },

  onMouseUp() {
  },

  onMouseWheel() {
  },

  onKeyDown() {
  },

  onKeyPress() {
  },

  onKeyUp() {
  }

});
