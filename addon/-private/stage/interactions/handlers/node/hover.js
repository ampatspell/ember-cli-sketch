import Handler from '../-base';

export default Handler.extend({

  perform() {
    let { stage, hover } = this;
    let point = this.mouse.absolute;
    let nodes = stage.nodesForPosition(point, 'absoluteBounds');
    hover.replace(nodes);
  },

  onMouseMove() {
    this.perform();
  },

  onMouseWheel() {
    this.perform();
  }

});
