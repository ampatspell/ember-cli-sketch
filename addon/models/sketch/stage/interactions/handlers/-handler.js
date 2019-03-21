import Base from '../../../-base';
import { readOnly } from '@ember/object/computed';

export default Base.extend({

  owner: null,
  type: null,

  stage: readOnly('owner.stage'),
  mouse: readOnly('owner.mouse'),
  keyboard: readOnly('owner.keyboard'),

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
  },

  reset() {
  }

});
