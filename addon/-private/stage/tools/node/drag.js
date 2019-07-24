import Tool from '../-base';

export default Tool.extend({

  guidelines: true,

  update({ delta }) {
    let { zoom } = this;

    delta = {
      x: delta.x / zoom,
      y: delta.y / zoom
    };

    this.state.update({ delta });
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
