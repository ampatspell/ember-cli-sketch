import Tool from '../-base';

export default Tool.extend({

  guidelines: true,

  update({ delta }) {
    let { zoom } = this;

    delta = {
      x: delta.x / zoom,
      y: delta.y / zoom
    };

    this.nodes.forEach(node => node.update({ delta }));
  },

  onMouseMove({ delta }) {
    this.hover.reset();
    this.update({ delta });
  },

  onMouseUp() {
    this.done();
  },

  activate() {
    this.nodes = this.selection.selectable.map(node => this.model('state', { node }));
  },

  deactivate() {
    this.reset();
  },

  reset() {
    this.nodes = null;
  }

});
