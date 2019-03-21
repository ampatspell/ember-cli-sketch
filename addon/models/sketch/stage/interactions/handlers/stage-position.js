import Handler from './-handler';

export default Handler.extend({

  onMouseDown() {
    if(this.mouse.isLeftButton && this.keyboard.isSpace) {
      return false;
    }
  },

  onMouseMove({ delta: { x, y } }) {
    if(this.mouse.isLeftButton && this.keyboard.isSpace) {
      this.updatePositionDelta({ x, y });
      return false;
    }
  },

  onMouseWheel({ direction, value }) {
    this.updatePositionDelta({ [direction]: -value * 25 });
  },

  updatePositionDelta(props) {
    this.stage.position.update(props, { delta: true });
  }

});
