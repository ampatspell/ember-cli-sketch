import Tool from '../-base';

export default Tool.extend({

  update({ delta }) {
    let zoom = this.zoom + delta;
    this.stage.update({ zoom });
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

    delta = delta.y / 500;
    this.update({ delta });
    return false;
  },

  onMouseWheel({ value }) {
    let delta = value / 10;
    this.update({ delta });
    return false;
  },

  deactivate() {
    this.dragging = false;
  }

});
