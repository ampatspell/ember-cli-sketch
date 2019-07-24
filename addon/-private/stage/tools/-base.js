import EmberObject from '@ember/object';
import { readOnly } from '@ember/object/computed';

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

  done() {
    this.tools._deactivate(this);
  },

  //

  zoomedDelta(delta) {
    let { zoom } = this;
    return {
      x: delta.x / zoom,
      y: delta.y / zoom
    };
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
