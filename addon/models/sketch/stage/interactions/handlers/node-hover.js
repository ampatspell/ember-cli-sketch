import Handler from './-handler';

export default Handler.extend({

  onMouseMove() {
    this.update();
  },

  onMouseWheel() {
    this.update();
  },

  update() {
    let nodes = this.stage.areas.nodesForScreenPosition(this.mouse.stage);
    this.stage.hover.replace(nodes);
  }

});
