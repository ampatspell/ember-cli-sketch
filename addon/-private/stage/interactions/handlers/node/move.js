import Handler from '../-base';

export default Handler.extend({

  perform({ delta }) {
    let { selection, stage } = this;
    let nodes = selection.all;
    nodes.forEach(node => node.update(delta, { delta: true }));
    stage.moveNodesToOverlappingContainers(nodes);
    nodes.forEach(node => node.isContainer && node.moveToBottom());
  },

  onKeyDown(key) {
    let delta = {
      x: 0,
      y: 0
    };

    let d = this.keyboard.isShift ? 15 : 1;

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

    this.perform({ delta });
  }

});
