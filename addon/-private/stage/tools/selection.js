import Tool from './-base';

export default Tool.extend({

  update() {
    let { stage, hover, mouse: { absolute } } = this;
    let nodes = stage.nodesForPosition(absolute, 'absoluteBounds');
    hover.replace(nodes);
  },

  onMouseMove() {
    this.update();
  },

  onMouseWheel() {
    this.update();
  },

  activate() {
    if(!this.point) {
      return;
    }
    this.update();
  },

  deactivate() {
    this.hover.reset();
  }

});
