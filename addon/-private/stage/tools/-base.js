import EmberObject from '@ember/object';
import { readOnly } from '@ember/object/computed';

export default EmberObject.extend({

  tools: null,
  stage: readOnly('tools.stage'),
  hover: readOnly('stage.hover'),

  zoom:  readOnly('stage.zoom'),
  point: readOnly('stage.interactions.mouse.stage'),

  //

  onMouseDown() {
  },

  onMouseUp() {
  },

  onMouseMove() {
  },

  onMouseWheel() {
  },

  //

  activate() {
  },

  deactivate() {
  },

  reset() {
  }

});
