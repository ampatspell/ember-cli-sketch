import Handler from './-handler';

export default Handler.extend({

  onMouseDown() {
    let { mouse: { isLeftButtonOverStage }, stage: { selection, dragging } } = this;
    if(!isLeftButtonOverStage) {
      return;
    }
    dragging.replace(selection.copy());
  },

  onMouseUp() {
    let { stage: { dragging } } = this;
    dragging.clear();
  },

  onMouseMove({ delta }) {
    let { mouse: { isLeftButton }, stage: { dragging, zoom } } = this;

    if(!isLeftButton) {
      return;
    }

    if(!dragging.any) {
      return;
    }

    delta.x = delta.x / zoom;
    delta.y = delta.y / zoom;

    let { x, y } = delta;
    dragging.withNodes(node => node.frame.update({ x, y }, { delta: true }));
  }

});
