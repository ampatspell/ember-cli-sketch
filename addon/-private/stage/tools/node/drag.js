import Tool from '../-base';

export default Tool.extend({

  guidelines: true,

  update({ delta }) {
    let { zoom } = this;

    let zoomed = {
      x: delta.x / zoom,
      y: delta.y / zoom
    };

    this.state.forEach(state => state.perform({ delta: zoomed }));
  },

  onMouseMove({ delta }) {
    this.hover.reset();
    this.update({ delta });
  },

  onMouseUp() {
    this.done();
  },

  activate() {
    this.state = this.selection.selectable.map(node => node.action('drag').begin(node));
  },

  deactivate() {
    this.reset();
  },

  reset() {
    this.state = null;
  }

});
