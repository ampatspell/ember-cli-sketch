import EmberObject from '@ember/object';
import { readOnly } from '@ember/object/computed';

export default EmberObject.extend({

  handlers: null,
  interactions: readOnly('handlers.interactions'),

  mouse: readOnly('interactions.mouse'),
  keyboard: readOnly('interactions.keyboard'),

  stage: readOnly('interactions.stage'),

  zoom: readOnly('stage.zoom'),
  hover: readOnly('stage.hover'),
  selection: readOnly('stage.selection'),
  dragging: readOnly('stage.dragging'),

  onMouseOver() {
  },

  onMouseOut() {
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

  onKeyUp() {
  },

  reset() {
  }

});
