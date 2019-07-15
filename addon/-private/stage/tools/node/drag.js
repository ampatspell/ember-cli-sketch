import Tool from '../-base';

export default Tool.extend({

  guidelines: true,

  update({ delta }) {
    let { zoom } = this;

    let point = {
      x: delta.x / zoom,
      y: delta.y / zoom
    };

    this.state.forEach(state => {
      let { node } = state;
      let result = node.perform('drag', { delta: point });
      // clamped result
    });
  },

  onMouseMove({ delta }) {
    this.hover.reset();
    this.update({ delta });
  },

  onMouseUp() {
    this.done();
  },

  activate() {
    this.state = this.selection.selectable.map(node => {
      return { node };
    });
  },

  deactivate() {
    this.reset();
  },

  reset() {
    this.state = null;
  }

});
