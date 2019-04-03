import Handler from '../-base';

export default Handler.extend({

  isActive: false,

  setActive(isActive) {
    this.setProperties({ isActive });
  },

  begin() {
    this.setActive(true);
    this.dragging.clear();
  },

  end() {
    this.setActive(false);
    this.dragging.clear();
  },

  update({ delta }) {
    let { isActive, dragging, selection, zoom } = this;

    if(!isActive) {
      return;
    }

    if(!dragging.any) {
      if(!selection.any) {
        return;
      }
      dragging.replace(selection.attached);
      dragging.forEach(node => node.isContainer && node.moveToBottom());
    }

    let point = {
      x: delta.x / zoom,
      y: delta.y / zoom
    }

    dragging.forEach(node => node.update(point, { delta: true }));
    this.stage.moveNodesToOverlappingContainers(dragging.all);
  },

  onMouseDown() {
    let { mouse: { isLeftButtonOverStage } } = this;

    if(!isLeftButtonOverStage) {
      return;
    }

    this.begin();
  },

  onMouseUp() {
    this.end();
  },

  onMouseMove({ delta }) {
    let { mouse: { isLeftButton } } = this;

    if(!isLeftButton) {
      return;
    }

    this.update({ delta });
  }

});
