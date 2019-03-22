import Handler, { action } from './-handler';

export default Handler.extend({

  action: action('node/drag'),

  onMouseDown() {
    let { mouse: { isLeftButtonOverStage } } = this;
    if(!isLeftButtonOverStage) {
      return;
    }
    this.action.begin();
  },

  onMouseUp() {
    this.action.end();
  },

  onMouseMove({ delta }) {
    let { mouse: { isLeftButton }, stage: { zoom } } = this;

    if(!isLeftButton) {
      return;
    }

    this.action.update({
      x: delta.x / zoom,
      y: delta.y / zoom
    });
  }

});
