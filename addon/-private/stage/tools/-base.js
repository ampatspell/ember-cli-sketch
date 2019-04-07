import EmberObject from '@ember/object';
import { readOnly } from '@ember/object/computed';

export default EmberObject.extend({

  tools: null,
  stage: readOnly('tools.stage'),
  cursor: readOnly('stage.cursor'),
  zoom: readOnly('stage.zoom'),
  hover: readOnly('stage.hover'),
  selection: readOnly('stage.selection'),
  mouse: readOnly('stage.interactions.mouse'),
  keyboard: readOnly('stage.interactions.keyboard'),

  done() {
    this.tools._deactivate(this);
  },

  //

  onMouseDown() {
  },

  onMouseUp() {
  },

  onMouseMove() {
  },

  onMouseWheel() {
  },

  onMouseClick() {
  },

  onKeyDown() {
  },

  onKeyUp() {
  },

  //

  activate() {
  },

  deactivate() {
  }

});
