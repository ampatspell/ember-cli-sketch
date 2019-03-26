import Base from '../../../-base';
import { readOnly } from '@ember/object/computed';

export default Base.extend({

  owner: null,
  type: null,

  stage: readOnly('owner.stage'),

  mouse: readOnly('owner.mouse'),
  keyboard: readOnly('owner.keyboard'),

  zoom: readOnly('stage.zoom'),
  hover: readOnly('stage.hover'),
  selection: readOnly('stage.selection'),
  dragging: readOnly('stage.dragging'),
  resizing: readOnly('stage.resizing'),

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
