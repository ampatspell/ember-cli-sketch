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
    dragging.nodes.slice().forEach(node => areas.moveNodeIfContained(node));
    dragging.clear();
  },

  onMouseMove({ delta }) {
    let { mouse: { isLeftButton }, stage: { areas, dragging, selection, zoom } } = this;

    if(!isLeftButton) {
      return;
    }

    if(!dragging.any) {
      if(!selection.any) {
        return;
      }
      let nodes = selection.nodes.filter(node => !node.isArea);
      if(nodes.length) {
        let areas = selection.nodes.filter(node => node.isArea);
        selection.removeNodes(areas);
      }
      dragging.replace(selection.nodes);
    }

    delta.x = delta.x / zoom;
    delta.y = delta.y / zoom;

    let { x, y } = delta;

    dragging.withNodes(node => {
      node.frame.update({ x, y }, { delta: true });
    });
  }

});
