import Handler, { action } from '../-handler';
import { readOnly } from '@ember/object/computed';

export default Handler.extend({

  action: action('node.resize'),
  zoom: readOnly('stage.zoom'),

  onMouseDown() {
    let { mouse: { isLeftButtonOverStage }, action } = this;
    if(isLeftButtonOverStage && action.begin()) {
      return false;
    }
  },

  onMouseUp() {
    if(this.action.end()) {
      return false;
    }
  },

  onMouseMove({ delta }) {
    let { mouse: { isLeftButton }, zoom, action } = this;

    if(!isLeftButton) {
      return;
    }

    delta = {
      x: delta.x / zoom,
      y: delta.y / zoom
    };

    if(action.update(delta)) {
      return false;
    }
  }

});
