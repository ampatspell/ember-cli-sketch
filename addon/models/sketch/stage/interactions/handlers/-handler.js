import Base from '../../../-base';
import { readOnly } from '@ember/object/computed';

export const action = type => readOnly(`actions/${type}`.replace(/\//g, '.'));

export default Base.extend({

  owner: null,
  type: null,

  stage: readOnly('owner.stage'),
  mouse: readOnly('owner.mouse'),
  keyboard: readOnly('owner.keyboard'),

  actions: readOnly('owner.stage.actions'),

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
