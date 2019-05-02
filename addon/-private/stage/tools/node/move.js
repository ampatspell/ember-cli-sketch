import Tool from '../-base';

export default Tool.extend({

  perform({ key }) {
    let { stage, selection, keyboard } = this;

    let delta = {
      x: 0,
      y: 0
    };

    let d = keyboard.isShift ? 15 : 1;

    d = d / this.zoom;

    if(key.isArrowUp) {
      delta.y = -d;
    } else if(key.isArrowDown) {
      delta.y = d;
    } else if(key.isArrowLeft) {
      delta.x = -d;
    } else if(key.isArrowRight) {
      delta.x = d;
    } else {
      return;
    }

    let nodes = selection.selectable;
    nodes.forEach(node => node.update(delta, { delta: true }));
    stage.moveNodesToOverlappingContainers(nodes);
  },

  activate({ key }) {
    if(this.selection.any) {
      this.perform({ key });
    }
    this.done();
  }

});
