import Handler from '../-handler';

export default Handler.extend({

  perform() {
    let { stage, hover } = this;
    let point = stage.frame.convertPointFromScreen(this.mouse.stage);
    let nodes = stage.nodes.nodesForPosition(point, 'absoluteBounds');
    hover.replace(nodes);
  },

  onMouseMove() {
    this.perform();
  },

  onMouseWheel() {
    this.perform();
  }

});
