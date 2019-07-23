import Tool from '../-base';

export default Tool.extend({

  guidelines: true,

  update({ delta }) {
    let { zoom } = this;

    let zoomed = {
      x: delta.x / zoom,
      y: delta.y / zoom
    };

    this.state.update({ delta: zoomed });
  },

  onMouseMove({ delta }) {
    this.hover.reset();
    this.update({ delta });
  },

  onMouseUp() {
    this.done();
  },

  activate() {
    let state = this.stateModel('state');
    this.setProperties({ state });
  },

  deactivate() {
    this.reset();
  },

  reset() {
    let { state } = this;
    if(state) {
      this.setProperties({ state });
      state.destroy();
    }
  }

});
