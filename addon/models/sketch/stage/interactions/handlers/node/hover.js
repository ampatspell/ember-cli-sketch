import Handler, { action } from '../-handler';

export default Handler.extend({

  action: action('node.hover'),

  onMouseMove() {
    this.perform();
  },

  onMouseWheel() {
    this.perform();
  },

  perform() {
    let point = this.stage.convertPointFromScreen(this.mouse.stage);
    this.action.perform(point);
  }

});
