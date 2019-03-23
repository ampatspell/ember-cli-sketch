import Handler, { action } from '../-handler';

export default Handler.extend({

  action: action('node.select'),

  onMouseDown() {
    let { mouse: { isLeftButtonOverStage }, keyboard: { isShift: toggle } } = this;

    if(!isLeftButtonOverStage) {
      return;
    }

    this.action.perform({ toggle });
  }

});
