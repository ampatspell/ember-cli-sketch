import Handler from './-handler';

export default Handler.extend({

  onMouseMove() {
    this.update();
  },

  onMouseWheel() {
    this.update();
  },

  update() {
    let stage = this.mouse.stage;
    let nodes = this.stage.areas.nodesForStagePosition(stage);
    this.stage.hover.replace(nodes);
  }

});
