import Tool from '../-base';

export default Tool.extend({

  cursor: 'pointer',
  guidelines: true,

  update({ delta }) {
    let frame = this.stage.frame.deltaToFrame(delta);
    this.stage.update(frame);
  },

  onMouseDown() {
    this.dragging = true;
  },

  onMouseUp() {
    this.dragging = false;
  },

  onMouseMove({ delta }) {
    if(!this.dragging) {
      return;
    }

    let { zoom } = this;
    delta.x = delta.x / zoom;
    delta.y = delta.y / zoom;

    this.update({ delta });

    return false;
  },

  onMouseWheel({ direction, value }) {
    this.update({ delta: { [direction]: -value * 25 } });
  },

  deactivate() {
    this.dragging = false;
  }

});
