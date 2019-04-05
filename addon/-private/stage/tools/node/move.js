import Tool from '../-base';

export default Tool.extend({

  activate({ key }) {
    let { stage, selection, keyboard } = this;

    if(!selection.any) {
      return;
    }

    let delta = {
      x: 0,
      y: 0
    };

    let d = keyboard.isShift ? 15 : 1;

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

    let nodes = selection.all;
    nodes.forEach(node => node.update(delta, { delta: true }));
    stage.moveNodesToOverlappingContainers(nodes);
    nodes.forEach(node => node.isContainer && node.moveToBottom());

    this.done();
  },

});
