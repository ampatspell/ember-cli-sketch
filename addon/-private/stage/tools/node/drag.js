import Tool from '../-base';

export default Tool.extend({

  update({ delta }) {
    let { stage, selection, zoom } = this;

    let nodes = selection.selectable;
    nodes.forEach(node => node.isContainer && node.moveToTop());

    let point = {
      x: delta.x / zoom,
      y: delta.y / zoom
    }

    nodes.forEach(node => node.update(point, { delta: true }));
    stage.moveNodesToOverlappingContainers(nodes);
  },

  onMouseMove({ delta }) {
    if(!this.mouse.isLeftButton) {
      return;
    }
    this.hover.reset();
    this.update({ delta });
  },

  onMouseUp() {
    this.done();
  },

  activate() {
  },

  deactivate() {
    this.reset();
  },

  reset() {
  }

});
