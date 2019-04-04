import EmberObject from '@ember/object';
import { readOnly } from '@ember/object/computed';

export default EmberObject.extend({

  tools: null,
  stage: readOnly('tools.stage'),
  zoom: readOnly('stage.zoom'),
  hover: readOnly('stage.hover'),
  mouse: readOnly('stage.interactions.mouse'),

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
  }

});
