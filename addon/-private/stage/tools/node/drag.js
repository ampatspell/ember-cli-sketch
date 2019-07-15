import Tool from '../-base';

export default Tool.extend({

  guidelines: true,

  update({ delta }) {
    let { zoom } = this;

    let zoomed = {
      x: delta.x / zoom,
      y: delta.y / zoom
    };

    this.state.forEach(state => {
      let { node, point } = state;
      let add = prop => point[prop] = point[prop] + zoomed[prop];
      add('x');
      add('y');
      node.perform('drag', { point });
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
      let { x, y } = node.frame;
      let point = { x, y };
      return { node, point };
    });
  },

  deactivate() {
    this.reset();
  },

  reset() {
    this.state = null;
  }

});
