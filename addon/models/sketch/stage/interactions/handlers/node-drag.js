import Handler from './-handler';

export default Handler.extend({

  onMouseDown() {
    let { mouse: { isLeftButtonOverStage }, stage: { dragging } } = this;
    if(!isLeftButtonOverStage) {
      return;
    }
    dragging.replace();
  },

  onMouseUp() {
    let { stage: { dragging, areas } } = this;
    dragging.slice().forEach(node => areas.moveNodeIfContained(node));
    dragging.clear();
  },

  onMouseMove({ delta }) {
    let { mouse: { isLeftButton }, stage: { dragging, selection, zoom } } = this;

    if(!isLeftButton) {
      return;
    }

    if(!dragging.any) {
      if(!selection.any) {
        return;
      }
      let nodes = selection.filter(node => !node.isArea);
      if(nodes.length) {
        let areas = selection.filter(node => node.isArea);
        selection.removeNodes(areas);
      }
      dragging.replace(selection.all);
    }

    delta.x = delta.x / zoom;
    delta.y = delta.y / zoom;

    let { x, y } = delta;

    dragging.withNodes(node => node.frame.update({ x, y }, { delta: true }));
  }

});
