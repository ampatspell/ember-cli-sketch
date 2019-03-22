import Handler from './-handler';

export default Handler.extend({

  onMouseDown() {
    let { mouse: { isLeftButtonOverStage }, stage: { dragging } } = this;
    if(!isLeftButtonOverStage) {
      return;
    }
    dragging.start();
  },

  onMouseUp() {
    let { stage: { dragging, areas } } = this;
    dragging.slice().forEach(node => areas.moveNodeIfContained(node));
    dragging.clear();
  },

  onMouseMove({ delta }) {
    let { mouse: { isLeftButton }, stage: { dragging, zoom } } = this;

    if(!isLeftButton) {
      return;
    }

    if(!dragging.update()) {
      return;
    }

    delta.x = delta.x / zoom;
    delta.y = delta.y / zoom;

    let { x, y } = delta;

    dragging.withNodes(node => node.frame.update({ x, y }, { delta: true }));
  }

});
