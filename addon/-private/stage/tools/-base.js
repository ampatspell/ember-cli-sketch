import EmberObject from '@ember/object';
import { readOnly } from '@ember/object/computed';
import sketches from '../../util/sketches';

export default EmberObject.extend({

  tools: null,
  stage: readOnly('tools.stage'),
  zoom: readOnly('stage.zoom'),
  hover: readOnly('stage.hover'),
  selection: readOnly('stage.selection'),
  mouse: readOnly('stage.interactions.mouse'),
  keyboard: readOnly('stage.interactions.keyboard'),

  guidelines: false,
  cursor:     null,

  model(type, opts) {
    return sketches(this).factory.toolState(this, type, opts);
  },

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

  onMouseDoubleClick() {
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
