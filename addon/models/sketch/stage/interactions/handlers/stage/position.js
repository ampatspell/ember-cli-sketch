import Handler from '../-handler';

export default Handler.extend({

  update({ delta }) {
    let frame = this.stage.frame.deltaToFrame(delta);
    this.stage.update(frame);
  },

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
      this.update({ delta });

      return false;
    }
  },

  onMouseWheel({ direction, value, keys: { meta } }) {
    if(!this.mouse.isOverStage || meta) {
      return;
    }

    this.update({ delta: { [direction]: -value * 25 } });
  }

});
