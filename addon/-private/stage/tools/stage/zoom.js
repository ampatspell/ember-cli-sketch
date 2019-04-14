import Tool from '../-base';

export default Tool.extend({

  update({ delta }) {
    let zoom = this.state.zoom + delta;
    this.state.zoom = zoom;
    // TODO: center
    this.stage.update({ zoom });
  },

  begin() {
    this.state = {
      point: this.mouse.absolute,
      zoom: this.stage.zoom
    };
  },

  reset() {
    this.state = null;
  },

  onMouseDown() {
    this.begin();
  },

  onMouseUp() {
    this.reset();
  },

  onMouseMove({ delta }) {
    if(!this.state) {
      return;
    }
    this.update({ delta: delta.y / 500 });
  },

  onMouseWheel({ value }) {
    this.begin();
    this.update({ delta: value / 10 });
    this.reset();
  },

  deactivate() {
    this.reset();
  }

});
