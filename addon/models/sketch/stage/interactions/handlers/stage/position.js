import Handler, { action } from '../-handler';

export default Handler.extend({

  action: action('stage.position'),

  onMouseDown() {
    if(this.mouse.isLeftButton && this.keyboard.isSpace) {
      return false;
    }
  },

  onMouseMove({ delta }) {
    if(this.mouse.isLeftButton && this.keyboard.isSpace) {
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
