import EmberObject from '@ember/object';
import { readOnly } from '@ember/object/computed';

export default EmberObject.extend({

  tools: null,
  stage: readOnly('tools.stage'),
  hover: readOnly('stage.hover'),

  point: readOnly('stage.interactions.mouse.stage'),

  //

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
