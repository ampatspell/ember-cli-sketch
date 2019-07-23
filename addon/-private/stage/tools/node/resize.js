import Tool from '../-base';

export default Tool.extend({

  guidelines: true,

  state: null,

  update({ delta }) {
    let { zoom } = this;

    let zoomed = {
      x: delta.x / zoom,
      y: delta.y / zoom
    };

    this.state.update({ delta: zoomed });
  },

  onMouseMove({ delta }) {
    let { mouse: { isLeftButton } } = this;

    if(!isLeftButton) {
      return;
    }

    this.update({ delta });
  },

  onMouseUp() {
    this.done();
  },

  onKeyDown() {
    if(!this.free) {
      this.state.updateAspect();
    }
  },

  activate({ node }) {
    this.selection.removeExcept(node);
    let edge = node.edge.serialized;
    let state = this.stateModel('state', { node, edge });
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
