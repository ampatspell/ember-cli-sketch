import Handler, { action } from '../-handler';
import { readOnly } from '@ember/object/computed';

export default Handler.extend({

  zoom: readOnly('stage.zoom'),
  action: action('stage.position'),

  onMouseDown() {
    if(this.mouse.isLeftButton && this.keyboard.isSpace) {
      return false;
    }
  },

  onMouseMove({ delta }) {
    if(this.mouse.isLeftButton && this.keyboard.isSpace) {

      let { zoom } = this;
      delta.x = delta.x / zoom;
      delta.y = delta.y / zoom;
      this.action.perform({ delta });

      return false;
    }
  },

  onMouseWheel({ direction, value, keys: { meta } }) {
    if(meta) {
      return;
    }
    this.action.perform({ delta: { [direction]: -value * 25 } });
  }

});
